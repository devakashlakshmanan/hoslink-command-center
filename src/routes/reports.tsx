import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Sparkles } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — UrHealth AI" }] }),
  component: () => <AppShell><Reports /></AppShell>,
});

const reports = [
  { t: "Incident Report", d: "Complete after-action review with timeline, casualties, AI decisions." },
  { t: "Hospital Report", d: "Bed, blood, ventilator utilization and readiness by facility." },
  { t: "Resource Report", d: "Inter-hospital transfers, fulfillment SLA, provider ranking." },
  { t: "Patient Summary", d: "Per-patient triage, transfers, outcomes (de-identified export)." },
  { t: "AI Summary", d: "Recommendations issued, executed, deferred, overridden with rationale." },
];

function Reports() {
  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Documentation</div>
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {reports.map(r => (
          <div key={r.t} className="glass rounded-2xl p-4">
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-lg gradient-medical grid place-items-center"><FileText className="h-5 w-5 text-primary-foreground" /></div>
              <Badge variant="outline"><Sparkles className="mr-1 h-3 w-3 text-primary" />AI-drafted</Badge>
            </div>
            <div className="mt-3 font-semibold">{r.t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{r.d}</div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="gradient-medical border-0 text-primary-foreground"><Download className="mr-1 h-4 w-4" /> Export PDF</Button>
              <Button size="sm" variant="outline">Preview</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
