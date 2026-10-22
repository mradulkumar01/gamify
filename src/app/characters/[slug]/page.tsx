import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Skull,
  ShieldAlert,
  Sword,
  Sparkles,
  ArrowLeft,
  Calendar,
  Gamepad2,
  BookOpen,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function CharacterDetailPage({ params }: { params: { slug: string } }) {
  const char = await prisma.gameCharacter.findUnique({
    where: { slug: params.slug },
    include: {
      game: {
        select: {
          id: true,
          slug: true,
          title: true,
          coverImage: true,
          genre: true,
        },
      },
    },
  });

  if (!char) {
    notFound();
  }

  // Related characters from same or other games
  const relatedCharacters = await prisma.gameCharacter.findMany({
    where: { id: { not: char.id } },
    take: 3,
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/characters"
          className="inline-flex items-center gap-2 font-mono text-xs text-ghost-fog hover:text-blood transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>ROSTER COMPENDIUM</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Portrait & Stats Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative rounded-2xl border border-blood/40 bg-abyss-900 overflow-hidden shadow-[0_0_35px_rgba(255,28,47,0.25)]">
            <div className="aspect-[3/4] w-full overflow-hidden bg-abyss-950">
              <img
                src={char.portraitUrl}
                alt={char.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-5 space-y-2">
              <span className="rounded bg-blood/20 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-blood border border-blood/30">
                {char.role}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-ghost-white">
                {char.name}
              </h1>
              <p className="font-mono text-xs text-blood">{char.gameTitle}</p>
            </div>
          </div>

          {/* Quick Lore Meta */}
          <div className="rounded-xl border border-abyss-700 bg-abyss-900/80 p-5 space-y-3 font-mono text-xs">
            <h3 className="font-display text-sm font-bold text-ghost-white pb-2 border-b border-abyss-800">
              ENTITY DOSSIER
            </h3>

            {char.species && (
              <div className="flex justify-between">
                <span className="text-ghost-fog">SPECIES:</span>
                <span className="text-ghost-white">{char.species}</span>
              </div>
            )}

            {char.characterClass && (
              <div className="flex justify-between">
                <span className="text-ghost-fog">ARCHETYPE:</span>
                <span className="text-ghost-white">{char.characterClass}</span>
              </div>
            )}

            {char.firstAppearance && (
              <div className="flex justify-between">
                <span className="text-ghost-fog">FIRST SEEN:</span>
                <span className="text-ghost-white">{char.firstAppearance}</span>
              </div>
            )}

            {char.sources && (
              <div className="flex justify-between pt-2 border-t border-abyss-800 text-[11px]">
                <span className="text-ghost-fog">LORE SOURCE:</span>
                <span className="text-toxic">{char.sources}</span>
              </div>
            )}
          </div>

          {/* Associated Game Card */}
          {char.game && (
            <div className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-4">
              <p className="font-mono text-[10px] uppercase text-ghost-fog mb-2">ORIGINATING REALM</p>
              <Link
                href={`/games/${char.game.slug}`}
                className="flex items-center gap-3 group"
              >
                <img
                  src={char.game.coverImage}
                  alt={char.game.title}
                  className="h-14 w-12 rounded object-cover"
                />
                <div>
                  <h4 className="font-display text-sm font-bold text-ghost-white group-hover:text-blood transition-colors">
                    {char.game.title}
                  </h4>
                  <span className="font-mono text-[10px] text-blood">{char.game.genre}</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Full Lore, Abilities, Psychological Breakdown, Trivia */}
        <div className="lg:col-span-7 space-y-8">
          {/* Backstory */}
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-ghost-white border-l-2 border-blood pl-3">
              BIOGRAPHICAL LORE & ORIGINS
            </h2>
            <p className="text-sm text-ghost-ash leading-relaxed whitespace-pre-line">
              {char.backstory}
            </p>
          </section>

          {/* Arsenal & Supernatural Powers */}
          {(char.weapons || char.abilities) && (
            <section className="rounded-xl border border-abyss-700 bg-abyss-900/80 p-5 space-y-4">
              <h3 className="font-display text-base font-bold text-ghost-white flex items-center gap-2">
                <Sword className="h-4 w-4 text-blood" />
                ARSENAL & ANOMALOUS CAPABILITIES
              </h3>

              {char.weapons && (
                <div>
                  <span className="font-mono text-[11px] uppercase text-ghost-fog block mb-1">
                    PRIMARY WEAPONS & TACTICAL TOOLS:
                  </span>
                  <p className="text-xs text-ghost-ash">{char.weapons}</p>
                </div>
              )}

              {char.abilities && (
                <div className="pt-2 border-t border-abyss-800">
                  <span className="font-mono text-[11px] uppercase text-ghost-fog block mb-1">
                    SUPERNATURAL / PHYSIOLOGICAL ABILITIES:
                  </span>
                  <p className="text-xs text-ghost-ash">{char.abilities}</p>
                </div>
              )}
            </section>
          )}

          {/* Personality and Psychological Profile */}
          {char.personality && (
            <section className="space-y-3">
              <h3 className="font-display text-base font-bold text-ghost-white border-l-2 border-blood pl-3">
                PSYCHOLOGICAL DISSECTION & DISPOSITION
              </h3>
              <p className="text-xs sm:text-sm text-ghost-ash leading-relaxed">
                {char.personality}
              </p>
            </section>
          )}

          {/* Significant Key Events */}
          {char.keyEvents && (
            <section className="rounded-xl border border-blood/20 bg-abyss-950 p-5 space-y-3">
              <h3 className="font-display text-base font-bold text-blood flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                CANONICALLY SIGNIFICANT EVENTS
              </h3>
              <p className="text-xs text-ghost-ash leading-relaxed">
                {char.keyEvents}
              </p>
            </section>
          )}

          {/* Trivia & Development Notes */}
          {char.trivia && (
            <section className="space-y-3 pt-4 border-t border-abyss-800">
              <h3 className="font-display text-sm font-bold text-ghost-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-toxic" />
                DESIGN NOTES & TRIVIA
              </h3>
              <p className="text-xs font-mono text-ghost-fog leading-relaxed">
                {char.trivia}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
