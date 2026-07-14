import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { patients, type Patient } from "@/lib/mock-data";
import { useState, type DragEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/triage")({
  head: () => ({ meta: [{ title: "Triage Board — UrHealth AI" }] }),
  component: () => <AppShell><TriageBoard /></AppShell>,
});

type Triage = Patient["triage"];
const cats: { key: Triage; label: string; color: string; ai: string }[] = [
  { key: "Red", label: "Red · Immediate", color: "border-triage-red/60 bg-triage-red/5", ai: "Ship to nearest trauma center within 10 min." },
  { key: "Yellow", label: "Yellow · Delayed", color: "border-triage-yellow/60 bg-triage-yellow/5", ai: "Consolidate at Level-2 hospital; 60-min tolerance." },
  { key: "Green", label: "Green · Walking", color: "border-triage-green/60 bg-triage-green/5", ai: "Route to district hospital for observation." },
  { key: "Black", label: "Black · Deceased", color: "border-triage-black/60 bg-triage-black/10", ai: "Preserve identity chain-of-custody; family notification." },
];

function TriageBoard() {
  const [items, setItems] = useState(patients);
  const [dragging, setDragging] = useState<string | null>(null);

  const onDrop = (t: Triage) => (e: DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    setItems((prev) => prev.map(p => p.id === id ? { ...p, triage: t } : p));
    setDragging(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Field Ops</div>
        <h1 className="text-2xl font-bold">Triage Board</h1>
        <div className="text-xs text-muted-foreground">Drag patients between categories. AI suggestions update in real time.</div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {cats.map((c) => {
          const list = items.filter((p) => p.triage === c.key);
          return (
            <div key={c.key} onDragOver={(e) => e.preventDefault()} onDrop={onDrop(c.key)}
              className={`glass rounded-2xl border ${c.color} p-3 min-h-[440px]`}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{c.label}</div>
                <Badge variant="outline">{list.length}</Badge>
              </div>
              <div className="mt-1 flex items-start gap-1.5 rounded-lg border border-primary/30 bg-primary/5 p-2 text-[11px] text-primary">
                <Sparkles className="mt-0.5 h-3 w-3" /> {c.ai}
              </div>
              <div className="mt-3 space-y-2">
                {list.map((p) => (
                  <div key={p.id} draggable
                    onDragStart={(e) => { e.dataTransfer.setData("id", p.id); setDragging(p.id); }}
                    onDragEnd={() => setDragging(null)}
                    className={`rounded-lg border border-border/60 bg-card p-2.5 cursor-grab active:cursor-grabbing transition-opacity ${dragging === p.id ? "opacity-40" : ""}`}>
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm truncate">{p.name}</div>
                      <span className="font-mono text-[10px] text-muted-foreground">{p.id.slice(-4)}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">{p.notes}</div>
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span>HR {p.vitals.hr}</span>·<span>SpO₂ {p.vitals.spo2}%</span>·<span>BP {p.vitals.bp}</span>
                    </div>
                    <div className="mt-1.5 rounded border border-primary/20 bg-primary/5 p-1 text-[10px] text-primary">
                      AI: {p.triage === "Red" ? "Priority evac · alert receiving OT" :
                            p.triage === "Yellow" ? "Splint & IV access · reassess in 15m" :
                            p.triage === "Green" ? "Observation pod · walk-in triage" : "Preserve remains · notify family"}
                    </div>
                  </div>
                ))}
                {list.length === 0 && (
                  <div className="rounded-lg border border-dashed border-border/60 p-6 text-center text-xs text-muted-foreground">
                    Drop patients here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
