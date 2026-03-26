const { useState, useMemo, useRef, useEffect, useCallback } = React;
const { Search, ChevronDown, X, BarChart3, ChevronLeft, ChevronRight, Plus, Eye, ArrowUpDown, MessageSquarePlus, Clock, RefreshCw, Loader2, Wifi, WifiOff } = lucideReact;
const { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } = Recharts;

// =====================================================
// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BELOW
// =====================================================
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbytyr2RlcqlviuROvsOr3kbgRNUCsaTH5GhhO5DwUcQdwB9DjR201XrCVdzMAqs5L0C/exec";
// =====================================================

const TIER_COLORS = {
  "1": { bg: "#14532d", text: "#bbf7d0", badge: "#22c55e", label: "Tier 1" },
  "2": { bg: "#1e3a5f", text: "#bfdbfe", badge: "#3b82f6", label: "Tier 2" },
  "3": { bg: "#713f12", text: "#fef08a", badge: "#eab308", label: "Tier 3" },
  "4": { bg: "#7f1d1d", text: "#fecaca", badge: "#ef4444", label: "Tier 4" },
};
const CHART_COLORS = ["#22c55e","#3b82f6","#eab308","#ef4444","#8b5cf6","#ec4899","#06b6d4","#f97316","#84cc16","#a855f7","#14b8a6","#e11d48","#6366f1","#f59e0b","#10b981","#d946ef","#0ea5e9","#fb923c","#4ade80","#f43f5e"];
const F = "'DM Sans', sans-serif";
const LOGO_SRC = "data:image/png;base64,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D2GY3uK2cZJ5CPjLxNethFYYEXFGxYNIs+xAGNWzDvBaQkuFpxVBHwfmEAqD+4FrgIMtA4lIcSoeRMbLFoRWiiUI6648A5hPmCxpReA5wCrAkoT5A54asr3/A/4FPDGxzSeA24C7CPMqnJD6FxAReyoeREREpBBNTy0iIiKFqHgQERGRQlQ8iIiISCEqHkRERKQQFQ8iIiJSiIoHERERKUTFg4iIiBSi4kFEREQKUfEgIiIihah4EBERkUJUPIiIiEghKh5ERESkEBUPIiIiUoiKBxERESlExYOIiIgUouJBREREClHxICIiIoWoeBAREZFCVDyIiIhIISoeREREpBAVDyIiIlKIigcREREpRMWDiIiIFKLiQURERApR8SAiIiKFqHgQERGRQlQ8iIiISCEqHkRERKQQFQ8iIiJSiIoHERERKUTFg4iIiBSi4kFEREQKUfEgIiIihah4EBERkUJUPIiIiEghKh5ERESkEBUPIiIiUoiKBxERESlExYOIiIgUouJBREREClHxICIiIoWoeBAREZFCVDyIiIhIISoeREREpBAVDyIiIlKIigcREREpRMWDiIiIFKLiQURERApR8SBSvluA1ohfcw3yioyLUd+XLWCaQV43VDyIlG+JiOcuniyFiHTbOfL581OEqCsVDyLlWybiuU8mSyEi3eZFPn+5JClqSsWDSPliTjIrJ0shIt1akc8/KkWIulLxIFK+ORHPvSNVCBGZJPaW4A5JUtSUigeR8q0Y8dxVU4UQkUlibwk+niRFTal4ECnf0xHPfSxZChHpFvv5t2iSFDWl4kFEREQKUfEgIiIihah4EBERkUJUPIiIiEghKh5ERESkEBUPIiIiUoiKBxERESlExYOIiIyjBZHPH+tF61Q8iIjIOFos8vmPJElRU7F/vDy2Ap4HrElYIGhR4AngTuB24GHglApyyGTTCa/LioTXZQrhtbkPuAH4plmydHYCXkFYEntJwu/4MHArsI9hLm92AFYDVgFWIFxUzJ/4ehq4l/A3O84qYEm2Bt4MPAU8A3h04v+vAQ43zJXCIcDahA+4pSa+FgD/Av5B/X+/PPYAXks4nu8F/gYc2/XzmJlfIfxNLW0HLA28BHgu4didRziPP0T4jL0HOKaMnU9ptWIXFlvIbOCDwPIjPPcq4HzgKykDCQcTXpOXjPj824A/El6bWYky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";

