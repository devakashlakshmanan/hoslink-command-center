import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertTriangle, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/ai-commander")({
  head: () => ({ meta: [{ title: "AI Incident Commander — UrHealth AI" }] }),
  component: () => <AppShell><AICommander /></AppShell>,
});

const forecast = Array.from({ length: 12 }, (_, i) => ({
  t: `+${i * 15}m`,
  low: 40 + i * 3,
  expected: 55 + i * 5 + Math.sin(i) * 4,
  high: 70 + i * 7,
}));

function AICommander() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Neural Ops</div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" /> AI Incident Commander
          </h1>
        </div>
        <Badge variant="outline" className="glass"><Sparkles className="mr-1 h-3 w-3 text-primary" /> Nemotron · v3 · 3.1s cycle</Badge>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Current Situation */}
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-5">
          <SectionTitle title="Current Situation" />
          <p className="mt-2 text-sm leading-relaxed">
            <span className="font-semibold">MCI-2410-018</span> · NH-48 multi-vehicle pileup at Km 23, Gurugram district.
            Estimated <span className="text-emergency font-semibold">107 casualties</span> across four triage bands.
            Weather stable; NH-48 congested; ambulance corridor operating +9 min above baseline.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <StatBox label="Casualties" v="107" />
            <StatBox label="Hospitals engaged" v="6" />
            <StatBox label="Elapsed" v="00:42:11" />
          </div>
        </div>

        {/* AI Analysis */}
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-7">
          <SectionTitle title="AI Analysis" />
          <div className="mt-2 space-y-2 text-sm">
            <Insight tone="info" text="Casualty inflow will peak around T+45m at ~62/hr. LNJP ICU projected to saturate in 42 minutes." />
            <Insight tone="warning" text="O- blood supply in Gurugram cluster inadequate for 8 anticipated massive transfusions." />
            <Insight tone="success" text="AIIMS + Max combined capacity absorbs 100% of Red-triage load if diverted from LNJP within 15 min." />
          </div>
        </div>

        {/* Predicted casualties chart */}
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-7">
          <SectionTitle title="Predicted Casualties (next 3h)" />
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={forecast}>
                <defs>
                  <linearGradient id="band" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="high" stroke="var(--color-emergency)" fill="url(#band)" />
                <Area type="monotone" dataKey="expected" stroke="var(--color-primary)" fill="url(#band)" />
                <Area type="monotone" dataKey="low" stroke="var(--color-success)" fill="url(#band)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expected overload */}
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-5">
          <SectionTitle title="Expected Overload (T+60m)" />
          <div className="mt-2 space-y-2">
            {[
              { h: "LNJP Hospital", v: 118, r: "Red" },
              { h: "Apollo Hospital", v: 96, r: "Red" },
              { h: "Safdarjung", v: 82, r: "Amber" },
              { h: "AIIMS", v: 61, r: "Green" },
              { h: "Max Super", v: 54, r: "Green" },
            ].map((x) => (
              <div key={x.h}>
                <div className="flex items-center justify-between text-xs">
                  <span>{x.h}</span>
                  <span className={x.v > 100 ? "text-emergency" : x.v > 80 ? "text-warning" : "text-success"}>{x.v}% util</span>
                </div>
                <Progress value={Math.min(x.v, 120)} className="h-2 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass col-span-12 rounded-2xl p-4">
          <SectionTitle title="Hospital & Resource Recommendations" />
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {[
              { t: "Divert Red-triage inflow LNJP → AIIMS", why: "AIIMS has 38 ICU beds and 41 ventilators available. Redirecting avoids projected 12-bed shortfall at LNJP.",
                impact: "Saves ~4 lives · reduces avg door-to-OT by 18 min", c: 94 },
              { t: "Trigger O- inter-district transfer", why: "IGH Faridabad has 62 units surplus O-. Ground transfer ETA 28 min via green corridor.",
                impact: "Blood shortfall eliminated for next 4h", c: 91 },
              { t: "Stand up 2 mobile OT units at scene",  why: "Reduces load on Apollo & LNJP OT queues; extraction times for entrapped victims exceed 20 min.",
                impact: "3 field surgeries · 22 min OT-time reclaimed", c: 84 },
              { t: "Activate Family Reunification Center",  why: "Predicted 400+ family enquiries within 90 min based on historical NH-48 incidents.",
                impact: "SLA maintained · staff pre-positioned", c: 88 },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-border/60 bg-background/40 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-medium text-sm">{r.t}</div>
                  <Badge variant="outline">{r.c}%</Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground"><span className="text-foreground/80 font-medium">Why:</span> {r.why}</div>
                <div className="mt-1 text-xs text-success"><TrendingUp className="mr-1 inline h-3 w-3" /> {r.impact}</div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="gradient-medical border-0 text-primary-foreground"><CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Execute</Button>
                  <Button size="sm" variant="ghost"><Clock className="mr-1 h-3.5 w-3.5" /> Defer 5m</Button>
                  <Button size="sm" variant="outline">Explain in detail</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transfer suggestions */}
        <div className="glass col-span-12 rounded-2xl p-4">
          <SectionTitle title="Inter-Hospital Transfer Suggestions" />
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                <tr><th className="py-2">Patient</th><th>From</th><th>To</th><th>Reason</th><th>ETA</th><th>Confidence</th><th></th></tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {[
                  { p: "HL-8842-A1", f: "LNJP", to: "AIIMS", r: "Chest trauma · needs cardiothoracic team", eta: "12m", c: 96 },
                  { p: "HL-8842-A3", f: "Apollo", to: "Safdarjung", r: "Burns unit availability", eta: "16m", c: 89 },
                  { p: "HL-8842-A7", f: "LNJP", to: "AIIMS", r: "Neurotrauma · GCS 9", eta: "10m", c: 93 },
                ].map((r) => (
                  <tr key={r.p} className="hover:bg-accent/40">
                    <td className="py-2 font-mono text-xs">{r.p}</td>
                    <td>{r.f}</td>
                    <td className="text-primary font-medium flex items-center gap-1">{r.to} <ArrowRight className="h-3 w-3" /></td>
                    <td className="text-xs text-muted-foreground">{r.r}</td>
                    <td className="font-mono text-xs">{r.eta}</td>
                    <td><Badge variant="outline">{r.c}%</Badge></td>
                    <td><Button size="sm" variant="ghost">Approve</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm font-semibold">{title}</div>
      <Sparkles className="h-3.5 w-3.5 text-primary" />
    </div>
  );
}
function StatBox({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-lg border border-border/50 bg-background/30 p-2">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-lg font-bold">{v}</div>
    </div>
  );
}
function Insight({ tone, text }: { tone: "info" | "warning" | "success"; text: string }) {
  const map = { info: "border-info/40 bg-info/10", warning: "border-warning/40 bg-warning/10", success: "border-success/40 bg-success/10" };
  const Icon = tone === "warning" ? AlertTriangle : tone === "success" ? CheckCircle2 : Sparkles;
  return (
    <div className={`flex items-start gap-2 rounded-lg border p-2.5 ${map[tone]}`}>
      <Icon className={`h-4 w-4 mt-0.5 ${tone === "warning" ? "text-warning" : tone === "success" ? "text-success" : "text-info"}`} />
      <div>{text}</div>
    </div>
  );
}
