import { motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { hospitals, incidents, patients, ambulances, alerts, kpi } from "@/lib/mock-data";
import {
  Activity, AlertTriangle, Ambulance as AmbulanceIcon, Brain, Cloud, Droplet, Hospital, HeartPulse,
  Radio, Thermometer, TrafficCone, Users, Wind, Zap, ArrowRight,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/command")({
  head: () => ({ meta: [{ title: "Command Center — UrHealth AI" }] }),
  component: () => <AppShell><CommandCenter /></AppShell>,
});

const inflowSeries = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}:00`,
  red: Math.max(0, Math.round(6 + Math.sin(i / 2) * 4 + Math.random() * 3)),
  yellow: Math.max(0, Math.round(14 + Math.cos(i / 3) * 6 + Math.random() * 4)),
  green: Math.max(0, Math.round(22 + Math.sin(i / 4) * 8 + Math.random() * 5)),
}));

function CommandCenter() {
  const active = incidents.filter((i) => i.status === "Active");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Mission Control</div>
          <h1 className="text-2xl font-bold">Command Center</h1>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Badge variant="outline" className="glass"><Radio className="mr-1 h-3 w-3 text-success animate-pulse" /> Live · 1.2s</Badge>
          <Badge variant="outline" className="glass border-emergency/40 text-emergency">
            <AlertTriangle className="mr-1 h-3 w-3" /> {active.length} Active Incidents
          </Badge>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        {[
          { l: "Hospitals", v: kpi.hospitalsConnected, i: <Hospital className="h-4 w-4" /> },
          { l: "Patients Coordinated", v: kpi.patientsCoordinated, i: <Users className="h-4 w-4" /> },
          { l: "Ambulances", v: kpi.ambulances, i: <AmbulanceIcon className="h-4 w-4" /> },
          { l: "AI Decisions", v: kpi.aiDecisions, i: <Brain className="h-4 w-4" /> },
          { l: "Bed Availability", v: 1842, i: <Activity className="h-4 w-4" /> },
          { l: "Blood Units", v: 3660, i: <Droplet className="h-4 w-4" /> },
        ].map((k, i) => (
          <motion.div key={k.l} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="text-primary">{k.i}</span> {k.l}
            </div>
            <div className="mt-1 text-xl font-bold">{k.v.toLocaleString("en-IN")}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* MAP */}
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-8">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Live Incident Map</div>
              <div className="text-xs text-muted-foreground">Delhi-NCR · zoom 11</div>
            </div>
            <div className="flex gap-1 text-[10px]">
              <Legend color="bg-triage-red" label="Red" />
              <Legend color="bg-triage-yellow" label="Yellow" />
              <Legend color="bg-triage-green" label="Green" />
              <Legend color="bg-triage-black" label="Deceased" />
            </div>
          </div>
          <IncidentMap />
        </div>

        {/* AI Recommendations */}
        <div className="glass col-span-12 flex flex-col rounded-2xl p-4 lg:col-span-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-medical grid place-items-center">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold">AI Incident Commander</div>
                <div className="text-[10px] text-muted-foreground">Confidence-weighted recommendations</div>
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              { t: "Divert 8 Red-triage from LNJP → AIIMS", w: "ICU saturation avoided in 42 min", c: 94, tone: "emergency" as const },
              { t: "Cross-transfer 24 units O- : AIIMS → LNJP", w: "Blood shortage neutralized", c: 91, tone: "medical" as const },
              { t: "Dispatch 4 ALS ambulances to MCI-017", w: "Reduces median scene-time by 3.4 min", c: 88, tone: "medical" as const },
              { t: "Activate MoU with Manesar plants for O₂", w: "600L LMO reserve unlocked", c: 82, tone: "medical" as const },
            ].map((r, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-background/40 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-medium">{r.t}</div>
                  <Badge variant="outline" className="shrink-0">{r.c}%</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Why: {r.w}</div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" className={`h-7 ${r.tone === "emergency" ? "gradient-emergency" : "gradient-medical"} border-0 text-primary-foreground`}>Execute</Button>
                  <Button size="sm" variant="ghost" className="h-7">Explain</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-4">
          <div className="mb-3 text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-emergency" /> Critical Alerts
          </div>
          <div className="space-y-2">
            {alerts.slice(0, 5).map((a) => (
              <div key={a.id} className="rounded-lg border border-border/50 bg-background/30 p-2.5">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant={a.priority === "Critical" ? "destructive" : a.priority === "Warning" ? "outline" : "secondary"}
                    className={a.priority === "Warning" ? "border-warning/50 text-warning" : ""}>
                    {a.priority}
                  </Badge>
                  <span className="text-muted-foreground">{a.time}</span>
                </div>
                <div className="mt-1 text-sm font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital cards */}
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-8">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">Hospital Readiness (Live)</div>
            <a href="/hospitals" className="text-xs text-primary hover:underline">View network <ArrowRight className="inline h-3 w-3" /></a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {hospitals.slice(0, 6).map((h) => (
              <div key={h.id} className="rounded-xl border border-border/60 bg-background/40 p-3">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{h.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{h.type} · {h.distanceKm}km · {h.etaMin}m</div>
                  </div>
                  <StatusPill status={h.status} />
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1 text-center text-[10px]">
                  <ResChip label="Gen" v={h.general.available} t={h.general.total} />
                  <ResChip label="ICU" v={h.icu.available} t={h.icu.total} />
                  <ResChip label="Vent" v={h.ventilators.available} t={h.ventilators.total} />
                  <ResChip label="Blood" v={h.bloodUnits} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="h-8 w-24">
                    <ResponsiveContainer><LineChart data={h.trend.map((y, i) => ({ i, y }))}>
                      <Line type="monotone" dataKey="y" stroke="var(--color-primary)" strokeWidth={1.5} dot={false} />
                    </LineChart></ResponsiveContainer>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground">Readiness</div>
                    <div className={`text-sm font-bold ${h.readiness > 75 ? "text-success" : h.readiness > 50 ? "text-warning" : "text-emergency"}`}>{h.readiness}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inflow chart */}
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-8">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">24h Casualty Inflow — Delhi NCR</div>
            <div className="text-[10px] text-muted-foreground">Aggregated across 46 hospitals</div>
          </div>
          <div className="h-52">
            <ResponsiveContainer>
              <AreaChart data={inflowSeries}>
                <defs>
                  <linearGradient id="gR" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-triage-red)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--color-triage-red)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="gY" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-triage-yellow)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--color-triage-yellow)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="gG" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-triage-green)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--color-triage-green)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="green" stackId="1" stroke="var(--color-triage-green)" fill="url(#gG)" />
                <Area type="monotone" dataKey="yellow" stackId="1" stroke="var(--color-triage-yellow)" fill="url(#gY)" />
                <Area type="monotone" dataKey="red" stackId="1" stroke="var(--color-triage-red)" fill="url(#gR)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Environment */}
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-4">
          <div className="mb-3 text-sm font-semibold">Situational Awareness</div>
          <div className="space-y-3">
            <EnvRow icon={<Thermometer className="h-4 w-4 text-warning" />} label="Weather" value="32°C · Haze" sub="Visibility 3.2 km · risk to airlift" />
            <EnvRow icon={<Wind className="h-4 w-4 text-info" />} label="Wind" value="SW 14 km/h" sub="Plume drift favorable for eastern zones" />
            <EnvRow icon={<TrafficCone className="h-4 w-4 text-emergency" />} label="Traffic" value="NH-48 heavy" sub="Median ETA +9 min for ambulance corridor" />
            <EnvRow icon={<Cloud className="h-4 w-4 text-muted-foreground" />} label="AQI" value="284 Poor" sub="Mask advisory active" />
          </div>
          <div className="mt-4 rounded-xl border border-border/60 bg-background/40 p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium"><HeartPulse className="h-3.5 w-3.5 text-emergency" /> Emergency Readiness</span>
              <span className="text-success">86 / 100</span>
            </div>
            <Progress value={86} className="h-2" />
            <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[10px]">
              <ReadinessMini label="Beds" v={78} />
              <ReadinessMini label="Blood" v={92} />
              <ReadinessMini label="Fleet" v={84} />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass col-span-12 rounded-2xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">Incident Timeline · MCI-2410-018</div>
            <Badge variant="outline" className="glass"><Zap className="mr-1 h-3 w-3 text-primary" /> Auto-log</Badge>
          </div>
          <ol className="relative space-y-3 pl-6">
            <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
            {[
              { t: "09:14", e: "MCI declared — NH-48 pileup, Km 23", who: "State EOC · Delhi" },
              { t: "09:15", e: "AI triage estimator: ~107 casualties (12R / 34Y / 58G / 3B)", who: "AI Commander" },
              { t: "09:17", e: "12 ALS ambulances dispatched from CATS Sector 4/22/9", who: "Dispatch" },
              { t: "09:22", e: "AIIMS, Safdarjung, RML placed on standby (Level 2)", who: "AI Commander" },
              { t: "09:31", e: "First Red patient (HL-8842-A1) enroute to AIIMS", who: "Ambulance DL-01-EA-2201" },
              { t: "09:44", e: "Cross-transfer authorized: 24 units O- from AIIMS to LNJP", who: "AI + Human confirm" },
            ].map((s, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-4 top-1.5 h-2.5 w-2.5 rounded-full gradient-medical" />
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{s.t}</span>
                  <span className="text-sm">{s.e}</span>
                  <span className="text-[10px] text-muted-foreground">· {s.who}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return <div className="flex items-center gap-1 rounded px-1.5 py-0.5 border border-border/60"><span className={`h-1.5 w-1.5 rounded-full ${color}`} /> {label}</div>;
}
function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Ready: "bg-success/15 text-success border-success/30",
    Strained: "bg-warning/15 text-warning border-warning/30",
    Critical: "bg-emergency/15 text-emergency border-emergency/30",
    Overloaded: "bg-destructive/15 text-destructive border-destructive/40",
  };
  return <span className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${map[status] || ""}`}>{status}</span>;
}
function ResChip({ label, v, t }: { label: string; v: number; t?: number }) {
  return (
    <div className="rounded border border-border/50 p-1">
      <div className="text-muted-foreground">{label}</div>
      <div className="font-mono text-xs">{v}{t !== undefined ? <span className="text-muted-foreground">/{t}</span> : ""}</div>
    </div>
  );
}
function EnvRow({ icon, label, value, sub }: any) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-border/50 bg-background/30 p-2.5">
      <div className="mt-0.5">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="text-sm font-semibold">{value}</span>
        </div>
        <div className="text-[10px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
