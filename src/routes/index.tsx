import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import {
  Activity, ShieldAlert, Hospital, Ambulance, Brain, ArrowRight, PlayCircle,
  Radio, MapPin, Zap, HeartPulse, Users, Building2, Cpu, Waves, Github, Twitter, Linkedin,
} from "lucide-react";
import { AnimatedMap } from "@/components/animated-map";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { kpi } from "@/lib/mock-data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HosLink AI — AI-Powered Mass Casualty Coordination" },
      { name: "description", content: "Real-time AI coordination platform for hospitals, ambulances, blood banks and emergency operation centers across India." },
    ],
  }),
  component: Landing,
});

function Counter({ to, duration = 2 }: { to: number; duration?: number }) {
  const v = useMotionValue(0);
  const rounded = useTransform(v, (x) => Math.floor(x).toLocaleString("en-IN"));
  useEffect(() => {
    const ctrl = animate(v, to, { duration, ease: "easeOut" });
    return ctrl.stop;
  }, [to, duration, v]);
  return <motion.span>{rounded}</motion.span>;
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-xl bg-background/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 rounded-xl gradient-medical grid place-items-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emergency">
                <span className="absolute inset-0 rounded-full bg-emergency pulse-ring" />
              </span>
            </div>
            <div className="leading-none">
              <div className="text-base font-bold tracking-tight">HosLink <span className="text-gradient-medical">AI</span></div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">MCI Coordination</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-7 md:flex text-sm text-muted-foreground">
            <a className="hover:text-foreground transition-colors" href="#platform">Platform</a>
            <a className="hover:text-foreground transition-colors" href="#modules">Modules</a>
            <a className="hover:text-foreground transition-colors" href="#network">Network</a>
            <a className="hover:text-foreground transition-colors" href="#trust">Trust</a>
            <Link to="/family" className="hover:text-foreground transition-colors">Family Center</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/command"><Button size="sm" className="gradient-medical text-primary-foreground border-0">
              Launch <ArrowRight className="ml-1 h-4 w-4" />
            </Button></Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0">
          <AnimatedMap className="absolute right-[-100px] top-4 h-[720px] w-[880px] opacity-70" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="outline" className="glass border-primary/30 text-primary">
                <Radio className="mr-1.5 h-3 w-3 animate-pulse" /> Live · v4.2 · Ministry-grade
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
            >
              HosLink <span className="text-gradient-medical">AI</span>
              <span className="block mt-2 text-3xl font-medium text-muted-foreground md:text-4xl">
                AI-Powered Mass Casualty <br className="hidden md:block" /> Coordination Platform
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Unify State EOCs, District Disaster Authorities, hospitals, ambulance networks and blood banks
              on a single real-time operating picture. Ship the right patient to the right bed — in seconds, not hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button size="lg" className="gradient-medical text-primary-foreground border-0 shadow-lg">
                Request Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/command">
                <Button size="lg" variant="outline" className="glass">
                  <Zap className="mr-2 h-4 w-4" /> Launch Command Center
                </Button>
              </Link>
              <Link to="/simulation">
                <Button size="lg" variant="ghost">
                  <PlayCircle className="mr-2 h-4 w-4" /> Watch Simulation
                </Button>
              </Link>
            </motion.div>

            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldAlert className="h-3.5 w-3.5 text-primary" /> NDMA-aligned</div>
              <div className="flex items-center gap-2"><HeartPulse className="h-3.5 w-3.5 text-emergency" /> HL7/FHIR ready</div>
              <div className="flex items-center gap-2"><Cpu className="h-3.5 w-3.5 text-primary" /> On-prem & sovereign cloud</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Live grid</div>
                <div className="flex items-center gap-1.5 text-xs text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> All systems nominal
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <KpiTile icon={<Building2 className="h-4 w-4" />} label="Hospitals Connected" value={kpi.hospitalsConnected} />
                <KpiTile icon={<ShieldAlert className="h-4 w-4" />} label="Active Incidents" value={kpi.activeIncidents} accent="emergency" />
                <KpiTile icon={<Users className="h-4 w-4" />} label="Patients Coordinated" value={kpi.patientsCoordinated} />
                <KpiTile icon={<Brain className="h-4 w-4" />} label="AI Decisions" value={kpi.aiDecisions} />
                <KpiTile icon={<Ambulance className="h-4 w-4" />} label="Ambulances" value={kpi.ambulances} className="col-span-2" />
              </div>

              <div className="mt-4 rounded-xl border border-border/60 bg-background/40 p-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-emergency" /> MCI-2410-018 · NH-48 Pileup
                  </div>
                  <span className="text-emergency">Major</span>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-2 text-center text-[10px]">
                  {[
                    { l: "RED", v: 12, c: "bg-triage-red" },
                    { l: "YEL", v: 34, c: "bg-triage-yellow" },
                    { l: "GRN", v: 58, c: "bg-triage-green" },
                    { l: "BLK", v: 3, c: "bg-triage-black" },
                  ].map((t) => (
                    <div key={t.l} className="rounded-md border border-border/50 p-1.5">
                      <div className={`mx-auto h-1 w-6 rounded ${t.c}`} />
                      <div className="mt-1 text-sm font-bold">{t.v}</div>
                      <div className="text-muted-foreground">{t.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="relative border-y border-border/60 bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <Badge variant="outline">Platform</Badge>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">One coordinated operating picture</h2>
            <p className="mt-3 text-muted-foreground">Built for India's healthcare terrain — from tier-1 metros to district hospitals — with the workflows disaster commanders actually use.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { i: <Activity />, t: "Command Center", d: "Mission-control view of every incident, hospital, ambulance and resource." },
              { i: <Brain />, t: "AI Incident Commander", d: "Explains every recommendation — no black-box, no raw model output." },
              { i: <Hospital />, t: "Hospital Network", d: "Live beds, ICU, HDU, ventilators, blood, O₂, OT & readiness score." },
              { i: <HeartPulse />, t: "Patient Tracking", d: "Unique HosLink ID + QR from scene to discharge, with triage & vitals." },
              { i: <Ambulance />, t: "Ambulance Ops", d: "Live GPS, ETA, fuel, equipment, patient assignment across fleets." },
              { i: <Waves />, t: "Family Reunification", d: "Calming, privacy-first search across every connected hospital." },
            ].map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-5"
              >
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl gradient-medical text-primary-foreground">{m.i}</div>
                <div className="font-semibold">{m.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{m.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section id="trust" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center text-xs uppercase tracking-widest text-muted-foreground">Coordinating with</div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-center text-sm font-medium text-muted-foreground md:grid-cols-4 lg:grid-cols-6">
            {["NDMA","State EOCs","AIIMS Network","CATS 108","Red Cross","ICMR"].map(x => (
              <div key={x} className="glass rounded-xl px-4 py-3">{x}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-10 md:p-14">
            <div className="absolute inset-0 gradient-medical opacity-20" />
            <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-3xl font-bold md:text-4xl">Ready when seconds matter.</h3>
                <p className="mt-3 max-w-lg text-muted-foreground">Deploy HosLink AI at your State EOC and connect your district in under 30 days.</p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button size="lg" className="gradient-medical border-0 text-primary-foreground">Request Demo</Button>
                <Button size="lg" variant="outline" className="glass">Talk to Ops</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER — cloud-scale style */}
      <footer className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-6">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg gradient-medical grid place-items-center">
                  <Activity className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="font-bold">HosLink AI</div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-xs">Sovereign coordination infrastructure for India's mass casualty response.</p>
              <div className="mt-4 flex gap-3 text-muted-foreground">
                <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
                <a href="#" aria-label="GitHub"><Github className="h-4 w-4" /></a>
              </div>
            </div>
            {[
              { h: "Platform", l: ["Command Center","AI Commander","Hospital Network","Ambulance Ops","Resource Exchange"] },
              { h: "Operations", l: ["Incident Management","Triage Board","Patient Tracking","Simulation Mode","Analytics"] },
              { h: "Company", l: ["About","Careers","Press","Partners","Contact"] },
              { h: "Trust", l: ["Security","Compliance","Sovereign Cloud","Status","Privacy"] },
            ].map((c) => (
              <div key={c.h}>
                <div className="text-xs font-semibold uppercase tracking-widest text-foreground/80">{c.h}</div>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {c.l.map((x) => <li key={x}><a className="hover:text-foreground transition-colors" href="#">{x}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground">
            <div>© 2026 HosLink AI Technologies Pvt. Ltd. · Bengaluru · New Delhi</div>
            <div className="flex gap-4">
              <a href="#">Privacy</a><a href="#">Terms</a><a href="#">DPDP Act</a><a href="#">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function KpiTile({ icon, label, value, accent, className = "" }: {
  icon: React.ReactNode; label: string; value: number; accent?: "emergency"; className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border/60 bg-background/40 p-3 ${className}`}>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
        <span className={accent === "emergency" ? "text-emergency" : "text-primary"}>{icon}</span> {label}
      </div>
      <div className={`mt-1 text-2xl font-bold ${accent === "emergency" ? "text-emergency" : ""}`}>
        <Counter to={value} />
      </div>
    </div>
  );
}
