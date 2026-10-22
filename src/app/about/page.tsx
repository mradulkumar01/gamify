import React from "react";
import Link from "next/link";
import { Skull, Github, Linkedin, ShieldCheck, Terminal, Compass, BookOpen, Layers } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

export const metadata = {
  title: `About the Creator — ${APP_CONFIG.owner.name}`,
  description: `Learn about ${APP_CONFIG.owner.name}, Founder, Creator & Developer of ${APP_CONFIG.name}.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-abyss-700/80 pb-6 mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-blood/40 bg-abyss-900/80 px-4 py-1.5 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(255,28,47,0.2)]">
          <Skull className="h-3.5 w-3.5 text-blood" />
          <span className="font-mono text-xs uppercase tracking-widest text-ghost-ash">
            CREATOR ARCHIVE & PHILOSOPHY
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-ghost-white">
          THE ARCHITECT BEHIND THE ABYSS
        </h1>
        <p className="mt-3 text-sm text-ghost-ash font-mono">
          Forged by {APP_CONFIG.owner.name} to challenge sterile gaming catalogs and resurrect atmospheric horror storytelling.
        </p>
      </div>

      {/* Creator Profile Showcase Card */}
      <div className="rounded-2xl border border-blood/40 bg-gradient-to-br from-abyss-900 via-abyss-950 to-obsidian p-8 sm:p-12 mb-12 shadow-[0_0_45px_rgba(255,28,47,0.2)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="relative h-44 w-44 rounded-full border-4 border-blood/60 p-1 shadow-[0_0_30px_#ff1c2f] overflow-hidden mb-4 bg-abyss-950">
              <img
                src={APP_CONFIG.owner.avatarUrl}
                alt={APP_CONFIG.owner.name}
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <h2 className="font-display text-2xl font-black text-ghost-white">
              {APP_CONFIG.owner.name}
            </h2>
            <p className="font-mono text-xs text-blood font-semibold uppercase mt-0.5">
              {APP_CONFIG.owner.role}
            </p>
            <p className="font-mono text-[11px] text-ghost-fog mt-1">
              {APP_CONFIG.owner.platform}
            </p>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={APP_CONFIG.owner.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-abyss-700 bg-abyss-800 px-3 py-1.5 font-mono text-xs text-ghost-ash hover:border-blood hover:text-white transition-all shadow-md"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href={APP_CONFIG.owner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-abyss-700 bg-abyss-800 px-3 py-1.5 font-mono text-xs text-ghost-ash hover:border-blood hover:text-white transition-all shadow-md"
              >
                <Linkedin className="h-4 w-4 text-cold" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-ghost-ash leading-relaxed">
            <h3 className="font-display text-xl font-bold text-ghost-white border-l-2 border-blood pl-3">
              MISSION MANIFESTO
            </h3>
            <p>
              &quot;Interactive horror is one of humanity&apos;s most vital storytelling art forms. It demands vulnerability from the player. It isolates you in pitch-black corridors, strains your hearing against distant footsteps, and forces you to confront suppressed dread.&quot;
            </p>
            <p>
              Yet modern digital storefronts and game aggregators treat horror titles as mere commodities—buried beneath brightly colored battle passes and algorithmically generated advertisements.
            </p>
            <p>
              <strong className="text-white">AFTERDARK — THE GAMING ABYSS</strong> was engineered by {APP_CONFIG.owner.name} to change that reality. Every aspect of this platform is designed as an extension of the games it honors: from atmospheric low-frequency drone synthesizers and bespoke scanline typography to verified legitimate publisher links that protect gamers and creators alike.
            </p>
          </div>
        </div>
      </div>

      {/* Core Platform Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-xl border border-abyss-700 bg-abyss-900/70 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-toxic/40 bg-toxic/10 text-toxic">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-display text-base font-bold text-ghost-white">
            LEGITIMATE PRESERVATION
          </h3>
          <p className="text-xs text-ghost-fog leading-relaxed">
            Zero cracked executables, zero unauthorized APKs, and zero spyware. We point gamers strictly to authentic developer websites, Steam, GOG, Epic, PlayStation, and verified mobile stores.
          </p>
        </div>

        <div className="rounded-xl border border-abyss-700 bg-abyss-900/70 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blood/40 bg-blood/10 text-blood">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="font-display text-base font-bold text-ghost-white">
            DEEP LORE & DISSECTION
          </h3>
          <p className="text-xs text-ghost-fog leading-relaxed">
            From the symbolism of Masahiro Ito&apos;s creature designs to the Northlight lighting tricks of Remedy, we celebrate the artistry and engineering behind interactive fear.
          </p>
        </div>

        <div className="rounded-xl border border-abyss-700 bg-abyss-900/70 p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cold/40 bg-cold/10 text-cold">
            <Terminal className="h-5 w-5" />
          </div>
          <h3 className="font-display text-base font-bold text-ghost-white">
            PRODUCTION ARCHITECTURE
          </h3>
          <p className="text-xs text-ghost-fog leading-relaxed">
            Engineered with Next.js App Router, TypeScript, SQLite/PostgreSQL Prisma ORM, and Web Audio API synthesis. Highly scalable, secure, and responsive.
          </p>
        </div>
      </div>

      {/* Accuracy & Independence Disclosure */}
      <div className="rounded-xl border border-abyss-800 bg-abyss-950 p-6 text-xs text-ghost-fog leading-relaxed font-mono">
        <h4 className="font-bold text-ghost-ash uppercase mb-2">
          INDEPENDENT ARCHIVE ATTRIBUTION DISCLOSURE
        </h4>
        <p>
          AFTERDARK is an independent game discovery and community editorial platform conceived and developed by {APP_CONFIG.owner.name}. AFTERDARK is not officially affiliated with, endorsed by, or sponsored by Konami, Remedy Entertainment, Capcom, Electronic Arts, SEGA, or any other third-party publisher. All game titles, trademarks, and registered artwork belong entirely to their respective corporate copyright holders and are cited for critical editorial discovery under fair preservation conventions.
        </p>
      </div>
    </div>
  );
}
