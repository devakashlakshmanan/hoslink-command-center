import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — HosLink AI" }] }),
  component: () => <AppShell><Settings /></AppShell>,
});

function Settings() {
  const { theme, setTheme } = useApp();
  return (
    <div className="space-y-4">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Configuration</div>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <Tabs defaultValue="hospital">
        <TabsList className="glass">
          <TabsTrigger value="hospital">Hospital</TabsTrigger>
          <TabsTrigger value="district">District</TabsTrigger>
          <TabsTrigger value="state">State</TabsTrigger>
          <TabsTrigger value="notif">Notifications</TabsTrigger>
          <TabsTrigger value="theme">Theme & Language</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="hospital" className="glass mt-3 rounded-2xl p-5 space-y-3">
          <Row label="Hospital Name" v="AIIMS New Delhi" />
          <Row label="Type" v="Medical College" />
          <Row label="Trauma Center" toggle />
          <Row label="Total ER Doctors" v="62" />
        </TabsContent>
        <TabsContent value="district" className="glass mt-3 rounded-2xl p-5 space-y-3">
          <Row label="District" v="New Delhi" />
          <Row label="Control Center" v="DDMA Delhi HQ" />
        </TabsContent>
        <TabsContent value="state" className="glass mt-3 rounded-2xl p-5 space-y-3">
          <Row label="State" v="Delhi" />
          <Row label="State EOC" v="Delhi State EOC" />
        </TabsContent>
        <TabsContent value="notif" className="glass mt-3 rounded-2xl p-5 space-y-3">
          <Row label="Critical alerts — SMS" toggle def />
          <Row label="Warning alerts — Email" toggle def />
          <Row label="AI recommendations — Push" toggle def />
        </TabsContent>
        <TabsContent value="theme" className="glass mt-3 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label>Dark mode</Label>
              <div className="text-xs text-muted-foreground">Optimized for command-center displays</div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
          </div>
          <Row label="Language" v="English (India)" />
        </TabsContent>
        <TabsContent value="api" className="glass mt-3 rounded-2xl p-5 space-y-3">
          <Row label="HL7/FHIR endpoint" v="https://fhir.hoslink.gov.in/r4" />
          <Row label="Nemotron key" v="•••• •••• •••• 42a1" />
          <Button className="gradient-medical border-0 text-primary-foreground">Rotate keys</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Row({ label, v, toggle, def }: { label: string; v?: string; toggle?: boolean; def?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/40 p-3">
      <Label className="text-sm">{label}</Label>
      {toggle ? <Switch defaultChecked={def} /> : <Input defaultValue={v} className="max-w-md" />}
    </div>
  );
}