// ===== API HELPERS =====
async function fetchData() {
  const res = await fetch(APPS_SCRIPT_URL);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

async function postData(payload) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" }, // Apps Script needs this for CORS
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

function getUnique(data, field) {
  return [...new Set(data.map(d => d[field]).filter(Boolean))].sort();
}

function Dropdown({ label, options, selected, onChange, multi = true }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  const count = selected.length;
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, border: count > 0 ? "1.5px solid #3b82f6" : "1px solid #374151", background: count > 0 ? "rgba(59,130,246,0.08)" : "#111827", color: count > 0 ? "#93c5fd" : "#9ca3af", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontFamily: F }}>
        {label}{count > 0 && ` (${count})`}<ChevronDown size={14} />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 50, background: "#1f2937", border: "1px solid #374151", borderRadius: 10, padding: 6, minWidth: 200, maxHeight: 280, overflowY: "auto", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
          {count > 0 && <button onClick={() => onChange([])} style={{ width: "100%", padding: "6px 10px", background: "none", border: "none", color: "#ef4444", fontSize: 12, cursor: "pointer", textAlign: "left", fontFamily: F }}>Clear all</button>}
          {options.map(opt => {
            const active = selected.includes(opt);
            return (<button key={opt} onClick={() => { if (multi) onChange(active ? selected.filter(s => s !== opt) : [...selected, opt]); else { onChange(active ? [] : [opt]); setOpen(false); } }} style={{ display: "block", width: "100%", padding: "6px 10px", background: active ? "rgba(59,130,246,0.15)" : "none", border: "none", color: active ? "#93c5fd" : "#d1d5db", fontSize: 13, cursor: "pointer", textAlign: "left", borderRadius: 6, fontFamily: F }}>
              {multi && <span style={{ marginRight: 8, opacity: active ? 1 : 0.3 }}>{active ? "\u2713" : "\u25CB"}</span>}{opt}
            </button>);
          })}
        </div>
      )}
    </div>
  );
}

function EditableCell({ value, onSave, style, inputWidth }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef(null);
  useEffect(() => { if (editing && ref.current) ref.current.focus(); }, [editing]);
  useEffect(() => { setDraft(value); }, [value]);
  if (editing) return (
    <input ref={ref} value={draft} onChange={e => setDraft(e.target.value)}
      onBlur={() => { onSave(draft); setEditing(false); }}
      onKeyDown={e => { if (e.key === "Enter") { onSave(draft); setEditing(false); } if (e.key === "Escape") { setDraft(value); setEditing(false); } }}
      style={{ background: "#0d1117", border: "1px solid #3b82f6", borderRadius: 4, color: "#f9fafb", fontSize: 13, fontFamily: F, padding: "2px 6px", outline: "none", width: inputWidth || "100%", boxSizing: "border-box" }} />
  );
  return (<span onClick={() => setEditing(true)} style={{ ...style, cursor: "pointer", borderBottom: "1px dashed transparent" }} onMouseEnter={e => e.currentTarget.style.borderBottomColor = "#374151"} onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"} title="Click to edit">{value || "\u2014"}</span>);
}

function TierBadge({ tier, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  const tc = TIER_COLORS[tier] || TIER_COLORS["4"];
  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <span onClick={() => setOpen(!open)} style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: tc.bg, color: tc.badge, fontFamily: F, cursor: "pointer", userSelect: "none" }} title="Click to change tier">{tier}</span>
      {open && (<div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 60, background: "#1f2937", border: "1px solid #374151", borderRadius: 8, padding: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
        {["1","2","3","4"].map(t => { const c = TIER_COLORS[t]; return (<button key={t} onClick={() => { onChange(t); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "5px 10px", background: tier === t ? "rgba(59,130,246,0.15)" : "none", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: F }}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: c.badge }} /><span style={{ color: "#d1d5db", fontSize: 13 }}>{c.label}</span></button>); })}
      </div>)}
    </div>
  );
}

