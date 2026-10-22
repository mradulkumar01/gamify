"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skull, Lock, User, Mail, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, displayName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration rejected.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Network transmission error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-blood/40 bg-abyss-900/95 p-8 shadow-[0_0_50px_rgba(255,28,47,0.25)] backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blood/50 bg-abyss-950 mx-auto mb-3 shadow-[0_0_20px_rgba(255,28,47,0.3)]">
            <Skull className="h-6 w-6 text-blood" />
          </div>
          <h1 className="font-display text-2xl font-black text-ghost-white">
            JOIN THE ABYSS
          </h1>
          <p className="mt-1 font-mono text-xs text-blood tracking-wider uppercase">
            COMMENCE REGISTRATION
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-blood/10 border border-blood/40 p-3 text-xs text-blood flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
              Public Display Name
            </label>
            <div className="relative">
              <Sparkles className="absolute left-3 top-2.5 h-4 w-4 text-ghost-fog" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Viktor Gray"
                className="w-full rounded border border-abyss-700 bg-abyss-950 pl-10 pr-3 py-2 text-xs text-ghost-white placeholder-ghost-fog focus:border-blood focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
              Unique Handle / Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-ghost-fog" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="viktorgray"
                className="w-full rounded border border-abyss-700 bg-abyss-950 pl-10 pr-3 py-2 text-xs text-ghost-white placeholder-ghost-fog focus:border-blood focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-ghost-fog" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full rounded border border-abyss-700 bg-abyss-950 pl-10 pr-3 py-2 text-xs text-ghost-white placeholder-ghost-fog focus:border-blood focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
              Password (Min 8 Characters)
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-ghost-fog" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded border border-abyss-700 bg-abyss-950 pl-10 pr-3 py-2 text-xs text-ghost-white placeholder-ghost-fog focus:border-blood focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded border border-blood bg-blood py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(255,28,47,0.4)] hover:bg-blood-crimson transition-all disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>FORGE IDENTITY</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-abyss-800 text-center font-mono text-xs text-ghost-fog">
          <span>Already initiated? </span>
          <Link href="/auth/login" className="text-blood hover:underline font-bold">
            Enter the Abyss
          </Link>
        </div>
      </div>
    </div>
  );
}
