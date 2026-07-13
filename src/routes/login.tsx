import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Activity, ShieldCheck, Lock, Fingerprint, ChevronRight, Landmark,
  Building2, Stethoscope, Ambulance, Droplet, Users, Shield, Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const roles = [
  { id: "super", label: "Super Admin", icon: Shield },
  { id: "state", label: "State Control Center", icon: Landmark },
  { id: "district", label: "District Control Center", icon: Building2 },
  { id: "hospital", label: "Hospital Admin", icon: Building2 },
  { id: "doctor", label: "Emergency Doctor", icon: Stethoscope },
  { id: "ambulance", label: "Ambulance Operator", icon: Ambulance },
  { id: "blood", label: "Blood Bank Officer", icon: Droplet },
  { id: "family", label: "Family Assistance Officer", icon: Users },
];

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — HosLink AI" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [role, setRole] = useState("state");
  const nav = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden gradient-hero">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left */}
        <div className="hidden flex-col justify-between p-12 lg:flex">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl gradient-medical grid place-items-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-bold">HosLink <span className="text-gradient-medical">AI</span></div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">MCI Coordination</div>
            </div>
          </Link>

          <div>
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <Brain className="h-3.5 w-3.5" /> AI Incident Commander
              </div>
              <p className="mt-3 text-lg leading-snug">
                "Diverting 8 Red-triage patients from LNJP to AIIMS — projected ICU saturation avoided in 42 minutes."
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Confidence 94% · 3.1s decision</span>
                <span className="text-success">Executed</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
              <div className="glass rounded-xl p-3"><ShieldCheck className="mb-1 h-4 w-4 text-primary" /> DPDP Compliant</div>
              <div className="glass rounded-xl p-3"><Lock className="mb-1 h-4 w-4 text-primary" /> AES-256 in transit</div>
              <div className="glass rounded-xl p-3"><Fingerprint className="mb-1 h-4 w-4 text-primary" /> Aadhaar-linked SSO</div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">Restricted portal. Unauthorized access is punishable under IT Act §66.</div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="glass-strong w-full max-w-md rounded-2xl p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Secure Sign in</div>
                <h1 className="mt-1 text-2xl font-bold">Command access</h1>
              </div>
              <div className="rounded-lg border border-border/60 px-2 py-1 text-[10px] uppercase tracking-widest text-success">
                <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-success" /> Node online
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">Select role</Label>
              <div className="grid max-h-56 grid-cols-2 gap-2 overflow-y-auto pr-1">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const active = role === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`flex items-center gap-2 rounded-lg border p-2.5 text-left text-xs transition-all ${
                        active ? "border-primary/60 bg-primary/10 text-foreground" : "border-border/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="truncate">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form
              className="mt-5 space-y-3"
              onSubmit={(e) => { e.preventDefault(); nav({ to: "/command" }); }}
            >
              <div>
                <Label htmlFor="id" className="text-xs">Government ID / Email</Label>
                <Input id="id" defaultValue="cmdr.arora@ndma.gov.in" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="pw" className="text-xs">Passphrase</Label>
                <Input id="pw" type="password" defaultValue="********" className="mt-1" />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-primary" /> Remember this terminal</label>
                <a href="#" className="hover:text-foreground">Forgot?</a>
              </div>
              <Button type="submit" className="w-full gradient-medical border-0 text-primary-foreground">
                Enter Command Center <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" className="w-full">
                <Fingerprint className="mr-2 h-4 w-4" /> Sign in with Aadhaar
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              Not enrolled? <a href="#" className="text-primary hover:underline">Request onboarding</a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