function PlayerModal({ player, onClose, locationLabel, onAddEval, tab }) {
  const [showAddEval, setShowAddEval] = useState(false);
  const [evalForm, setEvalForm] = useState({ evaluator: "", notes: "" });
  const [saving, setSaving] = useState(false);
  if (!player) return null;
  const tier = TIER_COLORS[player.tier] || TIER_COLORS["4"];
  const evals = player.evaluations || [];

  const handleAddEval = async () => {
    if (!evalForm.notes.trim() || !evalForm.evaluator.trim()) return;
    setSaving(true);
    try {
      await postData({
        action: "addEval",
        tab: tab === "college" ? "College" : "HS",
        lastName: player.lastName,
        firstName: player.firstName,
        evaluator: evalForm.evaluator,
        notes: evalForm.notes.trim(),
      });
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      onAddEval(player.id, { evaluator: evalForm.evaluator, date: dateStr, notes: evalForm.notes.trim() });
      setEvalForm({ evaluator: "", notes: "" });
      setShowAddEval(false);
    } catch (err) {
      alert("Failed to save evaluation: " + err.message);
    }
    setSaving(false);
  };

  const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #374151", background: "#0d1117", color: "#f9fafb", fontSize: 13, fontFamily: F, outline: "none", boxSizing: "border-box" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#111827", borderRadius: 16, padding: 28, maxWidth: 600, width: "100%", border: "1px solid #1f2937", boxShadow: "0 25px 60px rgba(0,0,0,0.5)", maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#f9fafb", margin: 0, fontFamily: F }}>{player.firstName} {player.lastName}</h2>
            <p style={{ color: "#9ca3af", margin: "4px 0 0", fontSize: 14, fontFamily: F }}>{player.position} \u00B7 {locationLabel}: {player.location} \u00B7 Class of {player.class}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer" }}><X size={20} /></button>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: tier.bg, color: tier.badge, fontFamily: F }}>{tier.label}</span>
          {player.handedness && <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, background: "#1f2937", color: "#d1d5db", fontFamily: F }}>{player.handedness}</span>}
          {player.age && <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, background: "#1f2937", color: "#d1d5db", fontFamily: F }}>Age: {player.age}</span>}
          {player.agency && <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, background: "#1f2937", color: "#d1d5db", fontFamily: F }}>{player.agency}</span>}
          <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, background: "#1f2937", color: "#9ca3af", fontFamily: F }}>{evals.length} eval{evals.length !== 1 ? "s" : ""}</span>
        </div>
        {!showAddEval ? (
          <button onClick={() => setShowAddEval(true)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px dashed #374151", background: "rgba(59,130,246,0.04)", color: "#93c5fd", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: F, marginBottom: 20 }}>
            <MessageSquarePlus size={16} /> Add New Evaluation
          </button>
        ) : (
          <div style={{ background: "#0d1117", borderRadius: 10, padding: 16, marginBottom: 20, border: "1px solid #1e3a5f" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#93c5fd", margin: "0 0 12px", fontFamily: F }}>New Evaluation</p>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Evaluator *</label>
              <input style={inputStyle} value={evalForm.evaluator} onChange={e => setEvalForm({...evalForm, evaluator: e.target.value})} placeholder="Your name" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: "#6b7280", display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Scouting Notes *</label>
              <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={evalForm.notes} onChange={e => setEvalForm({...evalForm, notes: e.target.value})} placeholder="What did you see?" />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleAddEval} disabled={saving} style={{ padding: "8px 20px", borderRadius: 8, background: "#3b82f6", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: saving ? "wait" : "pointer", fontFamily: F, opacity: saving ? 0.6 : 1 }}>
                {saving ? "Saving..." : "Save Evaluation"}
              </button>
              <button onClick={() => { setShowAddEval(false); setEvalForm({ evaluator: "", notes: "" }); }} style={{ padding: "8px 16px", borderRadius: 8, background: "#1f2937", color: "#9ca3af", fontSize: 13, border: "1px solid #374151", cursor: "pointer", fontFamily: F }}>Cancel</button>
            </div>
          </div>
        )}
        <div>
          <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>
            <Clock size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />Evaluation History ({evals.length})
          </p>
          {evals.length === 0 && <p style={{ color: "#4b5563", fontSize: 13, fontFamily: F }}>No evaluations yet</p>}
          {evals.map((ev, i) => (
            <div key={i} style={{ padding: 14, borderRadius: 10, marginBottom: 8, background: i === 0 ? "rgba(59,130,246,0.06)" : "transparent", border: i === 0 ? "1px solid #1e3a5f" : "1px solid #1f2937" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? "#93c5fd" : "#d1d5db", fontFamily: F }}>{ev.evaluator}</span>
                <span style={{ fontSize: 11, color: "#6b7280", fontFamily: F }}>{ev.date}{i === 0 && evals.length > 1 ? " \u2014 Latest" : ""}</span>
              </div>
              <p style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: F }}>{ev.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgencyChart({ data, title, search, filters }) {
  const filtered = useMemo(() => {
    let d = [...data];
    if (search) { const s = search.toLowerCase(); d = d.filter(p => p.lastName.toLowerCase().includes(s) || p.firstName.toLowerCase().includes(s) || p.position.toLowerCase().includes(s) || p.location.toLowerCase().includes(s) || p.agency.toLowerCase().includes(s)); }
    if (filters.tier.length) d = d.filter(p => filters.tier.includes(p.tier));
    if (filters.class.length) d = d.filter(p => filters.class.includes(p.class));
    if (filters.position.length) d = d.filter(p => filters.position.includes(p.position));
    if (filters.location?.length) d = d.filter(p => filters.location.includes(p.location));
    return d;
  }, [data, search, filters]);
  const chartData = useMemo(() => {
    const counts = {};
    filtered.forEach(p => { if (p.agency) counts[p.agency] = (counts[p.agency] || 0) + 1; });
    let result = Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    if (filters.agency.length) result = result.filter(r => filters.agency.includes(r.name));
    return result.slice(0, 20);
  }, [filtered, filters.agency]);
  const activeDesc = useMemo(() => {
    const parts = [];
    if (filters.tier.length) parts.push("Tier " + filters.tier.join(", "));
    if (filters.class.length) parts.push("Class " + filters.class.join(", "));
    if (filters.position.length) parts.push(filters.position.join(", "));
    if (filters.location?.length) parts.push(filters.location.join(", "));
    if (filters.agency.length) parts.push(filters.agency.join(", "));
    if (search) parts.push('"' + search + '"');
    return parts.length > 0 ? " \u2014 Filtered: " + parts.join(" \u00B7 ") : "";
  }, [filters, search]);
  return (
    <div style={{ background: "#111827", borderRadius: 14, padding: 20, border: "1px solid #1f2937" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#f9fafb", margin: "0 0 4px", fontFamily: F }}><BarChart3 size={16} style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }} />{title} \u2014 Advisees by Agency{chartData.length < 20 ? "" : " (Top 20)"}</h3>
      {activeDesc && <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 14px", fontFamily: F }}>{activeDesc}</p>}
      {!activeDesc && <div style={{ height: 14 }} />}
      {chartData.length === 0 ? (<p style={{ textAlign: "center", color: "#6b7280", padding: 40, fontSize: 14, fontFamily: F }}>No data matches current filters</p>) : (
        <div style={{ height: Math.max(200, chartData.length * 28 + 20) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11, fontFamily: F }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fill: "#d1d5db", fontSize: 11, fontFamily: F }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8, fontFamily: F, fontSize: 13 }} labelStyle={{ color: "#f9fafb" }} itemStyle={{ color: "#93c5fd" }} cursor={{ fill: "rgba(59,130,246,0.08)" }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18}>{chartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function DataTable({ data, locationLabel, search, filters, sortConfig, onSort, onUpdatePlayer, onAddEval, tab }) {
  const [page, setPage] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const pageSize = 25;
  const filtered = useMemo(() => {
    let d = [...data];
    if (search) { const s = search.toLowerCase(); d = d.filter(p => p.lastName.toLowerCase().includes(s) || p.firstName.toLowerCase().includes(s) || p.position.toLowerCase().includes(s) || p.location.toLowerCase().includes(s) || p.agency.toLowerCase().includes(s) || (p.evaluations && p.evaluations.some(ev => ev.notes.toLowerCase().includes(s)))); }
    if (filters.tier.length) d = d.filter(p => filters.tier.includes(p.tier));
    if (filters.class.length) d = d.filter(p => filters.class.includes(p.class));
    if (filters.agency.length) d = d.filter(p => filters.agency.includes(p.agency));
    if (filters.position.length) d = d.filter(p => filters.position.includes(p.position));
    if (filters.location?.length) d = d.filter(p => filters.location.includes(p.location));
    if (sortConfig.key) {
      d.sort((a, b) => {
        let aVal = a[sortConfig.key] || ""; let bVal = b[sortConfig.key] || "";
        if (["tier","age","class"].includes(sortConfig.key)) { aVal = parseFloat(aVal) || 999; bVal = parseFloat(bVal) || 999; }
        else { aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase(); }
        if (aVal < bVal) return sortConfig.dir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.dir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return d;
  }, [data, search, filters, sortConfig]);
  useEffect(() => { if (selectedPlayer) { const u = data.find(p => p.id === selectedPlayer.id); if (u) setSelectedPlayer(u); } }, [data]);
  useEffect(() => setPage(0), [search, filters, sortConfig]);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const handleFieldUpdate = async (player, field, value) => {
    onUpdatePlayer(player.id, field, value);
    try {
      await postData({ action: "updateField", tab, row: player._row, field, value });
    } catch (err) { console.error("Sync error:", err); }
  };

  const SortHeader = ({ field, children, width }) => (
    <th onClick={() => onSort(field)} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: sortConfig.key === field ? "#93c5fd" : "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap", width: width || "auto", borderBottom: "1px solid #1f2937", fontFamily: F, position: "sticky", top: 0, background: "#0d1117", zIndex: 2 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{children}<ArrowUpDown size={12} style={{ opacity: sortConfig.key === field ? 1 : 0.3 }} /></span>
    </th>
  );
  const getLatestNote = (p) => p.evaluations?.length > 0 ? p.evaluations[0].notes : "";

  return (
    <>
      <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} locationLabel={locationLabel} onAddEval={onAddEval} tab={tab} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0, fontFamily: F }}>{filtered.length} player{filtered.length !== 1 ? "s" : ""}<span style={{ marginLeft: 8, fontSize: 11, color: "#4b5563" }}>Click any cell to edit \u00B7 Click <Eye size={11} style={{display:"inline",verticalAlign:"middle"}} /> for eval history</span></p>
        {totalPages > 1 && (<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button disabled={page === 0} onClick={() => setPage(p => p - 1)} style={{ background: "#1f2937", border: "none", color: page === 0 ? "#374151" : "#d1d5db", borderRadius: 6, padding: "4px 8px", cursor: page === 0 ? "default" : "pointer" }}><ChevronLeft size={16} /></button>
          <span style={{ fontSize: 13, color: "#9ca3af", fontFamily: F }}>{page + 1} / {totalPages}</span>
          <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} style={{ background: "#1f2937", border: "none", color: page >= totalPages - 1 ? "#374151" : "#d1d5db", borderRadius: 6, padding: "4px 8px", cursor: page >= totalPages - 1 ? "default" : "pointer" }}><ChevronRight size={16} /></button>
        </div>)}
      </div>
      <div style={{ borderRadius: 12, border: "1px solid #1f2937", overflow: "hidden" }}>
        <div style={{ overflowX: "auto", maxHeight: "calc(100vh - 340px)", overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 950 }}>
            <thead><tr>
              <SortHeader field="tier" width="70px">Tier</SortHeader>
              <SortHeader field="lastName" width="150px">Player</SortHeader>
              <SortHeader field="position" width="80px">Pos</SortHeader>
              <SortHeader field="class" width="70px">Class</SortHeader>
              <SortHeader field="age" width="60px">Age</SortHeader>
              <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #1f2937", fontFamily: F, position: "sticky", top: 0, background: "#0d1117", zIndex: 2, width: "60px" }}>B/T</th>
              <SortHeader field="agency" width="110px">Agency</SortHeader>
              <SortHeader field="location" width="120px">{locationLabel}</SortHeader>
              <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #1f2937", fontFamily: F, position: "sticky", top: 0, background: "#0d1117", zIndex: 2, width: "50px" }}>Evals</th>
              <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #1f2937", fontFamily: F, position: "sticky", top: 0, background: "#0d1117", zIndex: 2 }}>Latest Notes</th>
              <th style={{ padding: "10px 12px", width: 40, borderBottom: "1px solid #1f2937", position: "sticky", top: 0, background: "#0d1117", zIndex: 2 }}></th>
            </tr></thead>
            <tbody>
              {paged.map((p, i) => {
                const evalCount = p.evaluations ? p.evaluations.length : 0;
                return (
                  <tr key={p.id} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(59,130,246,0.06)"}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"}>
                    <td style={{ padding: "8px 12px" }}><TierBadge tier={p.tier} onChange={v => handleFieldUpdate(p, "tier", v)} /></td>
                    <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: F }}><EditableCell value={p.lastName + ", " + p.firstName} style={{ fontWeight: 600, color: "#f9fafb" }} onSave={v => { const parts = v.split(",").map(s => s.trim()); if (parts.length >= 2) { handleFieldUpdate(p, "lastName", parts[0]); handleFieldUpdate(p, "firstName", parts.slice(1).join(" ")); } }} inputWidth="130px" /></td>
                    <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: F }}><EditableCell value={p.position} style={{ color: "#d1d5db" }} onSave={v => handleFieldUpdate(p, "position", v)} inputWidth="60px" /></td>
                    <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: F }}><EditableCell value={p.class} style={{ color: "#d1d5db" }} onSave={v => handleFieldUpdate(p, "class", v)} inputWidth="50px" /></td>
                    <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: F }}><EditableCell value={p.age} style={{ color: "#9ca3af" }} onSave={v => handleFieldUpdate(p, "age", v)} inputWidth="45px" /></td>
                    <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: F }}><EditableCell value={p.handedness} style={{ color: "#9ca3af" }} onSave={v => handleFieldUpdate(p, "handedness", v)} inputWidth="45px" /></td>
                    <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: F }}><EditableCell value={p.agency} style={{ color: "#93c5fd" }} onSave={v => handleFieldUpdate(p, "agency", v)} inputWidth="90px" /></td>
                    <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: F }}><EditableCell value={p.location} style={{ color: "#d1d5db" }} onSave={v => handleFieldUpdate(p, "location", v)} inputWidth="100px" /></td>
                    <td style={{ padding: "8px 12px", textAlign: "center" }}><span style={{ fontSize: 12, fontWeight: 600, color: evalCount > 1 ? "#93c5fd" : "#6b7280", fontFamily: F }}>{evalCount}</span></td>
                    <td style={{ padding: "8px 12px", fontSize: 12, fontFamily: F, color: "#9ca3af", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{getLatestNote(p)}</td>
                    <td style={{ padding: "8px 12px" }}><button onClick={() => setSelectedPlayer(p)} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", padding: 4 }} title="View eval history"><Eye size={15} /></button></td>
                  </tr>
                );
              })}
              {paged.length === 0 && <tr><td colSpan={11} style={{ padding: 40, textAlign: "center", color: "#6b7280", fontSize: 14, fontFamily: F }}>No players match your filters</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function AddPlayerModal({ onClose, onAdd, locationLabel, tab }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", position: "", class: "", tier: "3", age: "", handedness: "", agency: "", location: "", agentEval: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName) return;
    setSaving(true);
    try {
      await postData({ action: "addPlayer", tab, player: form });
      onAdd(form);
      onClose();
    } catch (err) { alert("Failed to add player: " + err.message); }
    setSaving(false);
  };
  const inputStyle = { width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #374151", background: "#0d1117", color: "#f9fafb", fontSize: 13, fontFamily: F, outline: "none", boxSizing: "border-box" };
  const labelStyle = { fontSize: 11, color: "#6b7280", marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: 1, fontFamily: F };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#111827", borderRadius: 16, padding: 28, maxWidth: 520, width: "100%", border: "1px solid #1f2937", boxShadow: "0 25px 60px rgba(0,0,0,0.5)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#f9fafb", margin: 0, fontFamily: F }}>Add New Player</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer" }}><X size={20} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label style={labelStyle}>First Name *</label><input style={inputStyle} value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} /></div>
          <div><label style={labelStyle}>Last Name *</label><input style={inputStyle} value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} /></div>
          <div><label style={labelStyle}>Position</label><input style={inputStyle} value={form.position} onChange={e => setForm({...form, position: e.target.value})} /></div>
          <div><label style={labelStyle}>Class</label><input style={inputStyle} value={form.class} onChange={e => setForm({...form, class: e.target.value})} placeholder="2027" /></div>
          <div><label style={labelStyle}>Tier</label><select style={{...inputStyle, cursor: "pointer"}} value={form.tier} onChange={e => setForm({...form, tier: e.target.value})}><option value="1">Tier 1</option><option value="2">Tier 2</option><option value="3">Tier 3</option><option value="4">Tier 4</option></select></div>
          <div><label style={labelStyle}>Age</label><input style={inputStyle} value={form.age} onChange={e => setForm({...form, age: e.target.value})} /></div>
          <div><label style={labelStyle}>B/T</label><input style={inputStyle} value={form.handedness} onChange={e => setForm({...form, handedness: e.target.value})} placeholder="R/R" /></div>
          <div><label style={labelStyle}>Agency</label><input style={inputStyle} value={form.agency} onChange={e => setForm({...form, agency: e.target.value})} /></div>
          <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>{locationLabel}</label><input style={inputStyle} value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
          <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Evaluator</label><input style={inputStyle} value={form.agentEval} onChange={e => setForm({...form, agentEval: e.target.value})} /></div>
          <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Initial Scouting Notes</label><textarea style={{...inputStyle, minHeight: 80, resize: "vertical"}} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>
        </div>
        <button onClick={handleSubmit} disabled={saving} style={{ marginTop: 16, width: "100%", padding: "10px 0", borderRadius: 8, background: "#3b82f6", color: "#fff", fontSize: 14, fontWeight: 600, border: "none", cursor: saving ? "wait" : "pointer", fontFamily: F, opacity: saving ? 0.6 : 1 }}>{saving ? "Saving..." : "Add Player"}</button>
      </div>
    </div>
  );
}

