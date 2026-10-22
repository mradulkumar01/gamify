import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Bell, ArrowLeft, ShieldCheck, CheckCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const revalidate = 0;

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login?redirect=/dashboard/notifications");
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-ghost-fog hover:text-blood"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>RETURN TO DASHBOARD</span>
        </Link>
      </div>

      <div className="border-b border-abyss-700/80 pb-6 mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
            <Bell className="h-4 w-4" />
            <span>DISPATCH LOG</span>
          </div>
          <h1 className="font-display text-3xl font-black text-ghost-white mt-1">
            ABYSS NOTIFICATIONS
          </h1>
        </div>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`rounded-xl border p-4 flex items-start justify-between gap-4 ${
                n.isRead ? "border-abyss-800 bg-abyss-950" : "border-blood/40 bg-abyss-900"
              }`}
            >
              <div>
                <h4 className="font-display text-sm font-bold text-ghost-white">{n.title}</h4>
                <p className="text-xs text-ghost-ash mt-1">{n.message}</p>
                <span className="font-mono text-[10px] text-ghost-fog mt-2 block">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
              {n.link && (
                <Link
                  href={n.link}
                  className="rounded border border-abyss-700 bg-abyss-800 px-3 py-1 font-mono text-xs text-blood hover:border-blood"
                >
                  VIEW
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-abyss-700 bg-abyss-900/60 p-12 text-center max-w-md mx-auto my-12">
          <ShieldCheck className="h-10 w-10 text-toxic mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-ghost-white">
            NO ACTIVE ANOMALIES
          </h3>
          <p className="mt-2 text-xs font-mono text-ghost-fog">
            All abyss communications have been cleared. You are fully up to date.
          </p>
        </div>
      )}
    </div>
  );
}
