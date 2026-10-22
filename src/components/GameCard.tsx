"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Bookmark, ShieldCheck, Monitor, Smartphone, Gamepad } from "lucide-react";

export interface GameCardData {
  id: string;
  slug: string;
  title: string;
  tagline?: string | null;
  shortDescription: string;
  coverImage: string;
  genre: string;
  platforms: string;
  rating: number;
  ratingCount: number;
  releaseDate: string | Date;
  isUpcoming?: boolean;
  price?: number | null;
  isFreeToPlay?: boolean;
  isSaved?: boolean;
}

export function GameCard({
  game,
  onSaveToggle,
}: {
  game: GameCardData;
  onSaveToggle?: (id: string, saved: boolean) => void;
}) {
  const [isSaved, setIsSaved] = useState(game.isSaved || false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/games/${game.slug}/save`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.saved);
        if (onSaveToggle) onSaveToggle(game.id, data.saved);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Determine platform icon types
  const hasPc = game.platforms.toLowerCase().includes("pc") || game.platforms.toLowerCase().includes("windows");
  const hasMobile = game.platforms.toLowerCase().includes("android") || game.platforms.toLowerCase().includes("ios");
  const hasConsole = game.platforms.toLowerCase().includes("ps") || game.platforms.toLowerCase().includes("xbox") || game.platforms.toLowerCase().includes("switch");

  return (
    <div className="group relative rounded-xl border border-abyss-700/80 bg-abyss-900/90 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-blood/60 hover:shadow-[0_10px_35px_rgba(255,28,47,0.3)] flex flex-col h-full">
      {/* Scanline overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 scanlines transition-opacity duration-300" />

      {/* Red accent line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blood to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      {/* Cover Image Container */}
      <Link href={`/games/${game.slug}`} className="relative block h-56 sm:h-64 w-full overflow-hidden bg-abyss-950">
        <img
          src={game.coverImage}
          alt={game.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dark Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-abyss-900/30 to-transparent" />

        {/* Rating Badge */}
        {game.rating > 0 && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded bg-obsidian/85 px-2 py-1 border border-blood/40 backdrop-blur-md">
            <Star className="h-3.5 w-3.5 text-blood fill-blood" />
            <span className="font-mono text-xs font-bold text-ghost-white">{game.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Upcoming Status Pill */}
        {game.isUpcoming && (
          <div className="absolute top-3 left-3 z-10 rounded bg-blood-dark/90 px-2.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase text-white border border-blood">
            UPCOMING
          </div>
        )}

        {/* Save/Favorite Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          aria-label={isSaved ? "Remove from saved games" : "Save game to library"}
          className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
            isSaved
              ? "border-blood bg-blood text-white shadow-[0_0_15px_#ff1c2f]"
              : "border-abyss-700 bg-obsidian/75 text-ghost-ash hover:border-blood hover:text-white"
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`} />
        </button>

        {/* Genre Tag on image bottom */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="rounded bg-abyss-950/80 px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase text-blood border border-blood/20">
            {game.genre}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <Link href={`/games/${game.slug}`}>
            <h3 className="font-display text-base font-bold text-ghost-white group-hover:text-blood transition-colors line-clamp-1">
              {game.title}
            </h3>
          </Link>

          {game.tagline && (
            <p className="mt-1 font-mono text-[11px] text-ghost-fog line-clamp-1 italic">
              &quot;{game.tagline}&quot;
            </p>
          )}

          <p className="mt-2 text-xs text-ghost-ash line-clamp-2 leading-relaxed">
            {game.shortDescription}
          </p>
        </div>

        {/* Card Footer: Platforms & Verified Link Indicator */}
        <div className="mt-4 pt-3 border-t border-abyss-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-ghost-fog">
            {hasPc && <span title="PC"><Monitor className="h-3.5 w-3.5 hover:text-white" /></span>}
            {hasMobile && <span title="Mobile"><Smartphone className="h-3.5 w-3.5 hover:text-white" /></span>}
            {hasConsole && <span title="Console"><Gamepad className="h-3.5 w-3.5 hover:text-white" /></span>}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-toxic">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified Sources</span>
          </div>
        </div>
      </div>
    </div>
  );
}
