"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical abyss error intercepted:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blood/50 bg-blood/10 mx-auto text-blood shadow-[0_0_25px_rgba(255,28,47,0.3)]">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-blood font-bold">
            SYSTEM CORRUPTION INTERCEPTED
          </span>
          <h1 className="font-display text-3xl font-black text-white mt-1">
            ANOMALOUS TRANSMISSION FAILURE
          </h1>
          <p className="mt-2 text-xs font-mono text-ghost-fog">
            An unforeseen disturbance disrupted the archive pipeline. No permanent data corruption occurred.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 font-mono text-xs">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 rounded border border-blood bg-blood px-5 py-2.5 font-bold uppercase text-white hover:bg-blood-crimson transition-all shadow-[0_0_15px_rgba(255,28,47,0.4)]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>REATTEMPT TRANSMISSION</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded border border-abyss-700 bg-abyss-900 px-5 py-2.5 font-semibold text-ghost-ash hover:border-blood hover:text-white"
          >
            <Home className="h-3.5 w-3.5" />
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
