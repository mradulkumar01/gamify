import React from "react";
import Link from "next/link";
import { Monitor, Smartphone, Gamepad2, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function PlatformsIndexPage() {
  const [pcCount, mobileCount, psCount, xboxCount] = await Promise.all([
    prisma.game.count({ where: { platforms: { contains: "PC" } } }),
    prisma.game.count({
      where: {
        OR: [{ platforms: { contains: "Android" } }, { platforms: { contains: "iOS" } }],
      },
    }),
    prisma.game.count({ where: { platforms: { contains: "PlayStation" } } }),
    prisma.game.count({ where: { platforms: { contains: "Xbox" } } }),
  ]);

  const platformCards = [
    {
      id: "pc",
      title: "PC Gaming Abyss",
      description: "Desktop architectures, ultrawide support, ray-tracing shadows, and verified Steam, Epic Games, and GOG distributions.",
      icon: Monitor,
      color: "text-cold",
      border: "hover:border-cold/60",
      count: pcCount,
      href: "/platforms/pc",
    },
    {
      id: "mobile",
      title: "Mobile & Portable Nightmares",
      description: "Apple iOS and Google Android verified official releases. AAA console ports and mobile-exclusive psychological horrors.",
      icon: Smartphone,
      color: "text-toxic",
      border: "hover:border-toxic/60",
      count: mobileCount,
      href: "/platforms/mobile",
    },
    {
      id: "playstation",
      title: "PlayStation 5 & PS4",
      description: "Tempest 3D Audio, DualSense adaptive triggers, and high-fidelity console survival horror showcases.",
      icon: Gamepad2,
      color: "text-blood",
      border: "hover:border-blood/60",
      count: psCount,
      href: "/platforms/playstation",
    },
    {
      id: "xbox",
      title: "Xbox Series X|S",
      description: "High performance console horror, Quick Resume, and Xbox Cloud Gaming innovations including Kojima's OD.",
      icon: Gamepad2,
      color: "text-toxic",
      border: "hover:border-toxic/60",
      count: xboxCount,
      href: "/platforms/xbox",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="border-b border-abyss-700/80 pb-6 mb-10 text-center max-w-2xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-blood font-semibold">
          SYSTEM CLASSIFICATION
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
          PLATFORMS & HARDWARE ARCHIVES
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono">
          Explore horror experiences organized by target hardware, operating system, and verified distribution channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {platformCards.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.id}
              href={p.href}
              className={`group rounded-2xl border border-abyss-700 bg-abyss-900/90 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${p.border} hover:shadow-[0_10px_35px_rgba(0,0,0,0.7)]`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-abyss-700 bg-abyss-950 ${p.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="font-mono text-xs text-ghost-fog border border-abyss-800 rounded px-2.5 py-1">
                    {p.count} ARCHIVES
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-ghost-white group-hover:text-blood transition-colors">
                  {p.title}
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-ghost-ash leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-abyss-800 flex items-center justify-between font-mono text-xs text-ghost-fog group-hover:text-white transition-colors">
                <span>ENTER PLATFORM ARCHIVE</span>
                <ArrowRight className="h-4 w-4 text-blood transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
