import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { hospitals } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Building2, Droplet, MapPin, ShieldPlus, Stethoscope } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/hospitals")({
  head: () => ({ meta: [{ title: "Hospital Network — HosLink AI" }] }),
  component: () => <AppShell><HospitalNetwork /></AppShell>,
});

const statusMap: Record<string, string> = {
  Ready: "bg-success/15 text-success border-success/30",
  Strained: "bg-warning/15 text-warning border-warning/30",
  Critical: "bg-emergency/15 text-emergency border-emergency/30",
  Overloaded: "bg-destructive/15 text-destructive border-destructive/40",
};

function HospitalNetwork() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Network</div>
          <h1 className="text-2xl font-bold">Hospital Network</h1>
          <div className="text-xs text-muted-foreground">1,284 hospitals connected · 46 in Delhi-NCR cluster</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search hospital…" className="pl-9 w-64" />
          </div>
          <Button variant="outline" size="sm">Filters</Button>
          <Button size="sm" className="gradient-medical border-0 text-primary-foreground">Add Hospital</Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {hospitals.map((h, i) => (
          <motion.div key={h.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="glass rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg gradient-medical grid place-items-center">
                    <Building2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{h.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{h.type} · {h.city}</div>
                  </div>
                </div>
              </div>
              <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium ${statusMap[h.status]}`}>{h.status}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span><MapPin className="mr-1 inline h-3 w-3" /> {h.distanceKm} km · {h.etaMin} min ETA</span>
              {h.traumaCenter && <Badge variant="outline" className="border-emergency/40 text-emergency"><ShieldPlus className="mr-1 h-3 w-3" /> Trauma</Badge>}
            </div>

            <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-[10px]">
              <Cell label="Gen" v={h.general.available} t={h.general.total} />
              <Cell label="ICU" v={h.icu.available} t={h.icu.total} />
              <Cell label="HDU" v={h.hdu.available} t={h.hdu.total} />
              <Cell label="Vent" v={h.ventilators.available} t={h.ventilators.total} />
            </div>

            <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[10px]">
              <div className="rounded border border-border/50 p-1.5"><Droplet className="mx-auto h-3 w-3 text-emergency" /><div className="font-bold">{h.bloodUnits}</div><div className="text-muted-foreground">Blood U</div></div>
              <div className="rounded border border-border/50 p-1.5"><Building2 className="mx-auto h-3 w-3 text-primary" /><div className="font-bold">{h.ot}</div><div className="text-muted-foreground">OT</div></div>
              <div className="rounded border border-border/50 p-1.5"><Stethoscope className="mx-auto h-3 w-3 text-primary" /><div className="font-bold">{h.emergencyDoctors}</div><div className="text-muted-foreground">ER MDs</div></div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="h-10 w-28">
                <ResponsiveContainer><LineChart data={h.trend.map((y, i) => ({ i, y }))}>
                  <Line type="monotone" dataKey="y" stroke="var(--color-primary)" strokeWidth={1.5} dot={false} />
                </LineChart></ResponsiveContainer>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-muted-foreground">Readiness</div>
                <div className={`text-lg font-bold ${h.readiness > 75 ? "text-success" : h.readiness > 50 ? "text-warning" : "text-emergency"}`}>{h.readiness}</div>
              </div>
            </div>

            <div className="mt-3 rounded-lg border border-primary/30 bg-primary/5 p-2 text-xs text-primary">
              <span className="font-medium">AI:</span> {h.prediction}
            </div>

            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Open</Button>
              <Button size="sm" className="gradient-medical border-0 text-primary-foreground">Request</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Cell({ label, v, t }: { label: string; v: number; t: number }) {
  const pct = (v / t) * 100;
  return (
    <div className="rounded border border-border/50 p-1.5">
      <div className="text-muted-foreground">{label}</div>
      <div className="font-bold text-sm">{v}<span className="text-muted-foreground font-normal">/{t}</span></div>
      <div className="mt-0.5 h-1 overflow-hidden rounded bg-muted"><div className={`h-full ${pct < 20 ? "bg-emergency" : pct < 40 ? "bg-warning" : "bg-success"}`} style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
