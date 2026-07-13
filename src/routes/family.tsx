import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Activity, Heart, Search, Upload, Phone, Shield, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/family")({
  head: () => ({ meta: [{ title: "Family Reunification Center — HosLink AI" }] }),
  component: FamilyPage,
});

type Match = { name: string; age: number; hospital: string; status: string; confidence: number; };

function FamilyPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Match[] | null>(null);

  const search = () => {
    setResults([
      { name: "Rajesh Kumar", age: 42, hospital: "AIIMS New Delhi", status: "Admitted · ICU 4", confidence: 96 },
      { name: "Rajesh K.", age: 40, hospital: "Safdarjung Hospital", status: "Under observation", confidence: 71 },
      { name: "Ramesh Kumar", age: 45, hospital: "Dr. RML Hospital", status: "Discharged", confidence: 58 },
    ]);
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, oklch(0.97 0.02 200), oklch(0.95 0.03 180))" }}>
      {/* calming top bar */}
      <header className="border-b border-border/40 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-white grid place-items-center shadow">
              <Heart className="h-5 w-5" style={{ color: "oklch(0.55 0.18 250)" }} />
            </div>
            <div>
              <div className="font-semibold" style={{ color: "oklch(0.25 0.05 250)" }}>Family Reunification Center</div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: "oklch(0.5 0.03 250)" }}>Powered by HosLink AI</div>
            </div>
          </Link>
          <a href="tel:112" className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium shadow" style={{ color: "oklch(0.6 0.24 25)" }}>
            <Phone className="h-4 w-4" /> 112 · Emergency Helpline
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs shadow-sm" style={{ color: "oklch(0.35 0.05 250)" }}>
            <Shield className="h-3 w-3" /> Verified · Privacy-first · Multilingual
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl" style={{ color: "oklch(0.22 0.05 250)" }}>
            We're here to help you find your loved one.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base" style={{ color: "oklch(0.4 0.03 250)" }}>
            Search across every hospital connected to the HosLink network. Our team will contact you as soon as we have news.
          </p>
        </motion.div>

        <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-white p-5 shadow-xl">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <Input placeholder="Name, age, or last known location…" value={q} onChange={(e) => setQ(e.target.value)}
              className="h-12 text-base" />
            <Button onClick={search} className="h-12 gradient-medical border-0 text-primary-foreground">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs" style={{ color: "oklch(0.5 0.03 250)" }}>
            <span>Or upload a recent photo — AI will assist matching:</span>
            <button className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 hover:bg-secondary">
              <Upload className="h-3 w-3" /> Upload photo
            </button>
            <Badge variant="outline">🇮🇳 EN · हिंदी · தமிழ் · తెలుగు · मराठी</Badge>
          </div>
        </div>

        {results && (
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            <div className="text-sm" style={{ color: "oklch(0.4 0.03 250)" }}>{results.length} possible matches</div>
            {results.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <div className="grid h-12 w-12 place-items-center rounded-full text-white font-semibold" style={{ background: "oklch(0.55 0.18 250)" }}>
                  {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{m.name}</div>
                    <Badge variant="outline">Age ~{m.age}</Badge>
                  </div>
                  <div className="text-sm" style={{ color: "oklch(0.4 0.03 250)" }}>
                    <MapPin className="mr-1 inline h-3 w-3" /> {m.hospital} · <span className="text-success">{m.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs" style={{ color: "oklch(0.5 0.03 250)" }}>Match</div>
                  <div className="text-lg font-bold" style={{ color: "oklch(0.55 0.18 250)" }}>{m.confidence}%</div>
                </div>
                <Button variant="outline" className="shrink-0">View <ArrowRight className="ml-1 h-4 w-4" /></Button>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
          {[
            { i: <CheckCircle2 />, t: "Verified hospital updates", d: "Every status comes directly from the treating hospital." },
            { i: <Shield />, t: "Your privacy is protected", d: "We share only what's needed to reunite you. DPDP compliant." },
            { i: <Phone />, t: "Human help, 24/7", d: "Trained officers reach out within minutes of a strong match." },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl bg-white/70 p-4 shadow-sm">
              <div className="h-9 w-9 rounded-lg grid place-items-center text-white" style={{ background: "oklch(0.55 0.18 250)" }}>{c.i}</div>
              <div className="mt-2 font-semibold">{c.t}</div>
              <div className="text-sm" style={{ color: "oklch(0.4 0.03 250)" }}>{c.d}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-2 text-sm font-semibold">Recent notifications</div>
          <ul className="divide-y divide-border">
            {[
              { t: "10:14 AM", e: "Match confirmed — Rajesh Kumar admitted to AIIMS ICU 4" },
              { t: "09:52 AM", e: "Family Officer Anjali will call you within 5 minutes" },
              { t: "09:28 AM", e: "Search enquiry received · Ref FRC-88421" },
            ].map((x, i) => (
              <li key={i} className="flex items-center justify-between py-2 text-sm">
                <span>{x.e}</span>
                <span className="text-xs text-muted-foreground">{x.t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 text-center text-xs" style={{ color: "oklch(0.5 0.03 250)" }}>
          <Activity className="mx-auto mb-2 h-4 w-4" style={{ color: "oklch(0.55 0.18 250)" }} />
          HosLink AI · Family Reunification Center · Operated under NDMA guidelines
        </div>
      </main>
    </div>
  );
}
