import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ambulances } from "@/lib/mock-data";
import { Ambulance as AmbIcon, Fuel, MapPin, User, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Route = createFileRoute("/ambulances")({
  head: () => ({ meta: [{ title: "Ambulance Ops — UrHealth AI" }] }),
  component: () => <AppShell><AmbulancesPage /></AppShell>,
});

const stColor: Record<string, string> = {
  Available: "bg-success/15 text-success border-success/30",
  Enroute: "bg-info/15 text-info border-info/30",
  "At Scene": "bg-warning/15 text-warning border-warning/30",
  Transporting: "bg-primary/15 text-primary border-primary/30",
  Returning: "bg-muted text-muted-foreground border-border",
  Offline: "bg-destructive/15 text-destructive border-destructive/30",
};

function AmbulancesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Fleet Ops</div>
          <h1 className="text-2xl font-bold">Ambulance Management</h1>
        </div>
        <Button className="gradient-medical border-0 text-primary-foreground">Dispatch New Unit</Button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="glass col-span-12 rounded-2xl p-4 lg:col-span-7">
          <div className="mb-2 text-sm font-semibold">Live Fleet Map</div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-background/40">
            <div className="absolute inset-0 grid-bg opacity-70" />
            <svg viewBox="0 0 800 450" className="absolute inset-0 h-full w-full">
              <path d="M0 220 Q 200 180 400 250 T 800 220" stroke="oklch(0.7 0.16 240 / 0.4)" strokeWidth="16" fill="none" />
              {ambulances.map((a, i) => {
                const x = 80 + i * 80;
                const y = 120 + ((i * 47) % 220);
                return (
                  <g key={a.id} transform={`translate(${x},${y})`}>
                    <circle r="14" fill="oklch(0.55 0.18 250 / 0.15)">
                      <animate attributeName="r" values="8;18;8" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                    </circle>
                    <rect x="-8" y="-6" width="16" height="12" rx="2" fill="oklch(0.6 0.24 25)" />
                    <text y="24" textAnchor="middle" fontSize="8" fill="oklch(0.8 0.05 240)" fontFamily="JetBrains Mono">{a.id.slice(-4)}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="col-span-12 space-y-3 lg:col-span-5">
          {ambulances.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className="glass rounded-xl p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="h-9 w-9 rounded-lg gradient-emergency grid place-items-center shrink-0">
                    <AmbIcon className="h-4 w-4 text-emergency-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-sm font-semibold truncate">{a.id}</div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1"><User className="h-3 w-3" /> {a.driver}</div>
                  </div>
                </div>
                <span className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${stColor[a.status]}`}>{a.status}</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1.5 text-[10px]">
                <Info icon={<MapPin className="h-3 w-3" />} label="Destination" v={a.destination} />
                <Info icon={<Fuel className="h-3 w-3" />} label="Fuel" v={`${a.fuel}%`} />
                <Info label="ETA" v={a.etaMin ? `${a.etaMin} min` : "—"} />
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {a.equipment.map((e) => (
                  <Badge key={e} variant="outline" className="text-[10px]"><Wrench className="mr-1 h-2.5 w-2.5" /> {e}</Badge>
                ))}
                {a.patient && <Badge className="text-[10px] bg-primary/15 text-primary border-primary/30" variant="outline">Patient {a.patient}</Badge>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, v }: any) {
  return (
    <div className="rounded border border-border/50 p-1.5">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">{icon} {label}</div>
      <div className="font-medium truncate">{v}</div>
    </div>
  );
}
