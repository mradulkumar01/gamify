"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";

export interface CharacterCardData {
  id: string;
  slug: string;
  name: string;
  portraitUrl: string;
  gameTitle: string;
  role: string;
  characterClass?: string | null;
  species?: string | null;
  abilities?: string | null;
  weapons?: string | null;
  backstory: string;
  hasSpoilers: boolean;
}

export function CharacterCard({ character }: { character: CharacterCardData }) {
  const [revealSpoiler, setRevealSpoiler] = useState(false);

  return (
    <div className="group relative rounded-xl border border-abyss-700/80 bg-abyss-900 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blood/60 flex flex-col h-full">
      {/* Top Red Bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blood to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      {/* Portrait Link */}
      <Link href={`/characters/${character.slug}`} className="relative block h-64 w-full overflow-hidden bg-abyss-950">
        <img
          src={character.portraitUrl}
          alt={character.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-transparent to-transparent" />

        {/* Role Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded bg-obsidian/85 px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase text-blood border border-blood/30 backdrop-blur-md">
            {character.role}
          </span>
        </div>

        {/* Spoiler Notice if applicable */}
        {character.hasSpoilers && (
          <div className="absolute top-3 right-3 z-10">
            <span className="flex items-center gap-1 rounded bg-blood-dark/90 px-2 py-0.5 text-[9px] font-mono uppercase text-white border border-blood">
              <ShieldAlert className="h-3 w-3" /> SPOILERS
            </span>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <Link href={`/characters/${character.slug}`}>
            <h3 className="font-display text-lg font-bold text-ghost-white group-hover:text-blood transition-colors">
              {character.name}
            </h3>
          </Link>
          <p className="font-mono text-xs text-blood">{character.gameTitle}</p>

          {character.characterClass && (
            <p className="mt-1 font-mono text-[11px] text-ghost-fog">
              Class: {character.characterClass}
            </p>
          )}

          {/* Backstory snippet with optional spoiler masking */}
          <div className="mt-3 relative">
            {character.hasSpoilers && !revealSpoiler ? (
              <div className="rounded border border-abyss-800 bg-abyss-950 p-2.5 text-center">
                <p className="text-[11px] text-ghost-fog mb-2">Lore contains narrative spoilers</p>
                <button
                  type="button"
                  onClick={() => setRevealSpoiler(true)}
                  className="inline-flex items-center gap-1.5 rounded border border-abyss-700 bg-abyss-800 px-2.5 py-1 text-[10px] font-mono text-blood hover:border-blood"
                >
                  <Eye className="h-3 w-3" />
                  <span>REVEAL LORE</span>
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-ghost-ash line-clamp-3 leading-relaxed">
                  {character.backstory}
                </p>
                {character.hasSpoilers && (
                  <button
                    type="button"
                    onClick={() => setRevealSpoiler(false)}
                    className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-ghost-fog hover:text-white"
                  >
                    <EyeOff className="h-3 w-3" /> Hide Spoilers
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Weapons / Abilities snippet */}
        {(character.weapons || character.abilities) && (
          <div className="mt-4 pt-3 border-t border-abyss-800 text-[11px] font-mono text-ghost-fog">
            <span className="text-ghost-ash font-semibold">ARSENAL: </span>
            <span className="truncate">{character.weapons || character.abilities}</span>
          </div>
        )}
      </div>
    </div>
  );
}
