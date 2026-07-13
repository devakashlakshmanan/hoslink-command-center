import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { patients } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, QrCode, HeartPulse, Activity, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/patients")({
  head: () => ({ meta: [{ title: "Patient Tracking — HosLink AI" }] }),
  component: () => <AppShell><PatientsPage /></AppShell>,
});

const triageColor: Record<string, string> = {
  Red: "bg-triage-red text-white",
  Yellow: "bg-triage-yellow text-black",
  Green: "bg-triage-green text-white",
  Black: "bg-triage-black text-white",
};

function PatientsPage() {
  const [sel, setSel] = useState(patients[0]);
  const [q, setQ] = useState("");
  const list = patients.filter(p => (p.name + p.id).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Care Coordination</div>
          <h1 className="text-2xl font-bold">Patient Tracking</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="HL-ID or name…" value={q} onChange={e => setQ(e.target.value)} className="pl-9 w-64" />
          </div>
          <Button size="sm" variant="outline"><QrCode className="mr-1 h-4 w-4" /> Scan QR</Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="glass col-span-12 rounded-2xl p-2 lg:col-span-5">
          <div className="divide-y divide-border/60">
            {list.map((p) => (
              <button key={p.id} onClick={() => setSel(p)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${sel.id === p.id ? "bg-accent" : "hover:bg-accent/40"}`}>
                <div className="flex items-center gap-3">
                  <span className={`grid h-8 w-8 place-items-center rounded-md text-[10px] font-bold ${triageColor[p.triage]}`}>{p.triage.slice(0,3).toUpperCase()}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{p.age}{p.sex}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono">{p.id} · {p.status}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <motion.div key={sel.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="glass col-span-12 rounded-2xl p-4 lg:col-span-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{sel.name}</h2>
                <Badge className={triageColor[sel.triage]}>{sel.triage}</Badge>
                <Badge variant="outline">{sel.status}</Badge>
              </div>
              <div className="text-xs text-muted-foreground font-mono mt-0.5">{sel.id} · {sel.age}{sel.sex} · Incident {sel.incidentId}</div>
            </div>
            <div className="grid h-24 w-24 place-items-center rounded-lg border border-border/60 bg-background/40">
              <QrPattern seed={sel.id} />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
            <Vital label="HR" v={sel.vitals.hr} unit="bpm" />
            <Vital label="BP" v={sel.vitals.bp} unit="mmHg" />
            <Vital label="SpO₂" v={sel.vitals.spo2} unit="%" />
            <Vital label="RR" v={sel.vitals.rr} unit="/min" />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <InfoBlock label="Assigned Hospital" v={sel.hospital} />
            <InfoBlock label="Assigned Ambulance" v={sel.ambulance} />
          </div>

          <div className="mt-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Medical Notes</div>
            <div className="mt-1 rounded-lg border border-border/60 bg-background/40 p-3 text-sm">{sel.notes}</div>
          </div>

          <div className="mt-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Transfer History</div>
            <ol className="relative mt-2 space-y-2 pl-5">
              <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />
              {[
                { t: "Scene · NH-48 Km 23", e: "Triaged " + sel.triage },
                { t: sel.ambulance, e: "Enroute to " + sel.hospital },
                { t: sel.hospital, e: sel.status },
              ].map((x, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-3.5 top-1.5 h-2 w-2 rounded-full gradient-medical" />
                  <div className="text-sm font-medium">{x.t}</div>
                  <div className="text-xs text-muted-foreground">{x.e}</div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-4 flex gap-2">
            <Button size="sm" className="gradient-medical border-0 text-primary-foreground"><HeartPulse className="mr-1 h-4 w-4" /> Update Vitals</Button>
            <Button size="sm" variant="outline"><Activity className="mr-1 h-4 w-4" /> Transfer</Button>
            <Button size="sm" variant="ghost">Notify Family</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Vital({ label, v, unit }: { label: string; v: number | string; unit: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-2.5">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-xl font-bold font-mono">{v}<span className="text-[10px] text-muted-foreground font-normal ml-0.5">{unit}</span></div>
    </div>
  );
}
function InfoBlock({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/40 p-2.5">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-medium">{v}</div>
    </div>
  );
}
function QrPattern({ seed }: { seed: string }) {
  // deterministic pseudo-QR pattern
  const cells = Array.from({ length: 8 * 8 }, (_, i) => {
    const c = (seed.charCodeAt(i % seed.length) + i * 17) % 3;
    return c === 0;
  });
  return (
    <div className="grid h-16 w-16 grid-cols-8 gap-[1px]">
      {cells.map((on, i) => (
        <div key={i} className={on ? "bg-foreground" : "bg-transparent"} />
      ))}
    </div>
  );
}
