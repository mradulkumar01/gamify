import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Monitor, Smartphone, Gamepad2, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { GameCard } from "@/components/GameCard";

export const revalidate = 60;

const PLATFORM_MAP: Record<string, { title: string; filterKey: string; icon: React.ElementType; description: string }> = {
  pc: {
    title: "PC Gaming Abyss",
    filterKey: "PC",
    icon: Monitor,
    description: "High-fidelity Windows, macOS, and Linux horror titles with ray-tracing, keyboard-mouse support, and modding potential.",
  },
  mobile: {
    title: "Mobile & Portable Nightmares",
    filterKey: "Android",
    icon: Smartphone,
    description: "Verified horror experiences optimized for iOS (iPhone, iPad) and Android touchscreen and gamepad interfaces.",
  },
  playstation: {
    title: "PlayStation 5 & PS4 Archives",
    filterKey: "PlayStation",
    icon: Gamepad2,
    description: "Immersive console horrors taking advantage of spatial Tempest audio and DualSense tactile feedback.",
  },
  xbox: {
    title: "Xbox Series X|S Archives",
    filterKey: "Xbox",
    icon: Gamepad2,
    description: "High frame-rate 4K survival horrors and upcoming cloud-enabled interactive films.",
  },
};

export default async function PlatformDetailPage({ params }: { params: { platform: string } }) {
  const platKey = params.platform.toLowerCase();
  const meta = PLATFORM_MAP[platKey];

  if (!meta) {
    notFound();
  }

  // Fetch games matching this platform
  const games = await prisma.game.findMany({
    where: {
      platforms: { contains: meta.filterKey },
    },
    orderBy: { rating: "desc" },
  });

  const Icon = meta.icon;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          href="/platforms"
          className="inline-flex items-center gap-2 font-mono text-xs text-ghost-fog hover:text-blood transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>ALL PLATFORMS</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-abyss-700 bg-abyss-900/80 p-8 mb-10 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blood/40 bg-abyss-950 text-blood shrink-0">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-blood font-semibold">
            PLATFORM CATALOGUE
          </span>
          <h1 className="font-display text-3xl font-black text-ghost-white mt-1">{meta.title}</h1>
          <p className="mt-2 text-xs sm:text-sm text-ghost-ash max-w-2xl leading-relaxed">
            {meta.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-ghost-fog mb-6">
        <span>ARCHIVES COMPATIBLE: {games.length}</span>
        <span>SORTED BY RATING</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </div>
  );
}
