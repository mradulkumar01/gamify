import React from "react";
import Link from "next/link";
import { Skull, AlertTriangle, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

export default function CommunityGuidelinesPage() {
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
          <Skull className="h-4 w-4" />
          <span>SANCTUARY OF RESPECT</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          COMMUNITY GUIDELINES
        </h1>
        <p className="mt-2 text-xs font-mono text-ghost-fog">
          Standards for wanderers, essayists, and critics in the abyss
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-ghost-ash leading-relaxed">
        <div className="rounded-xl border border-blood/30 bg-abyss-900/60 p-6 space-y-2">
          <div className="flex items-center gap-2 text-blood font-bold font-display text-base">
            <EyeOff className="h-5 w-5" />
            <span>1. MANDATORY SPOILER ETIQUETTE</span>
          </div>
          <p>
            Horror storytelling depends entirely on psychological revelation. When writing reviews or character analysis containing major late-game twists, deaths, or narrative climaxes, you MUST mark the submission with the &quot;Contains Spoilers&quot; flag so fellow readers can choose when to uncover the truth.
          </p>
        </div>

        <div className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-6 space-y-2">
          <div className="flex items-center gap-2 text-toxic font-bold font-display text-base">
            <ShieldCheck className="h-5 w-5" />
            <span>2. AUTHENTIC CRITIQUES & HONEST RATINGS</span>
          </div>
          <p>
            Review bombing, automated rating scripts, and fake promotional praise are strictly forbidden. Critique horror games honestly based on atmosphere, tension, audio craft, gameplay pacing, and technical performance.
          </p>
        </div>

        <div className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-6 space-y-2">
          <div className="flex items-center gap-2 text-cold font-bold font-display text-base">
            <AlertTriangle className="h-5 w-5" />
            <span>3. ZERO HARASSMENT & HATE CONDUCT</span>
          </div>
          <p>
            The abyss welcomes all genuine gaming enthusiasts. Hostility, discrimination, personal doxxing, and harassment directed at other users, developers, or voice actors will result in immediate permanent expulsion.
          </p>
        </div>
      </div>
    </div>
  );
}
