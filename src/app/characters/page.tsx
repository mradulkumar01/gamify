import React from "react";
import { UserCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CharacterCard } from "@/components/CharacterCard";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    role?: string;
    game?: string;
    search?: string;
  };
}

export default async function CharactersPage({ searchParams }: PageProps) {
  const role = searchParams.role || "all";
  const search = searchParams.search || "";

  const where: {
    role?: string;
    OR?: Array<{ name: { contains: string } } | { backstory: { contains: string } }>;
  } = {};

  if (role && role !== "all") {
    where.role = role;
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { backstory: { contains: search } },
    ];
  }

  const characters = await prisma.gameCharacter.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border-b border-abyss-700/80 pb-6 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
          <UserCheck className="h-4 w-4" />
          <span>ROSTER COMPENDIUM</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          GAME CHARACTERS & LORE
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono max-w-2xl">
          Deep psychological dissections of iconic survival horror protagonists, eldritch deities, bioweapon predators, and tragic victims.
        </p>
      </div>

      {/* Role Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
        <span className="text-ghost-fog mr-2">ROLE CLASSIFICATION:</span>
        {["all", "Protagonist", "Antagonist", "Survivor", "Apex Predator"].map((r) => (
          <a
            key={r}
            href={r === "all" ? "/characters" : `/characters?role=${encodeURIComponent(r)}`}
            className={`rounded px-3 py-1.5 border transition-all ${
              role === r || (r === "all" && role === "all")
                ? "border-blood bg-blood text-white font-bold"
                : "border-abyss-700 bg-abyss-900 text-ghost-ash hover:border-blood hover:text-white"
            }`}
          >
            {r === "all" ? "ALL ROLES" : r.toUpperCase()}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </div>
  );
}
