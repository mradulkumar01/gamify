import React from "react";
import Link from "next/link";
import { Skull, Github, Linkedin, Shield, Terminal, ArrowUpRight } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="relative border-t border-abyss-700/80 bg-obsidian pt-16 pb-12 overflow-hidden">
      {/* Background Red Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-blood/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Creator Bio Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded border border-blood/40 bg-abyss-900 shadow-[0_0_15px_rgba(255,28,47,0.25)]">
                <Skull className="h-5 w-5 text-blood" />
              </div>
              <span className="font-display text-lg font-black tracking-wider text-ghost-white">
                {APP_CONFIG.name}
              </span>
            </Link>

            <p className="font-mono text-xs text-blood tracking-wider uppercase">
              &quot;{APP_CONFIG.tagline}&quot;
            </p>

            <p className="text-xs text-ghost-fog leading-relaxed max-w-md">
              A bespoke horror gaming universe designed to document terrifying worlds, analyze deep lore,
              curate verified download storefronts, and elevate independent and studio horror masterpieces.
            </p>

            {/* Creator Attribution Card */}
            <div className="mt-4 rounded-lg border border-blood/30 bg-abyss-900/60 p-3.5 backdrop-blur-sm max-w-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-blood font-bold">
                    ARCHITECT & FOUNDER
                  </p>
                  <p className="text-sm font-bold text-ghost-white">{APP_CONFIG.owner.name}</p>
                  <p className="text-[11px] text-ghost-fog">{APP_CONFIG.owner.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={APP_CONFIG.owner.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded border border-abyss-700 bg-abyss-800 text-ghost-ash hover:border-blood hover:text-white transition-colors"
                    title="Mradul Kumar GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={APP_CONFIG.owner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded border border-abyss-700 bg-abyss-800 text-ghost-ash hover:border-blood hover:text-white transition-colors"
                    title="Mradul Kumar LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <Link
                    href="/about"
                    className="flex h-8 w-8 items-center justify-center rounded border border-abyss-700 bg-abyss-800 text-blood hover:border-blood hover:text-white transition-colors"
                    title="Creator Profile"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Discovery Navigation */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ghost-ash mb-4 border-l-2 border-blood pl-2">
              DISCOVERY
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/games" className="text-ghost-fog hover:text-blood transition-colors">
                  Game Explorer
                </Link>
              </li>
              <li>
                <Link href="/platforms" className="text-ghost-fog hover:text-blood transition-colors">
                  Platforms & Systems
                </Link>
              </li>
              <li>
                <Link href="/characters" className="text-ghost-fog hover:text-blood transition-colors">
                  Character Lore Archive
                </Link>
              </li>
              <li>
                <Link href="/upcoming" className="text-ghost-fog hover:text-blood transition-colors">
                  Upcoming Releases
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-ghost-fog hover:text-blood transition-colors">
                  Community Ratings
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Lore */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ghost-ash mb-4 border-l-2 border-blood pl-2">
              LORE & EDITORIAL
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/news" className="text-ghost-fog hover:text-blood transition-colors">
                  Gaming News Wire
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-ghost-fog hover:text-blood transition-colors">
                  Community Blogs
                </Link>
              </li>
              <li>
                <Link href="/blogs/editor" className="text-ghost-fog hover:text-toxic transition-colors">
                  Writing Studio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ghost-fog hover:text-blood transition-colors">
                  About the Creator
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ghost-fog hover:text-blood transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Security, Preservation & Legal */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-ghost-ash mb-4 border-l-2 border-blood pl-2">
              STANDARDS & LEGAL
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/privacy" className="text-ghost-fog hover:text-blood transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-ghost-fog hover:text-blood transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-ghost-fog hover:text-blood transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li className="pt-2">
                <span className="flex items-center gap-1.5 text-[11px] text-toxic">
                  <Shield className="h-3.5 w-3.5" />
                  Verified Storefronts Only
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-[11px] text-ghost-fog">
                  <Terminal className="h-3.5 w-3.5 text-blood" />
                  Build v1.0.0 Production
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-abyss-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-ghost-fog gap-4">
          <p>
            © {new Date().getFullYear()} {APP_CONFIG.name}. Conceived, engineered and designed by{" "}
            <span className="text-ghost-ash font-semibold">{APP_CONFIG.owner.name}</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-toxic animate-pulse" />
              ABYSS ARCHIVE OPERATIONAL
            </span>
            <span>NO PIRACY • LEGITIMATE DIGITAL PRESERVATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
