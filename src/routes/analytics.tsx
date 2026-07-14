import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — UrHealth AI" }] }),
  component: () => <AppShell><Analytics /></AppShell>,
});

const perf = ["AIIMS","Safdarjung","RML","Apollo","Max","LNJP"].map((h, i) => ({ h, response: 6 + i, util: 65 + i * 5 }));
const flow = Array.from({ length: 24 }, (_, i) => ({ t: `${i}:00`, inflow: 20 + Math.round(Math.sin(i / 3) * 15 + i), outflow: 15 + Math.round(Math.cos(i / 2) * 12 + i * 0.8) }));
const util = [
  { name: "General", v: 68 }, { name: "ICU", v: 84 }, { name: "HDU", v: 72 }, { name: "Vent", v: 79 }, { name: "OT", v: 61 },
];
const pie = [
  { name: "Correct", value: 92 }, { name: "Adjusted", value: 6 }, { name: "Overridden", value: 2 },
];
const pieColors = ["var(--color-success)","var(--color-warning)","var(--color-emergency)"];

function Analytics() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Insights</div>
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card title="Incident Heatmap · Delhi-NCR" span="lg:col-span-8">
          <div className="relative aspect-[16/6] w-full overflow-hidden rounded-xl border border-border/60 bg-background/40">
            <div className="absolute inset-0 grid-bg opacity-60" />
            <svg viewBox="0 0 800 300" className="absolute inset-0 h-full w-full">
              {Array.from({ length: 40 }).map((_, i) => {
                const x = 40 + (i % 10) * 78;
                const y = 30 + Math.floor(i / 10) * 60;
                const intensity = (Math.sin(i) + 1) / 2;
                return <circle key={i} cx={x} cy={y} r={10 + intensity * 30} fill={`oklch(0.6 0.24 25 / ${intensity * 0.45})`} />;
              })}
            </svg>
          </div>
        </Card>

        <Card title="AI Decision Accuracy" span="lg:col-span-4">
          <div className="h-52">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pie} dataKey="value" innerRadius={40} outerRadius={70} paddingAngle={3}>
                  {pie.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Hospital Performance · Avg Response (min)" span="lg:col-span-6">
          <div className="h-52">
            <ResponsiveContainer>
              <BarChart data={perf}>
                <XAxis dataKey="h" tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="response" fill="var(--color-primary)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Patient Flow · 24h" span="lg:col-span-6">
          <div className="h-52">
            <ResponsiveContainer>
              <LineChart data={flow}>
                <XAxis dataKey="t" tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Line dataKey="inflow" stroke="var(--color-emergency)" strokeWidth={2} dot={false} />
                <Line dataKey="outflow" stroke="var(--color-success)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Resource Utilization %" span="lg:col-span-6">
          <div className="space-y-2">
            {util.map((u) => (
              <div key={u.name}>
                <div className="flex justify-between text-xs"><span>{u.name}</span><span>{u.v}%</span></div>
                <div className="h-2 overflow-hidden rounded bg-muted"><div className="h-full gradient-medical" style={{ width: `${u.v}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="District Readiness Leaderboard" span="lg:col-span-6">
          <div className="space-y-2">
            {[
              ["New Delhi", 91], ["Gurugram", 84], ["Noida", 82], ["Faridabad", 78], ["Ghaziabad", 74],
            ].map(([d, v], i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border/50 p-2">
                <div className="w-6 text-center font-bold text-muted-foreground">#{i + 1}</div>
                <div className="flex-1 text-sm">{d}</div>
                <Badge variant="outline">{v}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
function Card({ title, span, children }: { title: string; span: string; children: React.ReactNode }) {
  return (
    <div className={`glass col-span-12 rounded-2xl p-4 ${span}`}>
      <div className="mb-3 text-sm font-semibold">{title}</div>
      {children}
    </div>
  );
}
