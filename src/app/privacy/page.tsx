import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

export default function PrivacyPolicyPage() {
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
          <ShieldCheck className="h-4 w-4" />
          <span>DATA INTEGRITY</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          PRIVACY PROTOCOLS
        </h1>
        <p className="mt-2 text-xs font-mono text-ghost-fog">
          Last Updated: 2026 • Governed by {APP_CONFIG.owner.name}
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-ghost-ash text-xs sm:text-sm leading-relaxed space-y-6 font-sans">
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-white">1. ZERO TELEMETRY COMMODIFICATION</h2>
          <p>
            {APP_CONFIG.name} is architected on privacy-preserving principles. We do not sell, rent, monetize, or broker user identification, reading logs, or gaming preferences to any third-party advertising networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-white">2. AUTHENTICATION & DATA RETENTION</h2>
          <p>
            When registering an account in the abyss, we collect your display name, username, email address, and an encrypted bcrypt cryptographic hash of your chosen password. Plaintext passwords are never received or stored on disk.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-white">3. HTTP-ONLY COOKIE SESSIONS</h2>
          <p>
            We utilize secure, HttpOnly, SameSite JSON Web Token cookies strictly for maintaining authenticated session identity. We do not use third-party tracking cookies or behavioral fingerprinting scripts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-white">4. USER RIGHTS & ACCOUNT SEVERANCE</h2>
          <p>
            Registered wanderers maintain total ownership over their reviews and essays. You may edit, unpublish, or request complete account erasure at any time via the User Dashboard or by contacting the creator at <Link href="/contact" className="text-blood underline">Contact Portal</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
