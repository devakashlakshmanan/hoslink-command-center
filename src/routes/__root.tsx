import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppProvider } from "@/lib/app-context";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center gradient-hero px-4">
      <div className="glass-strong max-w-md rounded-2xl p-10 text-center">
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl gradient-medical grid place-items-center text-primary-foreground font-black">404</div>
        <h1 className="text-2xl font-bold tracking-tight">Signal lost</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This route isn't part of the UrHealth AI grid.
        </p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-lg gradient-medical px-4 py-2 text-sm font-medium text-primary-foreground">
          Return to Base
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "root" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center gradient-hero px-4">
      <div className="glass-strong max-w-md rounded-2xl p-10 text-center">
        <h1 className="text-xl font-semibold">Command channel interrupted</h1>
        <p className="mt-2 text-sm text-muted-foreground">A transient error occurred. Retry to restore the feed.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-lg gradient-medical px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "UrHealth AI — Mass Casualty Coordination Platform" },
      { name: "description", content: "AI-powered Mass Casualty Incident (MCI) coordination platform for State EOCs, hospitals, ambulances and blood banks across India." },
      { name: "author", content: "UrHealth AI" },
      { property: "og:title", content: "UrHealth AI — Mass Casualty Coordination" },
      { property: "og:description", content: "Real-time AI coordination for hospitals, ambulances, and disaster response across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Outlet />
        <Toaster position="top-right" />
      </AppProvider>
    </QueryClientProvider>
  );
}
