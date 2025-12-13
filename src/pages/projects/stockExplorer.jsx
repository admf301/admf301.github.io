import React, { useEffect, useMemo, useState, } from "react";
import { Helmet } from "react-helmet";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ReferenceLine,
  Cell,
} from "recharts";

import NavBar from "../../components/common/navBar";
import Footer from "../../components/common/footer";

/* -----------------------------
   Ticker name fallbacks
----------------------------- */

const TICKER_NAME_FALLBACK = {
  // Mega-cap / Big Tech
  AAPL: "Apple",
  MSFT: "Microsoft",
  AMZN: "Amazon",
  GOOGL: "Alphabet (Google)",
  GOOG: "Alphabet (Google)",
  META: "Meta Platforms",
  NVDA: "NVIDIA",
  TSLA: "Tesla",

  // Semiconductors / Hardware
  AMD: "Advanced Micro Devices",
  INTC: "Intel",
  QCOM: "Qualcomm",
  AVGO: "Broadcom",
  TXN: "Texas Instruments",
  MU: "Micron Technology",
  AMAT: "Applied Materials",
  LRCX: "Lam Research",

  // Cloud / Software
  ORCL: "Oracle",
  CRM: "Salesforce",
  ADBE: "Adobe",
  NOW: "ServiceNow",
  INTU: "Intuit",
  SNOW: "Snowflake",

  // Streaming / Media
  NFLX: "Netflix",
  DIS: "Disney",

  // Payments / Fintech
  V: "Visa",
  MA: "Mastercard",
  PYPL: "PayPal",
  SQ: "Block (Square)",

  // Banks / Financials
  JPM: "JPMorgan Chase",
  BAC: "Bank of America",
  WFC: "Wells Fargo",
  GS: "Goldman Sachs",
  MS: "Morgan Stanley",
  C: "Citigroup",

  // Consumer / Retail
  COST: "Costco",
  WMT: "Walmart",
  TGT: "Target",
  NKE: "Nike",
  SBUX: "Starbucks",
  MCD: "McDonald's",

  // Healthcare
  UNH: "UnitedHealth Group",
  JNJ: "Johnson & Johnson",
  PFE: "Pfizer",
  ABBV: "AbbVie",
  MRK: "Merck",

  // Energy
  XOM: "Exxon Mobil",
  CVX: "Chevron",

  // Industrials / Other
  BA: "Boeing",
  CAT: "Caterpillar",
  GE: "General Electric",

  // ETFs / Market proxies
  SPY: "S&P 500 ETF",
  QQQ: "NASDAQ 100 ETF",
  DIA: "Dow Jones ETF",
  IWM: "Russell 2000 ETF",
};

const COLOR_PRICE = "var(--link-color)";
const COLOR_MA20  = "#f59e0b";
const COLOR_MA50  = "#22c55e";  

/* -----------------------------
   Helpers
----------------------------- */

function clamp(x, lo, hi) {
  return Math.max(lo, Math.min(hi, x));
}

function niceStep(maxAbs) {
  if (maxAbs <= 2) return 0.5;
  if (maxAbs <= 5) return 1;
  if (maxAbs <= 10) return 2;
  if (maxAbs <= 20) return 5;
  return 10;
}

function computeReturnAxisFromPct(valuesPct) {
  const vals = valuesPct.filter((v) => Number.isFinite(v));
  if (vals.length < 5) return { domain: [-10, 10], ticks: [-10, -5, 0, 5, 10] };

  const maxAbs = Math.max(...vals.map((v) => Math.abs(v)));
  const padded = maxAbs * 1.1;
  const capped = clamp(padded, 2, 25);

  const step = niceStep(capped);
  const top = Math.ceil(capped / step) * step;
  const domain = [-top, top];

  const ticks = [];
  for (let t = -top; t <= top + 1e-9; t += step) ticks.push(Number(t.toFixed(4)));
  return { domain, ticks };
}

