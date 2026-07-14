import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { alerts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Filter, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — UrHealth AI" }] }),
  component: () => <AppShell><Notifications /></AppShell>,
});

function Notifications() {
  const [f, setF] = useState<"All"|"Critical"|"Warning"|"Information">("All");
  const list = f === "All" ? alerts : alerts.filter(a => a.priority === f);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Feed</div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Bell className="h-6 w-6" /> Notifications</h1>
        </div>
        <Button variant="outline" size="sm"><Check className="mr-1 h-4 w-4" /> Mark all read</Button>
      </div>
      <div className="flex gap-2">
        {(["All","Critical","Warning","Information"] as const).map(x => (
          <button key={x} onClick={() => setF(x)}
            className={`rounded-full border px-3 py-1 text-xs ${f===x ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 text-muted-foreground"}`}>
            <Filter className="mr-1 inline h-3 w-3" />{x}
          </button>
        ))}
      </div>
      <div className="glass rounded-2xl divide-y divide-border/60">
        {list.map(a => (
          <div key={a.id} className="flex items-start gap-3 p-4 hover:bg-accent/30">
            <Badge variant={a.priority === "Critical" ? "destructive" : "outline"}
              className={a.priority === "Warning" ? "border-warning/50 text-warning" : ""}>{a.priority}</Badge>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="font-medium">{a.title}</div>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
              <div className="text-sm text-muted-foreground">{a.body}</div>
              <div className="text-[11px] text-muted-foreground mt-1">Source: {a.source}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
