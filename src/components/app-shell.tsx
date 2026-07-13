import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity, LayoutDashboard, ShieldAlert, Brain, Hospital, Users, Grid3x3,
  Ambulance, ArrowLeftRight, PlaySquare, BarChart3, Bell, FileText, Settings,
  Search, Bell as BellIcon, Command, Sun, Moon, ChevronsLeftRight, HeartPulse,
} from "lucide-react";
import { useApp } from "@/lib/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

const nav = [
  { to: "/command", label: "Command Center", icon: LayoutDashboard },
  { to: "/incidents", label: "Incidents", icon: ShieldAlert },
  { to: "/ai-commander", label: "AI Commander", icon: Brain },
  { to: "/hospitals", label: "Hospital Network", icon: Hospital },
  { to: "/patients", label: "Patient Tracking", icon: Users },
  { to: "/triage", label: "Triage Board", icon: Grid3x3 },
  { to: "/ambulances", label: "Ambulances", icon: Ambulance },
  { to: "/resources", label: "Resource Exchange", icon: ArrowLeftRight },
  { to: "/simulation", label: "Simulation Mode", icon: PlaySquare },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { theme, setTheme, mode, setMode } = useApp();
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen((v) => !v); }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`min-h-screen bg-background text-foreground ${mode === "simulation" ? "sim-mode" : ""}`}>
      <div className="flex min-h-screen w-full">
        {/* SIDEBAR */}
        <aside className="hidden w-[260px] shrink-0 border-r border-border/60 bg-sidebar text-sidebar-foreground lg:flex lg:flex-col">
          <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-4">
            <div className="relative h-8 w-8 rounded-lg gradient-medical grid place-items-center">
              <Activity className="h-4 w-4 text-primary-foreground" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emergency">
                <span className="absolute inset-0 rounded-full bg-emergency pulse-ring" />
              </span>
            </div>
            <div className="leading-none">
              <div className="text-sm font-bold">HosLink <span className="text-gradient-medical">AI</span></div>
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">MCI · v4.2</div>
            </div>
          </div>

          <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
            {nav.map((n) => {
              const Icon = n.icon;
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to} to={n.to}
                  className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                  <span>{n.label}</span>
                  {n.to === "/incidents" && <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-[10px]">3</Badge>}
                  {n.to === "/notifications" && <Badge variant="outline" className="ml-auto h-5 px-1.5 text-[10px]">12</Badge>}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-sidebar-border p-3">
            <div className="glass rounded-xl p-3 text-xs">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-3.5 w-3.5 text-emergency" />
                <span className="font-medium">Emergency Readiness</span>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-success">86</span>
                <span className="text-muted-foreground">/100</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[86%] rounded-full gradient-medical" />
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* TOPBAR */}
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patients, hospitals, incidents…"
                className="h-9 pl-9 pr-16"
                onFocus={() => setCmdOpen(true)}
              />
              <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border/60 bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden items-center gap-1 rounded-lg border border-border/60 p-0.5 md:flex">
                <button
                  onClick={() => setMode("production")}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${mode === "production" ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}
                >
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-success" /> Production
                </button>
                <button
                  onClick={() => setMode("simulation")}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${mode === "simulation" ? "bg-warning/20 text-warning" : "text-muted-foreground"}`}
                >
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-warning" /> Simulation
                </button>
              </div>

              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emergency">
                  <span className="absolute inset-0 rounded-full bg-emergency pulse-ring" />
                </span>
              </Button>
              <Button variant="ghost" size="icon"><ChevronsLeftRight className="h-4 w-4" /></Button>
              <div className="ml-1 flex items-center gap-2 rounded-lg border border-border/60 px-2 py-1">
                <div className="h-6 w-6 rounded-full gradient-medical text-[10px] font-bold text-primary-foreground grid place-items-center">AR</div>
                <div className="hidden text-xs md:block">
                  <div className="font-medium leading-none">Cmdr. Arora</div>
                  <div className="text-muted-foreground">State EOC · Delhi</div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Command Palette */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-24 backdrop-blur-sm"
            onClick={() => setCmdOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: -8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-lg overflow-hidden rounded-2xl"
            >
              <div className="flex items-center gap-2 border-b border-border/60 px-3">
                <Command className="h-4 w-4 text-muted-foreground" />
                <Input autoFocus placeholder="Jump to page, patient ID (HL-...), hospital, incident…"
                  className="border-0 shadow-none focus-visible:ring-0" />
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">Pages</div>
                {nav.slice(0, 8).map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link key={n.to} to={n.to} onClick={() => setCmdOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-accent">
                      <Icon className="h-4 w-4 text-muted-foreground" /> {n.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating AI Assistant */}
      <button className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full gradient-medical px-4 py-3 text-sm font-medium text-primary-foreground shadow-elevated hover:opacity-95">
        <Brain className="h-4 w-4" /> Ask HosLink AI
      </button>
    </div>
  );
}