function parseCSV(text) {
  const lines = text.trim().split("\n");
  const header = lines[0].split(",").map((h) => h.trim());
  const idx = (name) => header.indexOf(name);

  const iDate = idx("Date");
  const iTicker = idx("Ticker");
  const iClose = idx("Close");
  const iRet = idx("DailyReturn"); // may be missing
  const iCompany = idx("Company");
  const iName = idx("Name");

  if (iDate === -1 || iTicker === -1 || iClose === -1) {
    throw new Error(
      `CSV header missing required columns. Found: ${header.join(", ")}`
    );
  }

  return lines
    .slice(1)
    .map((line) => line.split(","))
    .filter((cols) => cols.length >= header.length)
    .map((cols) => {
      const close = Number(cols[iClose]);
      const dailyReturn = iRet === -1 ? NaN : Number(cols[iRet]);

      const company =
        (iCompany !== -1 ? cols[iCompany] : "") ||
        (iName !== -1 ? cols[iName] : "") ||
        "";

      return {
        date: cols[iDate]?.slice(0, 10),
        ticker: cols[iTicker],
        company: company?.trim() || "",
        close,
        dailyReturn,
      };
    })
    .filter((r) => r.ticker && r.date && Number.isFinite(r.close));
}

function mean(values) {
  const xs = values.filter((v) => Number.isFinite(v));
  if (!xs.length) return null;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function stdev(values) {
  const xs = values.filter((v) => Number.isFinite(v));
  if (xs.length < 2) return null;
  const mu = xs.reduce((a, b) => a + b, 0) / xs.length;
  const varSum = xs.reduce((a, b) => a + (b - mu) ** 2, 0);
  return Math.sqrt(varSum / (xs.length - 1));
}

function formatPctFromDecimal(x) {
  if (!Number.isFinite(x)) return "—";
  return `${(x * 100).toFixed(2)}%`;
}

function computeSMA(points, windowSize) {
  const out = [];
  let sum = 0;
  const q = [];

  for (let i = 0; i < points.length; i++) {
    const v = points[i].close;
    q.push(v);
    sum += v;

    if (q.length > windowSize) sum -= q.shift();

    const sma = q.length === windowSize ? sum / windowSize : null;
    out.push({ ...points[i], sma });
  }
  return out;
}

function quantile(values, q) {
  const xs = values
    .filter((v) => Number.isFinite(v))
    .slice()
    .sort((a, b) => a - b);
  if (!xs.length) return null;
  if (q <= 0) return xs[0];
  if (q >= 1) return xs[xs.length - 1];

  const pos = (xs.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (xs[base + 1] === undefined) return xs[base];
  return xs[base] + rest * (xs[base + 1] - xs[base]);
}

function daysBetween(dateA, dateB) {
  const a = new Date(dateA + "T00:00:00");
  const b = new Date(dateB + "T00:00:00");
  return (b - a) / (1000 * 60 * 60 * 24);
}

function deriveDailyReturns(sortedPoints) {
  return sortedPoints.map((p, i) => {
    if (Number.isFinite(p.dailyReturn)) return p;
    if (i === 0) return { ...p, dailyReturn: NaN };

    const prev = sortedPoints[i - 1];
    if (!Number.isFinite(prev.close) || prev.close === 0) {
      return { ...p, dailyReturn: NaN };
    }

    const dr = p.close / prev.close - 1;
    return { ...p, dailyReturn: dr };
  });
}

function maxDrawdown(points) {
  let peak = -Infinity;
  let worst = 0;
  let peakDate = null;
  let troughDate = null;

  for (const p of points) {
    if (!Number.isFinite(p.close)) continue;

    if (p.close > peak) {
      peak = p.close;
      peakDate = p.date;
    }
    const dd = peak > 0 ? (p.close - peak) / peak : 0;
    if (dd < worst) {
      worst = dd;
      troughDate = p.date;
    }
  }

  return { drawdown: worst, peakDate, troughDate };
}

/* -----------------------------
   Aggregation for noisy return chart
   - Bucket daily returns into weekly/monthly compounded returns.
----------------------------- */

function bucketKey(dateStr, mode) {
  // mode: "week" | "month"
  const d = new Date(dateStr + "T00:00:00");
  const y = d.getUTCFullYear();

  if (mode === "month") {
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    return `${y}-${m}`; // YYYY-MM
  }

  // week: ISO-ish week grouping (good enough for visualization)
  // Find Monday of this week (UTC)
  const day = d.getUTCDay(); // 0 Sun .. 6 Sat
  const diffToMon = (day + 6) % 7; // Mon=0
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() - diffToMon);
  const mm = String(monday.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(monday.getUTCDate()).padStart(2, "0");
  return `${monday.getUTCFullYear()}-${mm}-${dd}`; // Monday date label
}

function aggregateCompoundedReturns(points, mode) {
  // points: sorted ascending by date
  // returns: [{ date: bucketLabel, retPct: number }]
  const buckets = new Map(); // key -> { label, product }

  for (const p of points) {
    if (!Number.isFinite(p.dailyReturn)) continue;
    const key = bucketKey(p.date, mode);
    if (!buckets.has(key)) buckets.set(key, { label: key, product: 1 });
    const b = buckets.get(key);
    b.product *= 1 + p.dailyReturn;
  }

  return Array.from(buckets.entries())
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([key, b]) => {
      const comp = b.product - 1; // decimal
      return { date: key, retPct: comp * 100 };
    });
}

/* -----------------------------
   Tooltip styling (readable)
----------------------------- */

function StockTooltip({ active, payload, label, mode }) {
  if (!active || !payload || !payload.length) return null;

  const bg = "rgba(10, 12, 13, 0.92)";
  const border = "rgba(255, 255, 255, 0.08)";

  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 12,
        padding: "10px 12px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
      }}
    >
      <div
        style={{
          color: "var(--link-color)",
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        Date: {label}
      </div>

      {payload.map((p) => {
        const name = p.name;
        const val = p.value;

        let labelText = name;
        let valueText = String(val);

        if (mode === "price") {
          if (name === "close") labelText = "Close";
          if (name === "ma20") labelText = "MA (20D)";
          if (name === "ma50") labelText = "MA (50D)";
          if (Number.isFinite(val)) valueText = Number(val).toFixed(2);
        }

        if (mode === "returns") {
          labelText = Number(val) >= 0 ? "Gain" : "Loss";
          valueText = Number.isFinite(val) ? `${Number(val).toFixed(2)}%` : "—";
        }

        return (
          <div
            key={p.dataKey}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              color: "var(--primary-color)",
              fontWeight: 600,
              lineHeight: 1.35,
            }}
          >
            <span>{labelText}</span>
            <span style={{ opacity: 0.95 }}>{valueText}</span>
          </div>
        );
      })}
    </div>
  );
}

