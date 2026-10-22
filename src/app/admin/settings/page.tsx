"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Settings, ArrowLeft, Save, Loader2, CheckCircle2, XCircle, Shield } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState(APP_CONFIG.name);
  const [siteTagline, setSiteTagline] = useState(APP_CONFIG.tagline);
  const [altTagline, setAltTagline] = useState(APP_CONFIG.altTagline);
  const [ownerName, setOwnerName] = useState(APP_CONFIG.owner.name);
  const [ownerRole, setOwnerRole] = useState(APP_CONFIG.owner.role);
  const [ownerGithub, setOwnerGithub] = useState(APP_CONFIG.owner.github);
  const [ownerLinkedin, setOwnerLinkedin] = useState(APP_CONFIG.owner.linkedin);
  const [ownerBio, setOwnerBio] = useState(APP_CONFIG.owner.bio);
  const [ownerEmail, setOwnerEmail] = useState(APP_CONFIG.owner.email);
  const [allowRegistration, setAllowRegistration] = useState("true");
  const [autoApproveBlogs, setAutoApproveBlogs] = useState("false");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        const s = data.settings || {};
        if (s.SITE_NAME) setSiteName(s.SITE_NAME);
        if (s.SITE_TAGLINE) setSiteTagline(s.SITE_TAGLINE);
        if (s.SITE_ALT_TAGLINE) setAltTagline(s.SITE_ALT_TAGLINE);
        if (s.OWNER_NAME) setOwnerName(s.OWNER_NAME);
        if (s.OWNER_ROLE) setOwnerRole(s.OWNER_ROLE);
        if (s.OWNER_GITHUB) setOwnerGithub(s.OWNER_GITHUB);
        if (s.OWNER_LINKEDIN) setOwnerLinkedin(s.OWNER_LINKEDIN);
        if (s.OWNER_BIO) setOwnerBio(s.OWNER_BIO);
        if (s.OWNER_EMAIL) setOwnerEmail(s.OWNER_EMAIL);
        if (s.ALLOW_USER_REGISTRATION) setAllowRegistration(s.ALLOW_USER_REGISTRATION);
        if (s.AUTO_APPROVE_BLOGS) setAutoApproveBlogs(s.AUTO_APPROVE_BLOGS);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          settings: {
            SITE_NAME: siteName,
            SITE_TAGLINE: siteTagline,
            SITE_ALT_TAGLINE: altTagline,
            OWNER_NAME: ownerName,
            OWNER_ROLE: ownerRole,
            OWNER_GITHUB: ownerGithub,
            OWNER_LINKEDIN: ownerLinkedin,
            OWNER_BIO: ownerBio,
            OWNER_EMAIL: ownerEmail,
            ALLOW_USER_REGISTRATION: allowRegistration,
            AUTO_APPROVE_BLOGS: autoApproveBlogs,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMsg({ type: "error", text: data.error || "Failed to update configuration." });
      } else {
        setStatusMsg({ type: "success", text: "Global settings committed to database memory." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error saving settings." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-ghost-fog hover:text-blood"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>RETURN TO ADMIN OVERSEER</span>
        </Link>
      </div>

      <div className="border-b border-abyss-700/80 pb-6 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cold font-semibold">
          <Settings className="h-4 w-4" />
          <span>SYSTEM CONFIGURATION</span>
        </div>
        <h1 className="font-display text-3xl font-black text-ghost-white mt-1">
          GLOBAL SITE & CREATOR SETTINGS
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono">
          Configure brand identity, taglines, owner attribution, and platform security flags without altering source files.
        </p>
      </div>

      {statusMsg && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-2 ${
            statusMsg.type === "success"
              ? "bg-toxic/10 border border-toxic/40 text-toxic"
              : "bg-blood/10 border border-blood/40 text-blood"
          }`}
        >
          {statusMsg.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-ghost-fog font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-blood" />
          <span>Loading system parameters...</span>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8 font-mono text-xs">
          {/* Brand Configuration */}
          <div className="rounded-xl border border-abyss-700 bg-abyss-900/80 p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-white border-l-2 border-blood pl-3">
              BRAND IDENTITY & MOTIFS
            </h2>

            <div>
              <label className="block text-[10px] uppercase text-ghost-fog mb-1">
                Platform Name (Global)
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase text-ghost-fog mb-1">
                  Primary Tagline
                </label>
                <input
                  type="text"
                  value={siteTagline}
                  onChange={(e) => setSiteTagline(e.target.value)}
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-ghost-fog mb-1">
                  Alternative Tagline
                </label>
                <input
                  type="text"
                  value={altTagline}
                  onChange={(e) => setAltTagline(e.target.value)}
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Owner & Creator Details */}
          <div className="rounded-xl border border-blood/30 bg-abyss-900/80 p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-white border-l-2 border-blood pl-3">
              CREATOR & OWNER IDENTITY
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase text-ghost-fog mb-1">
                  Owner Name
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-ghost-fog mb-1">
                  Owner Role
                </label>
                <input
                  type="text"
                  value={ownerRole}
                  onChange={(e) => setOwnerRole(e.target.value)}
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase text-ghost-fog mb-1">
                  GitHub Profile Link
                </label>
                <input
                  type="url"
                  value={ownerGithub}
                  onChange={(e) => setOwnerGithub(e.target.value)}
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-ghost-fog mb-1">
                  LinkedIn Profile Link
                </label>
                <input
                  type="url"
                  value={ownerLinkedin}
                  onChange={(e) => setOwnerLinkedin(e.target.value)}
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase text-ghost-fog mb-1">
                Owner Biography & Mission
              </label>
              <textarea
                rows={3}
                value={ownerBio}
                onChange={(e) => setOwnerBio(e.target.value)}
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Security & Access Policies */}
          <div className="rounded-xl border border-abyss-700 bg-abyss-900/80 p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-white border-l-2 border-toxic pl-3">
              PLATFORM OPERATIONAL POLICIES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase text-ghost-fog mb-1">
                  Allow Public Registration
                </label>
                <select
                  value={allowRegistration}
                  onChange={(e) => setAllowRegistration(e.target.value)}
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                >
                  <option value="true">Enabled (Accept New Wanderers)</option>
                  <option value="false">Disabled (Lockdown Mode)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-ghost-fog mb-1">
                  Auto-Approve Community Essays
                </label>
                <select
                  value={autoApproveBlogs}
                  onChange={(e) => setAutoApproveBlogs(e.target.value)}
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                >
                  <option value="false">Moderation Required (Draft/Submitted)</option>
                  <option value="true">Instant Publication (Auto-Publish)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded border border-blood bg-blood px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(255,28,47,0.4)] hover:bg-blood-crimson transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              <span>SAVE CONFIGURATION</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
