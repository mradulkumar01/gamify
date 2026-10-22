import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-ghost-fog hover:text-blood"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>RETURN HOME</span>
        </Link>
      </div>

      <div className="border-b border-abyss-700/80 pb-6 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
          <ShieldAlert className="h-4 w-4" />
          <span>LEGAL STANDARDS</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          TERMS OF SERVICE
        </h1>
        <p className="mt-2 text-xs font-mono text-ghost-fog">
          Binding Rules of Engagement for AFTERDARK — THE GAMING ABYSS
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-ghost-ash text-xs sm:text-sm leading-relaxed space-y-6 font-sans">
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-white">1. NON-PIRACY & VERIFIED STOREFRONTS</h2>
          <p>
            {APP_CONFIG.name} enforces strict zero-piracy policies. The platform does NOT host, redistribute, mirror, or provide download mechanisms for cracked game files, unauthorized APKs, leaked pre-release builds, ROMs, or DRM bypasses. All download links direct strictly to verified publisher websites or legitimate storefronts (such as Steam, Epic Games Store, GOG, Google Play, Apple App Store, and PlayStation Store).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-white">2. TRADEMARK & FAIR USE RECOGNITION</h2>
          <p>
            Game titles, logos, screenshots, characters, and company names referenced throughout this application are trademarks or registered trademarks of their respective publisher and developer entities (e.g. Konami, Capcom, Remedy Entertainment, EA, SEGA). Their inclusion on this website constitutes critical review, educational lore archive, and legitimate commercial discovery protected under fair use conventions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-white">3. USER CONDUCT & CONTENT MODERATION</h2>
          <p>
            Users who submit community reviews, blog dissertations, or comments warrant that their submissions are original and do not violate third-party copyright, defame individuals, or inject malicious code. The administration reserves full authority to unpublish or moderate any content violating safety or authenticity standards.
          </p>
        </section>
      </div>
    </div>
  );
}
