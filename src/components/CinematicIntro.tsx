"use client";

import React, { useEffect, useState } from "react";
import { Skull, FastForward } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

interface CinematicIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export function CinematicIntro({ onComplete, forceShow = false }: CinematicIntroProps) {
  const [stage, setStage] = useState<"hidden" | "fog" | "glow" | "glitch" | "tagline" | "ready">("hidden");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // If not forced, check if already dismissed in this session
    if (!forceShow) {
      const seen = sessionStorage.getItem("afterdark_cinematic_seen");
      if (seen === "true") {
        setDismissed(true);
        if (onComplete) onComplete();
        return;
      }
    }

    // Progression timeline
    setStage("fog");

    const t1 = setTimeout(() => setStage("glow"), 800);
    const t2 = setTimeout(() => setStage("glitch"), 1800);
    const t3 = setTimeout(() => setStage("tagline"), 2900);
    const t4 = setTimeout(() => setStage("ready"), 4000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [forceShow]);

  const handleDismiss = () => {
    sessionStorage.setItem("afterdark_cinematic_seen", "true");
    setDismissed(true);
    if (onComplete) onComplete();
  };

  if (dismissed) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic Entrance"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian transition-opacity duration-1000 select-none overflow-hidden"
    >
      {/* Background Animated Fog Layer */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          stage !== "hidden" ? "opacity-35" : "opacity-0"
        } animate-mist-slow`}
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(138, 3, 15, 0.25), rgba(4, 3, 6, 0.95) 75%), url('https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80')`,
        }}
      />

      {/* Red Light Emerging from Darkness */}
      <div
        className={`pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-blood/20 blur-[130px] transition-all duration-1000 ${
          stage === "glow" || stage === "glitch" || stage === "tagline" || stage === "ready"
            ? "scale-100 opacity-80"
            : "scale-50 opacity-0"
        }`}
      />

      {/* Skip Button */}
      <button
        onClick={handleDismiss}
        className="absolute top-6 right-6 z-20 flex items-center gap-1.5 rounded-full border border-abyss-700/80 bg-abyss-900/60 px-4 py-1.5 text-xs font-mono tracking-widest text-ghost-ash backdrop-blur-md transition-all hover:border-blood hover:text-white"
        aria-label="Skip Cinematic Intro"
      >
        <span>SKIP PROLOGUE</span>
        <FastForward className="h-3.5 w-3.5 text-blood" />
      </button>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-2xl">
        {/* Emblem Skull */}
        <div
          className={`mb-6 transition-all duration-700 ${
            stage === "glitch" || stage === "tagline" || stage === "ready"
              ? "scale-100 opacity-100 animate-pulse-glow"
              : "scale-75 opacity-0"
          }`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blood/50 bg-abyss-900/90 shadow-[0_0_30px_rgba(255,28,47,0.4)] backdrop-blur-md">
            <Skull className="h-9 w-9 text-blood animate-pulse" />
          </div>
        </div>

        {/* Brand Title with Glitch Reveal */}
        <h1
          className={`font-display text-4xl sm:text-6xl font-black tracking-wider text-ghost-white transition-all duration-700 ${
            stage === "glitch" || stage === "tagline" || stage === "ready"
              ? "opacity-100 translate-y-0 glitch-title"
              : "opacity-0 translate-y-4 blur-sm"
          }`}
          data-text={APP_CONFIG.name}
        >
          {APP_CONFIG.name}
        </h1>

        {/* Tagline */}
        <p
          className={`mt-4 font-mono text-sm sm:text-base tracking-[0.3em] uppercase text-blood transition-all duration-1000 ${
            stage === "tagline" || stage === "ready"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 blur-sm"
          }`}
        >
          {APP_CONFIG.tagline}
        </p>

        {/* Enter CTA */}
        <div
          className={`mt-10 transition-all duration-500 ${
            stage === "ready" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <button
            onClick={handleDismiss}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-md border border-blood bg-gradient-to-r from-blood-dark via-blood to-blood-crimson px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(255,28,47,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(255,28,47,0.7)]"
          >
            <span className="relative z-10">ENTER THE ABYSS</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
          </button>
          <p className="mt-3 font-mono text-[11px] text-ghost-fog">Press ESC or click to descend</p>
        </div>
      </div>
    </div>
  );
}
