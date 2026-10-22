"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, XCircle, Loader2, MessageSquare, ShieldAlert } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject: `[${category}] ${subject}`, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        setResponseMsg({ type: "error", text: data.error || "Failed to transmit message." });
      } else {
        setResponseMsg({ type: "success", text: data.message });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      setResponseMsg({ type: "error", text: "Network failure transmitting dispatch." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="border-b border-abyss-700/80 pb-6 mb-10 text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold mb-2">
          <Mail className="h-4 w-4" />
          <span>DIRECT TRANSMISSION FREQUENCY</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ghost-white">
          COMMUNICATE WITH THE ABYSS
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono">
          Reach out to Founder {APP_CONFIG.owner.name} and the AFTERDARK editorial team regarding verified storefront corrections, game submissions, or editorial lore.
        </p>
      </div>

      <div className="rounded-2xl border border-abyss-700 bg-abyss-900/90 p-8 shadow-2xl backdrop-blur-md">
        {responseMsg && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-2 ${
              responseMsg.type === "success"
                ? "bg-toxic/10 border border-toxic/40 text-toxic"
                : "bg-blood/10 border border-blood/40 text-blood"
            }`}
          >
            {responseMsg.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <XCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{responseMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                Your Identification / Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Agent / Investigator name"
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                Contact Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@domain.com"
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                Dispatch Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
              >
                <option value="General Inquiry">General Inquiries</option>
                <option value="Storefront Verification">Report Broken / Storefront Link</option>
                <option value="Game Archive Submission">Indie Game Submission</option>
                <option value="Editorial Lore Suggestion">Editorial Lore Correction</option>
                <option value="Copyright Trademark Inquiries">Copyright / DMCA Inquiries</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief subject heading"
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
              Encrypted Dispatch Message
            </label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="State your business with the abyss clearly..."
              className="w-full rounded-xl border border-abyss-700 bg-abyss-950 p-4 font-mono text-xs text-ghost-white focus:border-blood focus:outline-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded border border-blood bg-blood px-7 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(255,28,47,0.3)] hover:bg-blood-crimson transition-all disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>TRANSMIT DISPATCH</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