const APP_PASSWORD = "ESM2026";

function LoginScreen({ onAuth }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const handleSubmit = () => {
    if (pw === APP_PASSWORD) { onAuth(); }
    else { setErr(true); setPw(""); }
  };
  return (
    <div style={{ minHeight: "100vh", background: "#0a0e17", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: F, color: "#f9fafb" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <img src={LOGO_SRC} alt="Excel Sports" style={{ height: 50, marginBottom: 24 }} />
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, letterSpacing: "0.04em" }}>Excel Baseball Player Evaluation Database</p>
      <div style={{ background: "#111827", borderRadius: 14, padding: 28, width: 340, border: "1px solid #1f2937" }}>
        <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, textAlign: "center" }}>Enter Password</p>
        <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
          placeholder="Password"
          style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: err ? "1px solid #ef4444" : "1px solid #374151", background: "#0d1117", color: "#f9fafb", fontSize: 14, fontFamily: F, outline: "none", boxSizing: "border-box", marginBottom: 12 }}
          autoFocus
        />
        {err && <p style={{ color: "#ef4444", fontSize: 12, marginBottom: 10, textAlign: "center" }}>Incorrect password. Try again.</p>}
        <button onClick={handleSubmit} style={{ width: "100%", padding: "10px 0", borderRadius: 8, background: "#3b82f6", color: "#fff", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", fontFamily: F }}>Access Database</button>
      </div>
    </div>
  );
}

