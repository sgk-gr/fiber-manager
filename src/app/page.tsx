"use client";

import React, { Suspense, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const AutopsiaView = dynamic(() => import("@/components/autopsia/AutopsiaView"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
      <img src="/logo-icon.webp" alt="Fiber Flow" className="h-16 w-16 mb-4 rounded-2xl shadow-lg animate-pulse" />
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
      <p className="text-sm font-bold tracking-wider uppercase text-slate-600">
        Φόρτωση Fiber Flow...
      </p>
    </div>
  ),
});

export default function HomePage() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("ftth-theme");
    document.body.classList.add("ftth-theme");
    try {
      localStorage.setItem("km_theme_mode", "light");
    } catch {}

    return () => {
      document.documentElement.classList.remove("ftth-theme");
      document.body.classList.remove("ftth-theme");
    };
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <main className="ftth-autopsia-scope min-h-screen bg-slate-50 text-slate-900">
        <Suspense
          fallback={
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900">
              <img src="/logo-icon.webp" alt="Fiber Flow" className="h-16 w-16 mb-4 rounded-2xl shadow-lg animate-pulse" />
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
              <p className="text-sm font-bold tracking-wider uppercase text-slate-600">
                Φόρτωση Συστήματος...
              </p>
            </div>
          }
        >
          <AutopsiaView />
        </Suspense>
      </main>
    </QueryClientProvider>
  );
}
