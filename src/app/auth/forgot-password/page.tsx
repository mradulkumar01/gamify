"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Skull, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-abyss-700 bg-abyss-900/95 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-ghost-fog hover:text-blood"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>RETURN TO LOGIN</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blood/50 bg-abyss-950 mx-auto mb-3">
            <Skull className="h-6 w-6 text-blood" />
          </div>
          <h1 className="font-display text-2xl font-black text-ghost-white">
            RECOVER VAULT ACCESS
          </h1>
          <p className="mt-1 font-mono text-xs text-ghost-fog">
            Dispatches password reset cipher to your verified email
          </p>
        </div>

        {submitted ? (
          <div className="rounded-xl border border-toxic/40 bg-toxic/10 p-6 text-center space-y-3">
            <CheckCircle2 className="h-8 w-8 text-toxic mx-auto" />
            <h3 className="font-display text-base font-bold text-ghost-white">
              RECOVERY TRANSMISSION DISPATCHED
            </h3>
            <p className="text-xs text-ghost-ash">
              If an entity is bound to <span className="text-white font-mono">{email}</span>, encrypted restoration instructions have been sent.
            </p>
            <div className="pt-2">
              <Link
                href="/auth/login"
                className="font-mono text-xs text-toxic hover:underline font-bold"
              >
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                Account Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-ghost-fog" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full rounded border border-abyss-700 bg-abyss-950 pl-10 pr-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded border border-blood bg-blood py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(255,28,47,0.3)] hover:bg-blood-crimson transition-all"
            >
              SEND RECOVERY CIPHER
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