/* -----------------------------
   Component
----------------------------- */

const StockExplorer = () => {
  const [rows, setRows] = useState([]);
  const [ticker, setTicker] = useState("AAPL");
  const [range, setRange] = useState("1Y"); // 3M, 6M, 1Y, 2Y, ALL
  const [showMA20, setShowMA20] = useState(true);
  const [showMA50, setShowMA50] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/data/stocks_clean.csv")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (cancelled) return;
        setRows(parseCSV(text));
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(`Failed to load dataset: ${e.message}`);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const tickerMeta = useMemo(() => {
    const map = new Map();
    for (const r of rows) {
      if (!r.ticker) continue;
      const t = r.ticker;
      if (!map.has(t)) {
        const nameFromCSV = (r.company || "").trim();
        const name =
          nameFromCSV ||
          TICKER_NAME_FALLBACK[t] ||
          TICKER_NAME_FALLBACK[t.replace(".", "_")] ||
          "";
        map.set(t, { ticker: t, name });
      }
    }
    return map;
  }, [rows]);

  const tickers = useMemo(() => {
    return Array.from(new Set(rows.map((r) => r.ticker))).sort();
  }, [rows]);

  const fullSeries = useMemo(() => {
    const series = rows
      .filter((r) => r.ticker === ticker)
      .sort((a, b) => (a.date > b.date ? 1 : -1));
    return deriveDailyReturns(series);
  }, [rows, ticker]);

  const rangedSeries = useMemo(() => {
    if (!fullSeries.length) return [];
    if (range === "ALL") return fullSeries;

    const lastDate = fullSeries[fullSeries.length - 1].date;
    const last = new Date(lastDate + "T00:00:00");

    let days = 365;
    if (range === "3M") days = 92;
    if (range === "6M") days = 183;
    if (range === "1Y") days = 365;
    if (range === "2Y") days = 730;

    const cutoff = new Date(last);
    cutoff.setDate(cutoff.getDate() - days);

    return fullSeries.filter((p) => new Date(p.date + "T00:00:00") >= cutoff);
  }, [fullSeries, range]);

  const chartData = useMemo(() => {
    let data = rangedSeries.map((p) => ({ ...p }));

    const ma20 = computeSMA(data, 20);
    const ma50 = computeSMA(data, 50);

    data = data.map((p, i) => ({
      ...p,
      ma20: ma20[i]?.sma,
      ma50: ma50[i]?.sma,
      retPct: Number.isFinite(p.dailyReturn) ? p.dailyReturn * 100 : null,
    }));

    return data;
  }, [rangedSeries]);

  // For ALL: show monthly returns (far fewer bars), otherwise daily
  const returnsMode =
  range === "ALL" ? "month" :
  range === "1Y" || range === "2Y" ? "week" :
  "day";

  const returnsTitle =
    returnsMode === "month"
      ? "Monthly returns (%)"
      : returnsMode === "week"
      ? "Weekly returns (%)"
      : "Daily returns (%)";

  const returnsChartData = useMemo(() => {
    if (returnsMode === "day") {
      return chartData
        .map((d) => ({ date: d.date, retPct: d.retPct }))
        .filter((d) => Number.isFinite(d.retPct));
    }

    const mode = returnsMode === "month" ? "month" : "week";
    return aggregateCompoundedReturns(rangedSeries, mode);
  }, [returnsMode, chartData, rangedSeries]);

  const returnAxis = useMemo(() => {
    return computeReturnAxisFromPct(
      returnsChartData.map((d) => d.retPct).filter((v) => Number.isFinite(v))
    );
  }, [returnsChartData]);

  const insights = useMemo(() => {
    if (!rangedSeries.length) return null;

    const first = rangedSeries[0];
    const last = rangedSeries[rangedSeries.length - 1];

    const periodReturn =
      first.close !== 0 ? (last.close - first.close) / first.close : null;

    const nDays = daysBetween(first.date, last.date);
    const years = nDays > 0 ? nDays / 365.25 : null;

    const cagr =
      years && years > 0 && first.close > 0
        ? Math.pow(last.close / first.close, 1 / years) - 1
        : null;

    const rets = rangedSeries
      .map((p) => p.dailyReturn)
      .filter((v) => Number.isFinite(v));

    const mu = mean(rets);
    const sigma = stdev(rets);
    const annVol = sigma != null ? sigma * Math.sqrt(252) : null;

    const sharpeLike =
      sigma && sigma > 0 ? (mu * 252) / (sigma * Math.sqrt(252)) : null;

    let best = null;
    let worst = null;
    for (const p of rangedSeries) {
      if (!Number.isFinite(p.dailyReturn)) continue;
      if (!best || p.dailyReturn > best.dailyReturn) best = p;
      if (!worst || p.dailyReturn < worst.dailyReturn) worst = p;
    }

    const posPct =
      rets.length > 0 ? rets.filter((r) => r > 0).length / rets.length : null;

    const p05 = quantile(rets, 0.05);
    const var95 = Number.isFinite(p05) ? Math.max(0, -p05) : null;

    const dd = maxDrawdown(rangedSeries);

    return {
      latestDate: last.date,
      latestClose: last.close,
      points: rangedSeries.length,

      periodReturn,
      cagr,
      annVol,

      sharpeLike,
      bestDay: best ? { date: best.date, ret: best.dailyReturn } : null,
      worstDay: worst ? { date: worst.date, ret: worst.dailyReturn } : null,
      posPct,

      var95,
      maxDrawdown: dd.drawdown,
      ddPeakDate: dd.peakDate,
      ddTroughDate: dd.troughDate,
    };
  }, [rangedSeries]);

  return (
    <>
      <Helmet>
        <title>Stock Market Explorer | Adam Filice</title>
        <meta
          name="description"
          content="Interactive dashboard exploring stock prices, returns, and volatility using Python + React."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="projects" />

        <div className="content-wrapper">
          <main className="page-main project-page-main">
            <header className="project-page-header">
              <p className="project-page-kicker">Data Analysis Project</p>
              <h1>Stock Market Explorer</h1>
              <p className="project-page-intro">
                An interactive dashboard for exploring historical stock prices and return behavior.
                The goal of this project is not prediction, but understanding how price, volatility,
                and risk metrics behave across different time horizons.
              </p>

              <p className="project-page-intro">
                Market data is collected and cleaned in Python, exported as a static dataset, and then
                analyzed client-side using React. The UI emphasizes transparency in calculations —
                moving averages, returns, volatility, drawdowns, and summary statistics are computed
                directly in the browser rather than hidden behind an API.
              </p>
            </header>

            <section className="">
              {loading && <p>Loading dataset…</p>}
              {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

              {!loading && !error && insights && (
                <>
                  <div className="stock-kpi-grid">
                    <div className="stock-kpi-card">
                      <div className="stock-kpi-label">Ticker</div>
                      <select
                        className="stock-select"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        aria-label="Ticker"
                        style={{ width: "100%" }}
                      >
                        {tickers.map((t) => {
                          const meta = tickerMeta.get(t);
                          const name = meta?.name || "";
                          const label = name ? `${name} (${t})` : t;
                          return (
                            <option key={t} value={t}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                      <div className="stock-kpi-sub" style={{ marginTop: "0.35rem" }}>
                        Pick a symbol to explore
                      </div>
                    </div>

                    <div className="stock-kpi-card">
                      <div className="stock-kpi-label">Range</div>
                      <select
                        className="stock-select"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        aria-label="Range"
                        style={{ width: "100%" }}
                      >
                        <option value="3M">3M</option>
                        <option value="6M">6M</option>
                        <option value="1Y">1Y</option>
                        <option value="2Y">2Y</option>
                        <option value="ALL">ALL</option>
                      </select>
                      <div className="stock-kpi-sub" style={{ marginTop: "0.35rem" }}>
                        Window for charts/metrics
                      </div>
                    </div>

                    <div className="stock-kpi-card">
                      <div className="stock-kpi-label">Latest close</div>
                      <div className="stock-kpi-value">
                        {insights.latestClose.toFixed(2)}
                      </div>
                      <div className="stock-kpi-sub">{insights.latestDate}</div>
                    </div>

                    <div className="stock-kpi-card">
                      <div className="stock-kpi-label">Period return</div>
                      <div className="stock-kpi-value">
                        {formatPctFromDecimal(insights.periodReturn)}
                      </div>
                      <div className="stock-kpi-sub">{insights.points} points</div>
                    </div>
                  </div>

                  <div className="stock-chart-grid">
                    <div className="stock-chart-card">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "1rem",
                          marginBottom: "0.85rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <h2 className="stock-chart-title" style={{ margin: 0 }}>
                          Price
                        </h2>

                        <div
                          className="stock-toggles"
                          style={{ margin: 0, justifyContent: "flex-end" }}
                        >
                          <label className="stock-toggle">
                            <input
                              type="checkbox"
                              checked={showMA20}
                              onChange={(e) => setShowMA20(e.target.checked)}
                            />
                            20D MA
                          </label>

                          <label className="stock-toggle">
                            <input
                              type="checkbox"
                              checked={showMA50}
                              onChange={(e) => setShowMA50(e.target.checked)}
                            />
                            50D MA
                          </label>
                        </div>
                      </div>

                      <div className="stock-chart-wrap">
                        <ResponsiveContainer width="100%" height={440}>
                          <LineChart data={chartData}
                              margin={{
                              top: 6,
                              right: isMobile ? 6 : 16,
                              left: isMobile ? -4 : 8,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickMargin={isMobile ? 6 : 8} minTickGap={isMobile ? 48 : 24} />
                            <YAxis
                              width={isMobile ? 34 : 48}
                              tickMargin={isMobile ? 4 : 8}
                              domain={["auto", "auto"]}
                              tickFormatter={(v) => Number(v).toFixed(0)}
                            />
                            <Tooltip content={<StockTooltip mode="price" />} />

                            <Line
                                type="monotone"
                                dataKey="close"
                                dot={false}
                                stroke={COLOR_PRICE}
                                strokeWidth={2.25}
                                opacity={0.95}
                            />

                            {showMA20 && (
                                <Line
                                    type="monotone"
                                    dataKey="ma20"
                                    dot={false}
                                    stroke={COLOR_MA20}
                                    strokeWidth={2}
                                    strokeDasharray="4 4"
                                />
                            )}

                            {showMA50 && (
                                <Line
                                    type="monotone"
                                    dataKey="ma50"
                                    dot={false}
                                    stroke={COLOR_MA50}
                                    strokeWidth={2}
                                    strokeDasharray="4 4"
                                />
                            )}

                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="stock-chart-card">
                      <h2 className="stock-chart-title">{returnsTitle}</h2>
                      <div className="stock-chart-wrap">
                        <ResponsiveContainer width="100%" height={440}>
                          <BarChart data={returnsChartData}
                              margin={{
                                top: 6,
                                right: isMobile ? 6 : 16,
                                left: isMobile ? -4 : 8,
                                bottom: 0,
                              }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickMargin={isMobile ? 6 : 8} minTickGap={isMobile ? 48 : 24} />
                            <YAxis
                              width={isMobile ? 34 : 52}
                              tickMargin={isMobile ? 4 : 8}
                              domain={returnAxis.domain}
                              ticks={returnAxis.ticks}
                              tickFormatter={(v) => `${v}%`}
                            />
                            <Tooltip content={<StockTooltip mode="returns" />} />
                            <ReferenceLine
                              y={0}
                              stroke="rgba(255,255,255,0.25)"
                              strokeDasharray="4 4"
                            />
                            <Bar dataKey="retPct">
                              {returnsChartData.map((entry, idx) => (
                                <Cell
                                  key={`cell-${idx}`}
                                  fill={Number(entry.retPct) >= 0 ? "#22c55e" : "#ef4444"}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <section className="project-section" style={{ marginTop: "1.25rem" }}>
                    <h2>Computed insights</h2>

                    <div className="stock-insights-grid">
                      <div className="stock-insight-card">
                        <div className="stock-insight-title">Max drawdown</div>
                        <div className="stock-insight-value">
                          {formatPctFromDecimal(insights.maxDrawdown)}
                        </div>
                        <div className="stock-insight-sub">
                          {insights.ddPeakDate || "—"} → {insights.ddTroughDate || "—"}
                        </div>
                      </div>

                      <div className="stock-insight-card">
                        <div className="stock-insight-title">Best day</div>
                        <div className="stock-insight-value">
                          {insights.bestDay
                            ? formatPctFromDecimal(insights.bestDay.ret)
                            : "—"}
                        </div>
                        <div className="stock-insight-sub">
                          {insights.bestDay ? insights.bestDay.date : "—"}
                        </div>
                      </div>

                      <div className="stock-insight-card">
                        <div className="stock-insight-title">Worst day</div>
                        <div className="stock-insight-value">
                          {insights.worstDay
                            ? formatPctFromDecimal(insights.worstDay.ret)
                            : "—"}
                        </div>
                        <div className="stock-insight-sub">
                          {insights.worstDay ? insights.worstDay.date : "—"}
                        </div>
                      </div>

                      <div className="stock-insight-card">
                        <div className="stock-insight-title">Positive days</div>
                        <div className="stock-insight-value">
                          {formatPctFromDecimal(insights.posPct)}
                        </div>
                        <div className="stock-insight-sub">Return &gt; 0</div>
                      </div>

                      <div className="stock-insight-card">
                        <div className="stock-insight-title">1-day VaR (95%)</div>
                        <div className="stock-insight-value">
                          {formatPctFromDecimal(insights.var95)}
                        </div>
                        <div className="stock-insight-sub">5th percentile loss threshold</div>
                      </div>

                      <div className="stock-insight-card">
                        <div className="stock-insight-title">Sharpe-like</div>
                        <div className="stock-insight-value">
                          {Number.isFinite(insights.sharpeLike)
                            ? insights.sharpeLike.toFixed(2)
                            : "—"}
                        </div>
                        <div className="stock-insight-sub">(μ×252) / (σ×√252)</div>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </section>
          </main>

          <div className="page-footer">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default StockExplorer;