function ScoutDB() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("college");
  const [search, setSearch] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [collegeData, setCollegeData] = useState([]);
  const [hsData, setHsData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "tier", dir: "asc" });
  const emptyFilters = { tier: [], class: [], agency: [], position: [], location: [] };
  const [collegeFilters, setCollegeFilters] = useState(emptyFilters);
  const [hsFilters, setHsFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);

  if (!authed) return <LoginScreen onAuth={() => setAuthed(true)} />;

  const data = tab === "college" ? collegeData : hsData;
  const setData = tab === "college" ? setCollegeData : setHsData;
  const filters = tab === "college" ? collegeFilters : hsFilters;
  const setFilters = tab === "college" ? setCollegeFilters : setHsFilters;
  const locationLabel = tab === "college" ? "School" : "Area";

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData();
      setCollegeData(result.college || []);
      setHsData(result.hs || []);
      setLastSync(new Date());
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filterOptions = useMemo(() => ({
    tiers: getUnique(data, "tier"), classes: getUnique(data, "class"),
    agencies: getUnique(data, "agency"), positions: getUnique(data, "position"),
    locations: getUnique(data, "location"),
  }), [data]);
  const activeFilterCount = Object.values(filters).reduce((s, a) => s + a.length, 0);
  const handleSort = (key) => setSortConfig(prev => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });

  const handleAddPlayer = (player) => {
    // Optimistic update — refresh from sheet to get the real row ID
    loadData();
  };

  const handleUpdatePlayer = (id, field, value) => {
    setCollegeData(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
    setHsData(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleAddEval = useCallback((playerId, evalEntry) => {
    setCollegeData(prev => prev.map(p => p.id === playerId ? { ...p, evaluations: [evalEntry, ...(p.evaluations || [])] } : p));
    setHsData(prev => prev.map(p => p.id === playerId ? { ...p, evaluations: [evalEntry, ...(p.evaluations || [])] } : p));
  }, []);

  const tierCounts = useMemo(() => {
    const counts = { "1": 0, "2": 0, "3": 0, "4": 0 };
    data.forEach(p => { if (counts[p.tier] !== undefined) counts[p.tier]++; });
    return counts;
  }, [data]);

  // Loading / Error states
  if (loading && collegeData.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0e17", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: F, color: "#f9fafb" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <img src={LOGO_SRC} alt="Excel Sports" style={{ height: 50, marginBottom: 20 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#93c5fd" }}>
          <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} />
          <span style={{ fontSize: 15 }}>Loading player database...</span>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error && collegeData.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0e17", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: F, color: "#f9fafb", padding: 40 }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <WifiOff size={40} style={{ color: "#ef4444", marginBottom: 16 }} />
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Connection Error</h2>
        <p style={{ color: "#9ca3af", fontSize: 14, textAlign: "center", maxWidth: 400, marginBottom: 20 }}>{error}</p>
        <button onClick={loadData} style={{ padding: "10px 24px", borderRadius: 8, background: "#3b82f6", color: "#fff", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", fontFamily: F }}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e17", fontFamily: F, color: "#f9fafb" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ padding: "20px 24px 0", borderBottom: "1px solid #1f2937", background: "linear-gradient(180deg, #0d1117 0%, #0a0e17 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src={LOGO_SRC} alt="Excel Sports" style={{ height: 40 }} />
            <div><p style={{ fontSize: 12, color: "#9ca3af", margin: 0, fontFamily: F, letterSpacing: "0.04em" }}>Excel Baseball Player Evaluation Database</p></div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={loadData} disabled={loading} title={lastSync ? "Last synced: " + lastSync.toLocaleTimeString() : "Refresh"} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 8, fontSize: 12, background: "#1f2937", color: loading ? "#374151" : "#9ca3af", border: "1px solid #374151", cursor: loading ? "wait" : "pointer", fontFamily: F }}>
              <RefreshCw size={14} style={loading ? { animation: "spin 1s linear infinite" } : {}} /> Sync
            </button>
            <button onClick={() => setShowChart(!showChart)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: showChart ? "rgba(59,130,246,0.15)" : "#1f2937", color: showChart ? "#93c5fd" : "#d1d5db", border: showChart ? "1px solid #3b82f6" : "1px solid #374151", cursor: "pointer", fontFamily: F }}>
              <BarChart3 size={15} /> Agency Intel
            </button>
            <button onClick={() => setShowAddModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer", fontFamily: F }}>
              <Plus size={15} /> Add Player
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 0 }}>
          {[{ key: "college", label: "College", count: collegeData.length }, { key: "hs", label: "High School", count: hsData.length }].map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setSearch(""); setSortConfig({ key: "tier", dir: "asc" }); }} style={{ padding: "10px 20px", fontSize: 14, fontWeight: 600, background: "none", border: "none", color: tab === t.key ? "#f9fafb" : "#6b7280", borderBottom: tab === t.key ? "2px solid #3b82f6" : "2px solid transparent", cursor: "pointer", fontFamily: F, transition: "all 0.15s" }}>{t.label} <span style={{ fontSize: 12, opacity: 0.6, marginLeft: 4 }}>({t.count})</span></button>
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 24px 24px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          {["1","2","3","4"].map(t => { const tc = TIER_COLORS[t]; return (<div key={t} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 10, background: tc.bg, border: `1px solid ${tc.badge}22` }}><span style={{ fontSize: 12, color: tc.text, fontWeight: 600 }}>{tc.label}</span><span style={{ fontSize: 16, fontWeight: 700, color: tc.badge }}>{tierCounts[t]}</span></div>); })}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 320 }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search players, schools, agencies, notes..." style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 8, border: "1px solid #374151", background: "#111827", color: "#f9fafb", fontSize: 13, outline: "none", fontFamily: F, boxSizing: "border-box" }} />
          </div>
          <Dropdown label="Tier" options={filterOptions.tiers} selected={filters.tier} onChange={v => setFilters({...filters, tier: v})} />
          <Dropdown label="Class" options={filterOptions.classes} selected={filters.class} onChange={v => setFilters({...filters, class: v})} />
          <Dropdown label="Position" options={filterOptions.positions} selected={filters.position} onChange={v => setFilters({...filters, position: v})} />
          <Dropdown label="Agency" options={filterOptions.agencies} selected={filters.agency} onChange={v => setFilters({...filters, agency: v})} />
          <Dropdown label={locationLabel} options={filterOptions.locations} selected={filters.location} onChange={v => setFilters({...filters, location: v})} />
          {activeFilterCount > 0 && <button onClick={() => setFilters(emptyFilters)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "7px 12px", borderRadius: 8, fontSize: 12, background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer", fontFamily: F }}><X size={13} /> Clear ({activeFilterCount})</button>}
        </div>
        {showChart && <div style={{ marginBottom: 20 }}><AgencyChart data={data} title={tab === "college" ? "College" : "High School"} search={search} filters={filters} /></div>}
        <DataTable data={data} locationLabel={locationLabel} search={search} filters={filters} sortConfig={sortConfig} onSort={handleSort} onUpdatePlayer={handleUpdatePlayer} onAddEval={handleAddEval} tab={tab} />
      </div>
      {showAddModal && <AddPlayerModal onClose={() => setShowAddModal(false)} onAdd={handleAddPlayer} locationLabel={locationLabel} tab={tab} />}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