function ReadinessMini({ label, v }: { label: string; v: number }) {
  return (
    <div className="rounded border border-border/50 p-1.5">
      <div className="text-muted-foreground">{label}</div>
      <div className="font-bold text-sm">{v}</div>
    </div>
  );
}

function IncidentMap() {
  // stylized SVG city map with incident pins
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border/60 bg-background/40">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <svg viewBox="0 0 800 450" className="absolute inset-0 h-full w-full">
        {/* rivers/roads */}
        <path d="M0 220 Q 200 180 400 250 T 800 220" stroke="oklch(0.7 0.16 240 / 0.35)" strokeWidth="18" fill="none" />
        <path d="M120 0 L 260 450" stroke="oklch(0.6 0.03 250 / 0.4)" strokeWidth="6" fill="none" />
        <path d="M700 0 L 540 450" stroke="oklch(0.6 0.03 250 / 0.4)" strokeWidth="6" fill="none" />
        <path d="M0 90 L 800 130" stroke="oklch(0.6 0.03 250 / 0.4)" strokeWidth="4" fill="none" />
        <path d="M0 360 L 800 340" stroke="oklch(0.6 0.03 250 / 0.4)" strokeWidth="4" fill="none" />

        {/* hospitals */}
        {[
          { x: 260, y: 130, s: "Ready" },
          { x: 380, y: 200, s: "Strained" },
          { x: 500, y: 160, s: "Ready" },
          { x: 600, y: 250, s: "Critical" },
          { x: 220, y: 320, s: "Ready" },
          { x: 460, y: 340, s: "Overloaded" },
        ].map((h, i) => {
          const color = h.s === "Ready" ? "oklch(0.65 0.17 155)" : h.s === "Strained" ? "oklch(0.78 0.17 85)" : h.s === "Critical" ? "oklch(0.6 0.24 25)" : "oklch(0.58 0.24 27)";
          return (
            <g key={i} transform={`translate(${h.x},${h.y})`}>
              <circle r="10" fill={color} opacity="0.2" />
              <circle r="5" fill={color} />
            </g>
          );
        })}

        {/* incidents (pulsing) */}
        {[
          { x: 340, y: 250, label: "MCI-018" },
          { x: 580, y: 380, label: "MCI-017" },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x},${p.y})`}>
            <circle r="22" fill="oklch(0.6 0.24 25 / 0.15)">
              <animate attributeName="r" values="14;34;14" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle r="7" fill="oklch(0.6 0.24 25)" />
            <text y="-12" textAnchor="middle" fontSize="10" fill="oklch(0.9 0.05 240)" fontFamily="JetBrains Mono">{p.label}</text>
          </g>
        ))}

        {/* ambulance routes */}
        {[
          { d: "M 340 250 Q 300 200 260 130" },
          { d: "M 340 250 Q 360 220 380 200" },
          { d: "M 580 380 Q 540 300 500 160" },
          { d: "M 580 380 Q 520 360 460 340" },
        ].map((r, i) => (
          <path key={i} d={r.d} stroke="oklch(0.7 0.16 240)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="dash-move" />
        ))}
      </svg>
      <div className="absolute bottom-2 right-2 glass rounded-md px-2 py-1 text-[10px] font-mono">28.61°N · 77.20°E</div>
    </div>
  );
}
