import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../../components/common/navBar";
import Footer from "../../components/common/footer";

/* -----------------------------
   Storage keys
----------------------------- */

const LS_ACCOUNTS_KEY = "iamlab.accounts.v1";
const LS_SESSION_KEY = "iamlab.session.v1";
const LS_AUDIT_KEY = "iamlab.audit.v1";

/* -----------------------------
   Helpers
----------------------------- */

function clamp(x, lo, hi) {
  return Math.max(lo, Math.min(hi, x));
}

function randInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function safeJsonParse(str, fallback) {
  try {
    const v = JSON.parse(str);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

function nowIso() {
  return new Date().toISOString();
}

function titleCase(s) {
  if (!s) return "";
  return String(s)
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function normalizeDept(s) {
  return titleCase(String(s || "").trim());
}

function normalizeRole(s) {
  return String(s || "").trim().toLowerCase();
}

function effectColor(effect) {
  if (effect === "ALLOW") return "iam-pill iam-allow";
  if (effect === "DENY") return "iam-pill iam-deny";
  return "iam-pill";
}

function shortReason(str, max = 92) {
  const s = String(str || "").trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "…";
}

/* -----------------------------
   Policy evaluation
   - RBAC baseline + policy overrides
----------------------------- */

function roleAllows(roles, userRole, resourceType, action) {
  const role = roles.find((r) => r.id === userRole);
  if (!role) return false;

  return role.permissions.some((perm) => {
    const typeMatch = perm.resourceType === "*" || perm.resourceType === resourceType;
    if (!typeMatch) return false;
    return perm.actions.includes("*") || perm.actions.includes(action);
  });
}

// Conditions are intentionally simple but "real enough" for a portfolio.
function policyMatches(policy, ctx) {
  const w = policy.when || {};
  const { user, resource, action } = ctx;

  const checks = [];

  if (w.resourceTypeIn) checks.push(w.resourceTypeIn.includes(resource.type));
  if (w.actionIn) checks.push(w.actionIn.includes(action));
  if (w.resourceSensitivityIn) checks.push(w.resourceSensitivityIn.includes(resource.sensitivity));
  if (typeof w.userMfaEnabled === "boolean") checks.push(Boolean(user.mfa) === w.userMfaEnabled);
  if (w.userRoleNotIn) checks.push(!w.userRoleNotIn.includes(user.role));
  if (w.userDeptEqualsOwnerDept) checks.push(user.dept === resource.ownerDept);
  if (w.notUserDeptEqualsOwnerDept) checks.push(user.dept !== resource.ownerDept);

  if (checks.length === 0) return false;

  return checks.every(Boolean);
}

function evaluateAccess({ roles, policies }, ctx) {
  const baseAllow = roleAllows(roles, ctx.user.role, ctx.resource.type, ctx.action);

  const sorted = (policies || [])
    .slice()
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));

  const matches = sorted
    .map((p) => ({ p, matched: policyMatches(p, ctx) }))
    .filter((x) => x.matched)
    .map((x) => x.p);

  const deny = matches.find((p) => p.effect === "DENY");
  if (deny) {
    return {
      decision: "DENY",
      basis: baseAllow ? "RBAC allowed, but policy denied." : "RBAC denied, and policy denied.",
      matchedPolicies: matches,
      primaryPolicy: deny,
      rbacAllowed: baseAllow,
    };
  }

  const allow = matches.find((p) => p.effect === "ALLOW");
  if (allow) {
    return {
      decision: "ALLOW",
      basis: baseAllow ? "RBAC allowed, and policy allowed." : "Policy allowed (override).",
      matchedPolicies: matches,
      primaryPolicy: allow,
      rbacAllowed: baseAllow,
    };
  }

  return {
    decision: baseAllow ? "ALLOW" : "DENY",
    basis: baseAllow ? "RBAC allowed." : "RBAC denied.",
    matchedPolicies: matches,
    primaryPolicy: null,
    rbacAllowed: baseAllow,
  };
}

/* -----------------------------
   Scan animation stages
----------------------------- */

const SCAN_STAGES = [
  { label: "Establishing session", targetMin: 8, targetMax: 16, msMin: 260, msMax: 520 },
  { label: "Loading policy set", targetMin: 18, targetMax: 34, msMin: 420, msMax: 860 },
  { label: "Normalizing identity claims", targetMin: 36, targetMax: 52, msMin: 420, msMax: 900 },
  { label: "Evaluating RBAC permissions", targetMin: 54, targetMax: 70, msMin: 420, msMax: 980 },
  { label: "Applying policy constraints", targetMin: 72, targetMax: 88, msMin: 520, msMax: 1080 },
  { label: "Generating decision trace", targetMin: 90, targetMax: 96, msMin: 420, msMax: 820 },
  { label: "Finalizing result", targetMin: 97, targetMax: 100, msMin: 260, msMax: 680 },
];

/* -----------------------------
   Component
----------------------------- */

const IAMPolicyLab = () => {
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Auth UX
  const [authMode, setAuthMode] = useState("login"); // login | create
  const [accounts, setAccounts] = useState(() =>
    safeJsonParse(localStorage.getItem(LS_ACCOUNTS_KEY), [])
  );

  const [session, setSession] = useState(() =>
    safeJsonParse(localStorage.getItem(LS_SESSION_KEY), null)
  );

  // Create form
  const [newName, setNewName] = useState("");
  const [newDept, setNewDept] = useState("Finance");
  const [newRole, setNewRole] = useState("analyst");
  const [newMfa, setNewMfa] = useState(true);

  // Login selector
  const [selectedProfileId, setSelectedProfileId] = useState("");

  // Policy lab selections
  const [resourceId, setResourceId] = useState("");
  const [action, setAction] = useState("");

  // Scan animation
  const [isScanning, setIsScanning] = useState(false);
  const [scanStage, setScanStage] = useState("Ready.");
  const [scanProgress, setScanProgress] = useState(0);

  // Result
  const [result, setResult] = useState(null);

  // Audit log
  const [audit, setAudit] = useState(() =>
    safeJsonParse(localStorage.getItem(LS_AUDIT_KEY), [])
  );

  const timersRef = useRef([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/data/iam/iam_bundle.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        setBundle(json);
        setLoading(false);

        // Seed selectors
        const firstRes = json?.resources?.[0]?.id || "";
        setResourceId((cur) => cur || firstRes);

        // default action based on type
        const firstType = json?.resources?.[0]?.type;
        const firstAction = (firstType && json?.actionsByType?.[firstType]?.[0]) || "read";
        setAction((cur) => cur || firstAction);

        // Build login dropdown default (first available item)
        const builtProfiles = json?.profiles || [];
        const firstProfileId = builtProfiles[0]?.id || "";
        setSelectedProfileId((cur) => cur || firstProfileId);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(`Failed to load IAM bundle: ${e.message}`);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_ACCOUNTS_KEY, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem(LS_SESSION_KEY, JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    localStorage.setItem(LS_AUDIT_KEY, JSON.stringify(audit));
  }, [audit]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  const roles = useMemo(() => bundle?.roles ?? [], [bundle]);
  const resources = useMemo(() => bundle?.resources ?? [], [bundle]);
  const policies = useMemo(() => bundle?.policies ?? [], [bundle]);
  const actionsByType = useMemo(() => bundle?.actionsByType ?? {}, [bundle]);
  const presetProfiles = useMemo(() => bundle?.profiles ?? [], [bundle]);

  const loginOptions = useMemo(() => {
    const presets = presetProfiles.map((p) => ({
      kind: "preset",
      id: p.id,
      label: p.label,
      user: p.user,
    }));

    const created = accounts.map((a) => ({
      kind: "created",
      id: a.id,
      label: `${a.user.name} (${a.user.role})`,
      user: a.user,
    }));

    return [...presets, ...created];
  }, [presetProfiles, accounts]);

  const loggedInUser = session?.user || null;

  const activeResource = useMemo(() => {
    return resources.find((r) => r.id === resourceId) || resources[0] || null;
  }, [resources, resourceId]);

  const validActions = useMemo(() => {
    const t = activeResource?.type;
    return (t && actionsByType[t]) || ["read"];
  }, [activeResource, actionsByType]);

  useEffect(() => {
    if (!validActions.includes(action)) {
      setAction(validActions[0] || "read");
    }
  }, [validActions, action]);

  function startScanTimersAndComplete({ onComplete }) {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];

    setIsScanning(true);
    setScanProgress(0);

    let stageBase = 0;

    const scheduleStage = (stageIndex) => {
      const stage = SCAN_STAGES[stageIndex];
      if (!stage) {
        setScanStage("Decision ready.");
        setScanProgress(100);
        setIsScanning(false);
        onComplete?.();
        return;
      }

      const target = randInt(stage.targetMin, stage.targetMax);
      const duration = randInt(stage.msMin, stage.msMax);

      setScanStage(stage.label);

      const steps = randInt(6, 12);
      const stepMs = Math.max(30, Math.floor(duration / steps));
      const delta = (target - stageBase) / steps;

      for (let i = 1; i <= steps; i++) {
        const nextValue = clamp(stageBase + delta * i, 0, 100);
        const timer = setTimeout(() => {
          setScanProgress(nextValue);
        }, i * stepMs);
        timersRef.current.push(timer);
      }

      const advanceTimer = setTimeout(() => {
        stageBase = Math.max(stageBase, target);

        const shouldStall = target >= 88 && target <= 96 && Math.random() < 0.55;
        if (shouldStall) {
          const stall = setTimeout(() => {
            scheduleStage(stageIndex + 1);
          }, randInt(140, 420));
          timersRef.current.push(stall);
        } else {
          scheduleStage(stageIndex + 1);
        }
      }, duration + randInt(50, 140));

      timersRef.current.push(advanceTimer);
    };

    scheduleStage(0);
  }

  function doLoginFromSelected() {
    const opt = loginOptions.find((o) => o.id === selectedProfileId);
    if (!opt) return;

    setSession({
      id: `sess_${Math.random().toString(16).slice(2)}`,
      user: {
        name: opt.user.name,
        dept: normalizeDept(opt.user.dept),
        role: normalizeRole(opt.user.role),
        mfa: Boolean(opt.user.mfa),
      },
      source: opt.kind,
      loggedInAt: nowIso(),
    });

    setResult(null);
  }

  function createAccount() {
    const name = titleCase(newName.trim());
    if (!name) return;

    const acct = {
      id: `acct_${Math.random().toString(16).slice(2)}`,
      createdAt: nowIso(),
      user: {
        name,
        dept: normalizeDept(newDept),
        role: normalizeRole(newRole),
        mfa: Boolean(newMfa),
      },
    };

    setAccounts((prev) => [acct, ...prev]);

    // Immediately log them in
    setSession({
      id: `sess_${Math.random().toString(16).slice(2)}`,
      user: acct.user,
      source: "created",
      loggedInAt: nowIso(),
    });

    // Also: select them in the unified dropdown
    setSelectedProfileId(acct.id);

    // reset form
    setNewName("");
    setAuthMode("login");
    setResult(null);
  }

  function logout() {
    setSession(null);
    setResult(null);
    setScanStage("Ready.");
    setScanProgress(0);
  }

  function runEvaluation() {
    if (!bundle || !loggedInUser || !activeResource || !action || isScanning) return;

    setResult(null);

    startScanTimersAndComplete({
      onComplete: () => {
        const ctx = { user: loggedInUser, resource: activeResource, action };
        const ev = evaluateAccess({ roles, policies }, ctx);

        const row = {
          id: `audit_${Math.random().toString(16).slice(2)}`,
          ts: nowIso(),
          user: `${loggedInUser.name} (${loggedInUser.role})`,
          dept: loggedInUser.dept,
          mfa: loggedInUser.mfa,
          resource: `${activeResource.name}`,
          resourceType: activeResource.type,
          sensitivity: activeResource.sensitivity,
          action,
          decision: ev.decision,
          basis: ev.basis,
          primaryPolicy: ev.primaryPolicy?.id || null,
        };

        setResult(ev);
        setAudit((prev) => [row, ...prev].slice(0, 40));
      },
    });
  }

  function nextScenarioAndScan() {
    if (!loginOptions.length) return;

    const ids = loginOptions.map((o) => o.id);
    const curIdx = Math.max(0, ids.indexOf(selectedProfileId));
    const nextIdx = (curIdx + 1) % ids.length;
    const nextId = ids[nextIdx];

    setSelectedProfileId(nextId);

    if (!loggedInUser || isScanning) return;

    const opt = loginOptions.find((o) => o.id === nextId);
    if (!opt) return;

    setSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        user: {
          name: opt.user.name,
          dept: normalizeDept(opt.user.dept),
          role: normalizeRole(opt.user.role),
          mfa: Boolean(opt.user.mfa),
        },
        source: opt.kind,
        loggedInAt: nowIso(),
      };
    });

    const t = setTimeout(() => runEvaluation(), randInt(120, 280));
    timersRef.current.push(t);
  }

  const displayUser = loggedInUser
    ? `${loggedInUser.name} • ${loggedInUser.dept} • ${loggedInUser.role.toUpperCase()} • MFA ${
        loggedInUser.mfa ? "ON" : "OFF"
      }`
    : "Not signed in";

  return (
    <>
      <Helmet>
        <title>IAM Policy Lab | Adam Filice</title>
        <meta
          name="description"
          content="An interactive IAM Policy Lab that evaluates access requests with explainable RBAC + policy constraints and an audit trail."
        />
      </Helmet>

      <div className="page-container">
        <NavBar active="projects" />

        <div className="content-wrapper">
          <main className="page-main project-page-main">
            <header className="project-page-header">
              <p className="project-page-kicker">IAM Project</p>
              <h1>IAM Policy Lab</h1>
              <p className="project-page-intro">
                An interactive Identity &amp; Access Management sandbox that evaluates access requests using
                <strong> role-based permissions</strong> plus <strong>policy constraints</strong>, then produces a
                clear decision trace and audit trail — similar to how production systems explain “why access was
                allowed/denied.”
              </p>
            </header>

            <section className="">
              {loading && <p>Loading IAM bundle…</p>}
              {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

              {!loading && !error && bundle && (
                <>
                  {/* Auth + Status */}
                  <div className="iam-top-grid">
                    <div className="iam-card">
                      <div className="iam-card-header">
                        <h2 className="iam-card-title">Session</h2>
                        {loggedInUser && (
                          <button className="iam-btn primary" onClick={logout} type="button">
                            Sign out
                          </button>
                        )}
                      </div>

                      <div className="iam-session-line">
                        <span className={`iam-pill ${loggedInUser ? "iam-pill-on" : "iam-pill-off"}`}>
                          {loggedInUser ? "Signed in" : "Signed out"}
                        </span>
                        <div className="iam-session-user">{displayUser}</div>
                      </div>

                      {!loggedInUser && (
                        <div className="iam-auth-block">
                          {authMode === "login" && (
                            <div className="iam-auth-panel">
                              <label className="iam-label">Profile</label>
                              <select
                                className="iam-select"
                                value={selectedProfileId}
                                onChange={(e) => setSelectedProfileId(e.target.value)}
                              >
                                {loginOptions.map((o) => (
                                  <option key={o.id} value={o.id}>
                                    {o.kind === "created" ? `Your account — ${o.label}` : o.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          <div className="iam-auth-tabs">
                            <button className="iam-btn primary" onClick={doLoginFromSelected} type="button">
                              Sign in
                            </button>

                            <button
                              className={`iam-tab ${authMode === "create" ? "active" : ""}`}
                              onClick={() => setAuthMode("create")}
                              type="button"
                            >
                              Create account
                            </button>
                          </div>

                          {authMode === "create" && (
                            <div className="iam-auth-panel">
                              <label className="iam-label">Display name</label>
                              <input
                                className="iam-input"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="e.g., Alex"
                              />

                              <div className="iam-2col">
                                <div>
                                  <label className="iam-label">Department</label>
                                  <select
                                    className="iam-select"
                                    value={newDept}
                                    onChange={(e) => setNewDept(e.target.value)}
                                  >
                                    <option>Finance</option>
                                    <option>HR</option>
                                    <option>Sales</option>
                                    <option>Engineering</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="iam-label">Role</label>
                                  <select
                                    className="iam-select"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                  >
                                    {roles.map((r) => (
                                      <option key={r.id} value={r.id}>
                                        {r.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <label className="iam-check">
                                <input
                                  type="checkbox"
                                  checked={newMfa}
                                  onChange={(e) => setNewMfa(e.target.checked)}
                                />
                                MFA enabled
                              </label>

                              <div className="iam-auth-actions">
                                <button
                                  className="iam-btn primary"
                                  onClick={createAccount}
                                  type="button"
                                  disabled={!newName.trim()}
                                >
                                  Create &amp; sign in
                                </button>

                                <button className="iam-btn primary" onClick={() => setAuthMode("login")} type="button">
                                  Back to login
                                </button>
                              </div>

                              <div className="iam-muted">
                                This is a demo login for portfolio interaction (stored locally).
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="iam-card">
                      <div className="iam-card-header">
                        <h2 className="iam-card-title">Access request</h2>
                        <span className={effectColor(result?.decision)}>{result ? result.decision : "—"}</span>
                      </div>

                      <div className="iam-2col">
                        <div>
                          <label className="iam-label">Resource</label>
                          <select
                            className="iam-select"
                            value={resourceId}
                            onChange={(e) => setResourceId(e.target.value)}
                            disabled={!loggedInUser || isScanning}
                          >
                            {resources.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="iam-label">Action</label>
                          <select
                            className="iam-select"
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                            disabled={!loggedInUser || isScanning}
                          >
                            {validActions.map((a) => (
                              <option key={a} value={a}>
                                {a}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="iam-actions">
                        <button
                          className="iam-btn primary"
                          onClick={runEvaluation}
                          type="button"
                          disabled={!loggedInUser || isScanning}
                        >
                          {isScanning ? "Evaluating…" : "Evaluate access"}
                        </button>

                        <button
                          className="iam-btn primary"
                          onClick={nextScenarioAndScan}
                          type="button"
                          disabled={isScanning || loginOptions.length < 2}
                          title={
                            loggedInUser
                              ? "Swap to a different identity profile and re-evaluate"
                              : "Pick a different identity profile"
                          }
                        >
                          Next profile &amp; run
                        </button>
                      </div>

                      <div className="iam-progress">
                        <div className="iam-progress-top">
                          <div className="iam-progress-label">{scanStage}</div>
                          <div className="iam-progress-pct">{isScanning ? `${Math.round(scanProgress)}%` : ""}</div>
                        </div>
                        <div className="iam-progress-bar">
                          <div className="iam-progress-fill" style={{ width: `${clamp(scanProgress, 0, 100)}%` }} />
                        </div>
                      </div>

                      {activeResource && (
                        <div className="iam-meta">
                          <div className="iam-meta-row">
                            <span className="iam-meta-k">Type</span>
                            <span className="iam-meta-v">{activeResource.type}</span>
                          </div>
                          <div className="iam-meta-row">
                            <span className="iam-meta-k">Owner</span>
                            <span className="iam-meta-v">{activeResource.ownerDept}</span>
                          </div>
                          <div className="iam-meta-row">
                            <span className="iam-meta-k">Sensitivity</span>
                            <span className="iam-meta-v">{activeResource.sensitivity}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Decision trace */}
                  {result && (
                    <div className="iam-grid">
                      <div className="iam-card">
                        <div className="iam-card-header">
                          <h2 className="iam-card-title">Decision trace</h2>
                          <span className={`iam-pill ${result.rbacAllowed ? "iam-pill-on" : "iam-pill-off"}`}>
                            RBAC {result.rbacAllowed ? "Allowed" : "Denied"}
                          </span>
                        </div>

                        <div className="iam-trace">
                          <div className="iam-trace-row">
                            <div className="iam-trace-k">Outcome</div>
                            <div className="iam-trace-v">
                              <span className={effectColor(result.decision)}>{result.decision}</span>
                            </div>
                          </div>

                          <div className="iam-trace-row">
                            <div className="iam-trace-k">Reason</div>
                            <div className="iam-trace-v">{result.basis}</div>
                          </div>

                          <div className="iam-trace-row">
                            <div className="iam-trace-k">Primary policy</div>
                            <div className="iam-trace-v">
                              {result.primaryPolicy ? (
                                <>
                                  <span className={effectColor(result.primaryPolicy.effect)}>{result.primaryPolicy.effect}</span>
                                  <span style={{ marginLeft: "0.5rem" }}>{result.primaryPolicy.id}</span>
                                </>
                              ) : (
                                <span className="iam-muted">None matched</span>
                              )}
                            </div>
                          </div>

                          <div className="iam-trace-row">
                            <div className="iam-trace-k">Policy note</div>
                            <div className="iam-trace-v">
                              {result.primaryPolicy ? shortReason(result.primaryPolicy.description) : "—"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="iam-card">
                        <div className="iam-card-header">
                          <h2 className="iam-card-title">Matched policies</h2>
                          <span className="iam-pill">{result.matchedPolicies?.length || 0}</span>
                        </div>

                        <div className="iam-policy-list">
                          {(result.matchedPolicies || []).length === 0 && (
                            <div className="iam-empty">No policies matched this request.</div>
                          )}

                          {(result.matchedPolicies || []).slice(0, 8).map((p) => (
                            <div key={p.id} className="iam-policy-row">
                              <div className="iam-policy-left">
                                <div className="iam-policy-top">
                                  <span className={effectColor(p.effect)}>{p.effect}</span>
                                  <span className="iam-policy-id">{p.id}</span>
                                  <span className="iam-policy-pri">P{p.priority ?? 0}</span>
                                </div>
                                <div className="iam-policy-desc">{shortReason(p.description, 110)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Audit log */}
                  <div className="iam-card" style={{ marginTop: "1rem" }}>
                    <div className="iam-card-header">
                      <h2 className="iam-card-title">Audit trail</h2>
                      <span className="iam-pill">{audit.length}</span>
                    </div>

                    {audit.length === 0 ? (
                      <div className="iam-empty">Run an evaluation to generate an audit entry.</div>
                    ) : (
                      <div className="iam-table-wrap">
                        <table className="iam-table">
                          <thead>
                            <tr>
                              <th>Time</th>
                              <th>User</th>
                              <th>Request</th>
                              <th>Decision</th>
                              <th>Reason</th>
                            </tr>
                          </thead>
                          <tbody>
                            {audit.slice(0, 14).map((r) => (
                              <tr key={r.id}>
                                <td data-label="Time" style={{ whiteSpace: "nowrap" }}>
                                  {r.ts.slice(0, 19).replace("T", " ")}
                                </td>
                                <td data-label="User">{r.user}</td>
                                <td data-label="Request">
                                  {r.action} • {r.resourceType} • {r.sensitivity}
                                </td>
                                <td data-label="Decision">
                                  <span className={effectColor(r.decision)}>{r.decision}</span>
                                </td>
                                <td data-label="Reason">{shortReason(r.basis, 74)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <div className="iam-muted" style={{ marginTop: "0.65rem" }}>
                      Audit entries persist locally.
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

export default IAMPolicyLab;