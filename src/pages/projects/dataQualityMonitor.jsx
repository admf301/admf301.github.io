import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import NavBar from "../../components/common/navBar";
import Footer from "../../components/common/footer";

/* -----------------------------
   Helpers
----------------------------- */

function formatPct(x) {
  if (!Number.isFinite(x)) return "—";
  return `${(x * 100).toFixed(2)}%`;
}

function formatInt(x) {
  if (!Number.isFinite(x)) return "—";
  return Intl.NumberFormat().format(Math.round(x));
}

function clamp(x, lo, hi) {
  return Math.max(lo, Math.min(hi, x));
}

function pickDifferentRandomIndex(n, current) {
  if (n <= 1) return 0;
  let idx = current;
  while (idx === current) idx = Math.floor(Math.random() * n);
  return idx;
}

function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function randFloat(min, max) {
  return min + Math.random() * (max - min);
}

// small delay helper for “scan” animation steps
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* -----------------------------
   Variable scan model (randomized)
----------------------------- */

const SCAN_STAGES = [
  { label: "Initializing scan…", pMin: 6, pMax: 12, msMin: 240, msMax: 520 },
  { label: "Loading dataset snapshot…", pMin: 14, pMax: 26, msMin: 420, msMax: 920 },
  { label: "Validating schema & types…", pMin: 28, pMax: 44, msMin: 520, msMax: 1100 },
  { label: "Checking missing values…", pMin: 46, pMax: 62, msMin: 520, msMax: 1200 },
  { label: "Detecting duplicates…", pMin: 64, pMax: 76, msMin: 420, msMax: 1050 },
  { label: "Scanning for outliers…", pMin: 78, pMax: 90, msMin: 520, msMax: 1250 },
  { label: "Compiling report…", pMin: 92, pMax: 98, msMin: 420, msMax: 980 },
  { label: "Finalizing…", pMin: 99, pMax: 100, msMin: 220, msMax: 520 },
];

/* -----------------------------
   Component
----------------------------- */

