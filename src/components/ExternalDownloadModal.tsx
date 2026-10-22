"use client";

import React from "react";
import { ShieldCheck, ExternalLink, X, AlertTriangle } from "lucide-react";

interface DownloadSourceInfo {
  storeName: string;
  url: string;
  platform: string;
  gameTitle: string;
}

export function ExternalDownloadModal({
  source,
  isOpen,
  onClose,
}: {
  source: DownloadSourceInfo | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !source) return null;

  // Extract and sanitize domain name
  let domain = "";
  try {
    const urlObj = new URL(source.url);
    domain = urlObj.hostname;
  } catch (err) {
    domain = source.url;
  }

  const handleProceed = () => {
    // Open verified destination safely
    window.open(source.url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md animate-in fade-in-0"
    >
      <div className="relative w-full max-w-lg rounded-xl border border-blood/50 bg-abyss-900 p-6 shadow-[0_0_50px_rgba(255,28,47,0.35)] animate-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded p-1 text-ghost-fog hover:text-white"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header with Verification Shield */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-toxic/50 bg-toxic/10 text-toxic">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 id="modal-title" className="font-display text-base font-bold text-ghost-white">
              VERIFIED OFFICIAL STOREFRONT
            </h3>
            <p className="font-mono text-xs text-blood uppercase">
              DEPARTING AFTERDARK SECURE ARCHIVE
            </p>
          </div>
        </div>

        {/* Body Info */}
        <div className="mt-4 space-y-3 text-xs leading-relaxed text-ghost-ash">
          <p>
            You are about to access the official distributor for{" "}
            <span className="font-bold text-white">&quot;{source.gameTitle}&quot;</span> on{" "}
            <span className="font-bold text-blood">{source.platform}</span>.
          </p>

          <div className="rounded-lg border border-abyss-700 bg-abyss-950 p-3.5 font-mono text-[11px] space-y-1">
            <div className="flex justify-between">
              <span className="text-ghost-fog">DISTRIBUTOR:</span>
              <span className="text-white font-semibold">{source.storeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ghost-fog">DESTINATION DOMAIN:</span>
              <span className="text-toxic">{domain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ghost-fog">VERIFICATION STATUS:</span>
              <span className="text-toxic flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Legitimate Publisher Listing
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-blood/20 bg-blood/5 p-3 text-[11px] text-ghost-ash">
            <AlertTriangle className="h-4 w-4 text-blood shrink-0 mt-0.5" />
            <p>
              AFTERDARK enforces zero-piracy standards. This link directs exclusively to authentic publisher storefronts, authorized platforms, or verified developer channels.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-abyss-800">
          <button
            onClick={onClose}
            className="rounded border border-abyss-700 bg-abyss-800 px-4 py-2 font-mono text-xs text-ghost-ash hover:border-blood hover:text-white transition-all"
          >
            CANCEL
          </button>
          <button
            onClick={handleProceed}
            className="flex items-center gap-2 rounded border border-blood bg-blood px-5 py-2 font-mono text-xs font-bold text-white shadow-[0_0_15px_rgba(255,28,47,0.4)] hover:bg-blood-crimson transition-all"
          >
            <span>PROCEED TO STOREFRONT</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
