"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Skull, Lock, User, Loader2, AlertCircle } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Authentication failed.");
      } else {
        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Network failure connecting to the abyss.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-blood/40 bg-abyss-900/95 p-8 shadow-[0_0_50px_rgba(255,28,47,0.25)] backdrop-blur-xl">
      <div className="text-center mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blood/50 bg-abyss-950 mx-auto mb-3 shadow-[0_0_20px_rgba(255,28,47,0.3)]">
          <Skull className="h-6 w-6 text-blood" />
        </div>
        <h1 className="font-display text-2xl font-black text-ghost-white">
          ENTER THE ABYSS
        </h1>
        <p className="mt-1 font-mono text-xs text-blood tracking-wider uppercase">
          AUTHENTICATE IDENTIFICATION
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
            Username or Email
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-ghost-fog" />
            <input
              type="text"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="mradulkumar or username"
              className="w-full rounded border border-abyss-700 bg-abyss-950 pl-10 pr-3 py-2 text-xs text-ghost-white placeholder-ghost-fog focus:border-blood focus:outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-mono uppercase text-ghost-fog">
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-[10px] font-mono text-ghost-fog hover:text-blood"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-ghost-fog" />
            <input
              type="password"
              required
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
          <span>ENTER VAULT</span>
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-abyss-800 text-center font-mono text-xs text-ghost-fog">
        <span>Not yet an initiate? </span>
        <Link href="/auth/register" className="text-blood hover:underline font-bold">
          Forge an Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="font-mono text-xs text-ghost-fog">Summoning portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