const DataQualityMonitor = () => {
  const [bundle, setBundle] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Scan animation state
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [scanProgress, setScanProgress] = useState(0);

  // When user presses "Next scenario", we queue which scenario to reveal after scan
  const queuedIndexRef = useRef(null);

  const scanAbortRef = useRef({ aborted: false });

  useEffect(() => {
    let cancelled = false;

    fetch("/data/qa/quality_report_bundle.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setBundle(json);
        setLoading(false);

        const n = json?.scenarios?.length || 0;
        if (n > 0) setActiveIndex(Math.floor(Math.random() * n)); // start on a random scenario
      })
      .catch((e) => {
        if (cancelled) return;
        setError(`Failed to load quality bundle: ${e.message}`);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const scenarios = bundle?.scenarios || [];
  const activeScenario = scenarios[activeIndex] || null;

  const chartData = useMemo(() => {
    if (!activeScenario?.series) return [];
    return activeScenario.series.map((d) => ({
      date: d.date,
      missingRate: d.missingRate,
      dupRate: d.dupRate,
      outlierRate: d.outlierRate,
    }));
  }, [activeScenario]);

  const scanStatus = useMemo(() => {
    if (!activeScenario) return { label: "—", tone: "neutral" };

    const { missingRate, dupRate, outlierRate } = activeScenario.kpis || {};
    const risk = (missingRate || 0) + (dupRate || 0) + (outlierRate || 0);

    if (risk >= 0.12) return { label: "High risk", tone: "bad" };
    if (risk >= 0.05) return { label: "Needs review", tone: "warn" };
    return { label: "Healthy", tone: "good" };
  }, [activeScenario]);

  const stopScan = () => {
    scanAbortRef.current.aborted = true;
    scanAbortRef.current = { aborted: false };
    queuedIndexRef.current = null;
    setIsScanning(false);
  };

  async function runFakeScan(targetIndex = null) {
    if (!scenarios.length || isScanning) return;

    // abort any previous scan
    stopScan();
    const token = scanAbortRef.current;

    setIsScanning(true);
    setScanProgress(0);
    setScanStep("Initializing scan…");

    // Decide which scenario to reveal after scan:
    // - If "Next scenario" queued one, use it.
    // - Else if caller passed a targetIndex, use it.
    // - Else pick a different random scenario.
    const queued = queuedIndexRef.current;
    const n = scenarios.length;
    const nextIndex =
      Number.isInteger(queued) && queued >= 0 && queued < n
        ? queued
        : Number.isInteger(targetIndex) && targetIndex >= 0 && targetIndex < n
        ? targetIndex
        : pickDifferentRandomIndex(n, activeIndex);

    let current = 0;

    for (let i = 0; i < SCAN_STAGES.length; i++) {
      if (token.aborted) return;

      const st = SCAN_STAGES[i];
      const target = randInt(st.pMin, st.pMax);
      const duration = randInt(st.msMin, st.msMax);

      setScanStep(st.label);

      const steps = randInt(7, 13);
      const stepMs = Math.max(28, Math.floor(duration / steps));
      const delta = (target - current) / steps;

      for (let s = 1; s <= steps; s++) {
        if (token.aborted) return;
        const jitter = randFloat(-0.35, 0.35);
        const next = clamp(current + delta * s + jitter, 0, 100);
        setScanProgress(next);
        await sleep(stepMs);
      }

      current = Math.max(current, target);

      if (target >= 90 && Math.random() < 0.55) {
        await sleep(randInt(120, 380));
      }
    }

    if (token.aborted) return;

    // Reveal the next scenario ONLY when scan completes
    setActiveIndex(nextIndex);
    queuedIndexRef.current = null;

    setScanStep("Scan complete.");
    setScanProgress(100);
    await sleep(randInt(260, 520));

    if (token.aborted) return;

    setIsScanning(false);
    setTimeout(() => {
      if (!scanAbortRef.current.aborted) setScanStep("");
    }, randInt(700, 1100));
  }

  const onNextScenarioAndScan = () => {
    if (!scenarios.length || isScanning) return;
    const next = scenarios.length ? (activeIndex + 1) % scenarios.length : 0;
    queuedIndexRef.current = next;
    runFakeScan(); // scan animation first, scenario swaps at the end
  };

  return (
    <>
      <Helmet>
        <title>Data Quality Monitor | Adam Filice</title>
        <meta
          name="description"
          content="Data quality monitoring dashboard with automated checks, KPIs, and trend visualizations."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="projects" />

        <div className="content-wrapper">
          <main className="page-main project-page-main">
            <header className="project-page-header">
              <p className="project-page-kicker">QA Project</p>
              <h1>Data Quality Monitor</h1>
              <p className="project-page-intro">
                A data-quality monitoring dashboard that presents the kind of signals teams rely on to
                trust production data: <strong>schema validation</strong>, <strong>completeness</strong>,
                <strong> duplicate detection</strong>, and <strong>outlier/anomaly rates</strong>. The UI is
                built to mimic an automated scan workflow—progress, status, and a structured report—so a
                recruiter can see how I translate QA concepts into clear metrics, trend visualizations, and
                actionable findings.
              </p>
            </header>

            <section className="">
              {loading && <p>Loading quality bundle…</p>}
              {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

              {!loading && !error && activeScenario && (
                <>
                  {/* Controls row */}
                  <div className="dq-controls">
                    <div className="dq-left">
                      <div className={`dq-status dq-${scanStatus.tone}`}>
                        <span className="dq-status-dot" />
                        <span>{scanStatus.label}</span>
                      </div>

                      <div className="dq-scenario">
                        <div className="dq-scenario-title">{activeScenario.title}</div>
                        <div className="dq-scenario-sub">{activeScenario.description}</div>
                      </div>
                    </div>

                    <div className="dq-actions">
                      <button
                        className="dq-scan-btn"
                        onClick={() => runFakeScan()}
                        disabled={isScanning}
                        type="button"
                      >
                        {isScanning ? "Scanning…" : "Run scan"}
                      </button>

                      <button
                        className="dq-scan-btn secondary"
                        onClick={onNextScenarioAndScan}
                        disabled={isScanning || scenarios.length < 2}
                        type="button"
                      >
                        Next scenario
                      </button>
                    </div>
                  </div>

                  {/* Scan progress */}
                  <div className="dq-progress">
                    <div className="dq-progress-top">
                      <div className="dq-progress-label">{scanStep || "Ready."}</div>
                      <div className="dq-progress-pct">
                        {isScanning ? `${Math.round(scanProgress)}%` : ""}
                      </div>
                    </div>
                    <div className="dq-progress-bar">
                      <div
                        className="dq-progress-fill"
                        style={{ width: `${clamp(scanProgress, 0, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="dq-kpi-grid">
                    <div className="dq-kpi-card">
                      <div className="dq-kpi-label">Rows scanned</div>
                      <div className="dq-kpi-value">{formatInt(activeScenario.kpis?.rows)}</div>
                    </div>

                    <div className="dq-kpi-card">
                      <div className="dq-kpi-label">Missing rate</div>
                      <div className="dq-kpi-value">{formatPct(activeScenario.kpis?.missingRate)}</div>
                    </div>

                    <div className="dq-kpi-card">
                      <div className="dq-kpi-label">Duplicate rate</div>
                      <div className="dq-kpi-value">{formatPct(activeScenario.kpis?.dupRate)}</div>
                    </div>

                    <div className="dq-kpi-card">
                      <div className="dq-kpi-label">Outlier rate</div>
                      <div className="dq-kpi-value">{formatPct(activeScenario.kpis?.outlierRate)}</div>
                    </div>
                  </div>

                  {/* Chart + Issues */}
                  <div className="dq-grid">
                    <div className="dq-card">
                      <div className="dq-card-header">
                        <h2 className="dq-card-title">Error rates over time</h2>
                        <div className="dq-card-sub">Missing • Duplicates • Outliers</div>
                      </div>

                      <div className="dq-chart">
                        <ResponsiveContainer width="100%" height={420}>
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickMargin={8} minTickGap={24} />
                            <YAxis
                              tickFormatter={(v) => `${(v * 100).toFixed(1)}%`}
                              domain={[0, "auto"]}
                              tickMargin={8}
                            />
                            <Tooltip
                              labelFormatter={(label) => `Date: ${label}`}
                              formatter={(value, name) => {
                                const label =
                                  name === "missingRate"
                                    ? "Missing"
                                    : name === "dupRate"
                                    ? "Duplicates"
                                    : "Outliers";
                                return [formatPct(value), label];
                              }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="missingRate" dot={false} strokeWidth={2} />
                            <Line type="monotone" dataKey="dupRate" dot={false} strokeWidth={2} />
                            <Line type="monotone" dataKey="outlierRate" dot={false} strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="dq-card">
                      <div className="dq-card-header">
                        <h2 className="dq-card-title">Top findings</h2>
                        <div className="dq-card-sub">Most common issues in this scan</div>
                      </div>

                      <div className="dq-issues">
                        {(activeScenario.topIssues || []).slice(0, 8).map((it, idx) => (
                          <div className="dq-issue-row" key={`${it.type}-${it.field}-${idx}`}>
                            <div className="dq-issue-left">
                              <div className="dq-issue-type">{it.type}</div>
                              <div className="dq-issue-field">{it.field}</div>
                            </div>
                            <div className="dq-issue-count">{formatInt(it.count)}</div>
                          </div>
                        ))}

                        {(!activeScenario.topIssues || activeScenario.topIssues.length === 0) && (
                          <div className="dq-empty">No findings reported for this scenario.</div>
                        )}
                      </div>
                    </div>
                  </div>
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

export default DataQualityMonitor;