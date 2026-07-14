import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { resources } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplet, Wind, Stethoscope, Bed, Ambulance, Zap, Sparkles } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [{ title: "Resource Exchange — UrHealth AI" }] }),
  component: () => <AppShell><ResourcesPage /></AppShell>,
});

const typeIcon: Record<string, any> = {
  Blood: Droplet, Ventilator: Zap, Doctor: Stethoscope, ICU: Bed, Ambulance: Ambulance, Oxygen: Wind,
};
const stColor: Record<string, string> = {
  Requested: "border-warning/40 text-warning bg-warning/10",
  Matched: "border-info/40 text-info bg-info/10",
  "In Transit": "border-primary/40 text-primary bg-primary/10",
  Fulfilled: "border-success/40 text-success bg-success/10",
};

function ResourcesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Network</div>
          <h1 className="text-2xl font-bold">Resource Exchange</h1>
          <div className="text-xs text-muted-foreground">AI matches surplus supply with real-time demand across your district cluster.</div>
        </div>
        <Button className="gradient-medical border-0 text-primary-foreground">New Request</Button>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        {(["Blood","Ventilator","Doctor","ICU","Ambulance","Oxygen"] as const).map((k) => {
          const Icon = typeIcon[k];
          return (
            <button key={k} className="glass rounded-xl p-3 text-left hover:border-primary/50">
              <Icon className="h-4 w-4 text-primary" />
              <div className="mt-1 text-sm font-semibold">{k}</div>
              <div className="text-[10px] text-muted-foreground">Request now</div>
            </button>
          );
        })}
      </div>

      <div className="glass rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold">Active Exchanges</div>
          <Badge variant="outline"><Sparkles className="mr-1 h-3 w-3 text-primary" /> AI matched</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="py-2">Type</th><th>Requester</th><th></th><th>Provider</th><th>Quantity</th><th>Status</th><th>AI Match</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {resources.map((r) => {
                const Icon = typeIcon[r.type];
                return (
                  <tr key={r.id} className="hover:bg-accent/30">
                    <td className="py-2"><span className="flex items-center gap-2"><Icon className="h-4 w-4 text-primary" /> {r.type}</span></td>
                    <td>{r.requester}</td>
                    <td className="text-center"><ArrowRight className="mx-auto h-3.5 w-3.5 text-muted-foreground" /></td>
                    <td>{r.provider}</td>
                    <td className="font-mono text-xs">{r.quantity}</td>
                    <td><span className={`rounded-md border px-2 py-0.5 text-[10px] ${stColor[r.status]}`}>{r.status}</span></td>
                    <td><Badge variant="outline">{r.aiConfidence}%</Badge></td>
                    <td><Button size="sm" variant="ghost">Track</Button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
