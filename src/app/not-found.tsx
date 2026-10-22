import React from "react";
import Link from "next/link";
import { Skull, ArrowLeft, Home, Compass } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="relative z-10 max-w-lg mx-auto">
        {/* Emblem Skull */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-blood/50 bg-abyss-900 shadow-[0_0_35px_rgba(255,28,47,0.4)] mx-auto mb-6">
          <Skull className="h-10 w-10 text-blood animate-pulse" />
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood font-bold">
          ANOMALY 404 — ROUTE EXCISED
        </p>

        <h1 className="font-display text-4xl sm:text-5xl font-black text-ghost-white mt-2 mb-4">
          THE ABYSS CONSUMED THIS PATH.
        </h1>

        <p className="text-xs sm:text-sm text-ghost-ash leading-relaxed mb-8 font-mono">
          You have wandered beyond the boundaries of authenticated horror archives. The coordinates you entered do not exist or have decayed into the void.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <Link
            href="/"
            className="flex items-center gap-2 rounded border border-blood bg-blood px-6 py-3 font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,28,47,0.4)] hover:bg-blood-crimson transition-all"
          >
            <Home className="h-4 w-4" />
            <span>RETURN TO SANCTUARY</span>
          </Link>

          <Link
            href="/games"
            className="flex items-center gap-2 rounded border border-abyss-700 bg-abyss-900 px-6 py-3 font-semibold uppercase tracking-wider text-ghost-ash hover:border-blood hover:text-white transition-all"
          >
            <Compass className="h-4 w-4 text-blood" />
            <span>EXPLORE ARCHIVES</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
