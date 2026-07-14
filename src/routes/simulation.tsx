import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RefreshCw, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

export const Route = createFileRoute("/simulation")({
  head: () => ({ meta: [{ title: "Simulation Mode — UrHealth AI" }] }),
  component: () => <AppShell><Simulation /></AppShell>,
});

const scenarios = [
  "Road accident — NH-48 pileup",
  "Train derailment — Kanpur outskirts",
  "Flood — Assam Barpeta district",
  "Industrial fire — Bhiwandi warehouse",
  "Chemical leak — Manesar IMT",
  "Festival stampede — Sabarimala",
  "School bus accident — Ooty ghats",
  "Temple stampede — Ujjain",
  "Heat wave — Vidarbha region",
  "Disease outbreak — dengue cluster",
];

function Simulation() {
  const [scenario, setScenario] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    ref.current = window.setInterval(() => setT((x) => (x + 1) % 100), 200);
    return () => { if (ref.current) window.clearInterval(ref.current); };
  }, [playing]);

  const generate = () => {
    const s = scenarios[Math.floor(Math.random() * scenarios.length)];
    setScenario(s); setT(0); setPlaying(true);
  };

  const data = Array.from({ length: 24 }, (_, i) => ({
    t: `T+${i * 5}m`,
    load: Math.round(30 + Math.sin((i + t / 5) / 3) * 20 + i * 2.5),
    diverted: Math.round(10 + Math.cos((i + t / 4) / 2) * 8 + i * 1.5),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Training</div>
          <h1 className="text-2xl font-bold flex items-center gap-2">Simulation Mode <Badge variant="outline" className="border-warning/40 text-warning">Sandbox</Badge></h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={generate} className="gradient-medical border-0 text-primary-foreground">
            <Sparkles className="mr-1 h-4 w-4" /> Generate Incident (Nemotron)
          </Button>
          <Button variant="outline" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}{playing ? "Pause" : "Play"}
          </Button>
          <Button variant="ghost" onClick={() => setT(0)}><RefreshCw className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{scenario ?? "No scenario yet — generate to begin"}</div>
              <div className="text-xs text-muted-foreground">Playback · T = {t * 3} min</div>
            </div>
            <Badge variant="outline"><Zap className="mr-1 h-3 w-3 text-primary" /> AI decisions replayed</Badge>
          </div>
          <div className="mt-3 relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-background/40">
            <div className="absolute inset-0 grid-bg opacity-70" />
            <svg viewBox="0 0 800 450" className="absolute inset-0 h-full w-full">
              <path d="M0 220 Q 200 180 400 250 T 800 220" stroke="oklch(0.7 0.16 240 / 0.35)" strokeWidth="16" fill="none" />
              {/* incident epicenter */}
              <g transform="translate(400,250)">
                <circle r={40 + (t % 10) * 2} fill="oklch(0.6 0.24 25 / 0.15)" />
                <circle r="10" fill="oklch(0.6 0.24 25)" />
              </g>
              {/* moving patients */}
              {Array.from({ length: 6 }).map((_, i) => {
                const path = `M 400 250 Q ${300 + i * 30} ${150 + i * 10} ${200 + i * 60} ${100 + i * 20}`;
                return (
                  <g key={i}>
                    <path d={path} stroke="oklch(0.7 0.16 240 / 0.5)" strokeWidth="1.2" strokeDasharray="4 4" fill="none" className="dash-move" />
                    <motion.circle r="4" fill="oklch(0.85 0.14 240)">
                      <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" path={path} />
                    </motion.circle>
                  </g>
                );
              })}
              {/* hospitals */}
              {[[200, 100], [260, 140], [500, 130], [620, 200], [180, 340], [560, 360]].map(([x, y], i) => (
                <g key={i} transform={`translate(${x},${y})`}>
                  <rect x="-8" y="-8" width="16" height="16" rx="3" fill="oklch(0.5 0.18 250)" />
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-4 space-y-3">
          <div className="text-sm font-semibold">AI Decision Log</div>
          <div className="space-y-2 text-xs">
            {[
              "T+2m · Dispatched 12 ambulances to scene",
              "T+4m · Pre-alerted 6 hospitals (Level 2)",
              "T+7m · Redirected 4 Red patients to AIIMS",
              "T+12m · Activated blood inter-transfer (24 units O-)",
              "T+18m · Requested 2 mobile OTs from IMS reserve",
              "T+24m · Family Reunification Center engaged",
            ].slice(0, Math.max(1, Math.floor(t / 15) + 1)).map((x, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                className="rounded-lg border border-primary/30 bg-primary/5 p-2 text-primary">{x}</motion.div>
            ))}
          </div>
        </div>

        <div className="glass col-span-12 rounded-2xl p-4">
          <div className="mb-2 text-sm font-semibold">Hospital Load vs. Diverted Load (playback)</div>
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="l" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-emergency)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--color-emergency)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="d" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--color-muted-foreground)" />
                <Area type="monotone" dataKey="load" stroke="var(--color-emergency)" fill="url(#l)" />
                <Area type="monotone" dataKey="diverted" stroke="var(--color-primary)" fill="url(#d)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
