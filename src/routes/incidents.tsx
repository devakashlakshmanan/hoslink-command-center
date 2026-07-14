import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { motion } from "framer-motion";
import { incidents } from "@/lib/mock-data";
import {
  AlertTriangle, Plus, Flame, Car, Train, Bus, Building2, Waves, Zap, Wind, Mountain,
  Users2, Factory, Bomb, Plane, Filter, Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/incidents")({
  head: () => ({ meta: [{ title: "Incidents — UrHealth AI" }] }),
  component: () => <AppShell><Incidents /></AppShell>,
});

const types = [
  { label: "Road Accident", icon: Car }, { label: "Train Accident", icon: Train },
  { label: "Bus Accident", icon: Bus }, { label: "Fire", icon: Flame },
  { label: "Industrial Accident", icon: Factory }, { label: "Chemical Leak", icon: Bomb },
  { label: "Flood", icon: Waves }, { label: "Earthquake", icon: Mountain },
  { label: "Cyclone", icon: Wind }, { label: "Festival Stampede", icon: Users2 },
  { label: "Bridge Collapse", icon: Building2 }, { label: "Building Collapse", icon: Building2 },
  { label: "Airport Incident", icon: Plane },
];

function Incidents() {
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? incidents : incidents.filter((i) => i.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Operations</div>
          <h1 className="text-2xl font-bold">Incident Management</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Filter className="mr-1 h-4 w-4" /> Filters</Button>
          <NewIncidentDialog />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["All","Active","Contained","Resolved"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${filter === f ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 text-muted-foreground hover:text-foreground"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((i, idx) => (
          <motion.div key={i.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <Card className="glass p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={i.status === "Active" ? "destructive" : "outline"}>{i.status}</Badge>
                    <Badge variant="outline" className={
                      i.severity === "Catastrophic" ? "border-emergency/50 text-emergency" :
                      i.severity === "Major" ? "border-warning/50 text-warning" : ""
                    }>{i.severity}</Badge>
                  </div>
                  <div className="mt-2 text-lg font-semibold">{i.title}</div>
                  <div className="text-xs text-muted-foreground font-mono">{i.id} · {i.type}</div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{i.location}</div>
                  <div>{i.district}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-xs">
                <TChip color="bg-triage-red" v={i.casualties.red} l="Red" />
                <TChip color="bg-triage-yellow" v={i.casualties.yellow} l="Yellow" />
                <TChip color="bg-triage-green" v={i.casualties.green} l="Green" />
                <TChip color="bg-triage-black" v={i.casualties.black} l="Deceased" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span><Timer className="mr-1 inline h-3 w-3" /> Started {new Date(i.startedAt).toLocaleTimeString()}</span>
                <span>{i.ambulances} amb · {i.hospitals} hosp</span>
              </div>

              {/* mini timeline */}
              <div className="mt-3 rounded-lg border border-border/50 bg-background/40 p-2">
                <div className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Live Timeline</div>
                <div className="relative h-8">
                  <div className="absolute inset-y-1/2 h-px w-full bg-border" />
                  {[10, 25, 45, 62, 78, 92].map((p, k) => (
                    <div key={k} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${p}%` }}>
                      <div className="h-2 w-2 rounded-full gradient-medical" />
                    </div>
                  ))}
                  <div className="absolute right-0 top-0 text-[10px] text-primary">Now</div>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">Open</Button>
                <Button size="sm" variant="ghost">AI Brief</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TChip({ color, v, l }: any) {
  return (
    <div className="rounded border border-border/50 p-1.5">
      <div className={`mx-auto h-1 w-6 rounded ${color}`} />
      <div className="mt-1 font-bold">{v}</div>
      <div className="text-[10px] text-muted-foreground">{l}</div>
    </div>
  );
}

function NewIncidentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gradient-emergency border-0 text-emergency-foreground">
          <Plus className="mr-1 h-4 w-4" /> Declare Incident
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-emergency" /> Declare Mass Casualty Incident
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Type</Label>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {types.map((t) => {
                const I = t.icon;
                return (
                  <button key={t.label} className="flex flex-col items-center gap-1 rounded-lg border border-border/60 p-2 text-[11px] hover:border-primary/50 hover:bg-primary/5">
                    <I className="h-4 w-4 text-primary" /> {t.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Severity</Label>
              <Select defaultValue="Major">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Minor","Moderate","Major","Catastrophic"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">District</Label>
              <Input className="mt-1" placeholder="e.g. Gurugram" />
            </div>
          </div>
          <div>
            <Label className="text-xs">Location</Label>
            <Input className="mt-1" placeholder="Landmark, road, coordinates…" />
          </div>
          <div className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-xs text-warning">
            <Zap className="mr-1 inline h-3 w-3" /> Declaring will trigger AI Incident Commander, hospital pre-alert cascade and dispatch protocols.
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button className="gradient-emergency border-0 text-emergency-foreground">Declare & Notify Network</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
