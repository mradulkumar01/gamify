"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  ExternalLink,
  Star,
  Bookmark,
  Share2,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { ExternalDownloadModal } from "@/components/ExternalDownloadModal";
import { StarRating } from "@/components/StarRating";

interface DownloadLink {
  id: string;
  platform: string;
  storeName: string;
  url: string;
  notes?: string | null;
}

interface ReviewItem {
  id: string;
  rating: number;
  title: string;
  body: string;
  platformPlayed: string;
  playTimeHours?: number | null;
  hasSpoilers: boolean;
  helpfulCount: number;
  createdAt: string | Date;
  user: {
    displayName: string;
    username: string;
    avatarUrl?: string | null;
    role: string;
  };
}

interface GameDetailClientProps {
  gameId: string;
  gameSlug: string;
  gameTitle: string;
  downloadLinks: DownloadLink[];
  reviews: ReviewItem[];
  isInitiallySaved: boolean;
  userReview?: {
    rating: number;
    title: string;
    body: string;
    platformPlayed: string;
    playTimeHours?: number | null;
    hasSpoilers: boolean;
  } | null;
}

export function GameDetailClient({
  gameId,
  gameSlug,
  gameTitle,
  downloadLinks,
  reviews: initialReviews,
  isInitiallySaved,
  userReview: initialUserReview,
}: GameDetailClientProps) {
  const [selectedSource, setSelectedSource] = useState<{
    storeName: string;
    url: string;
    platform: string;
    gameTitle: string;
  } | null>(null);

  const [isSaved, setIsSaved] = useState(isInitiallySaved);
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);

  // Review form state
  const [rating, setRating] = useState(initialUserReview?.rating || 9);
  const [reviewTitle, setReviewTitle] = useState(initialUserReview?.title || "");
  const [reviewBody, setReviewBody] = useState(initialUserReview?.body || "");
  const [platformPlayed, setPlatformPlayed] = useState(initialUserReview?.platformPlayed || "PC");
  const [playTime, setPlayTime] = useState(initialUserReview?.playTimeHours?.toString() || "");
  const [hasSpoilers, setHasSpoilers] = useState(initialUserReview?.hasSpoilers || false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const handleSaveToggle = async () => {
    try {
      const res = await fetch(`/api/games/${gameSlug}/save`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setIsSaved(data.saved);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingReview(true);
    setReviewError("");
    setReviewSuccess(false);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId,
          rating,
          title: reviewTitle,
          reviewBody,
          platformPlayed,
          playTimeHours: playTime,
          hasSpoilers,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setReviewError(data.error || "Failed to post review. Please ensure you are logged in.");
      } else {
        setReviewSuccess(true);
        // Refresh local review list
        const updatedRes = await fetch(`/api/reviews?gameId=${gameId}`);
        if (updatedRes.ok) {
          const uData = await updatedRes.json();
          setReviews(uData.reviews || []);
        }
      }
    } catch (err) {
      setReviewError("Network transmission error.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleHelpfulVote = async (reviewId: string) => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}/vote`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setReviews((prev) =>
          prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: data.helpfulCount } : r))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Top CTA Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleSaveToggle}
          className={`flex items-center gap-2 rounded-md border px-4 py-2 font-mono text-xs font-semibold transition-all ${
            isSaved
              ? "border-blood bg-blood text-white shadow-[0_0_15px_#ff1c2f]"
              : "border-abyss-700 bg-abyss-900 text-ghost-ash hover:border-blood hover:text-white"
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isSaved ? "fill-white" : ""}`} />
          <span>{isSaved ? "SAVED IN ABYSS" : "ARCHIVE GAME"}</span>
        </button>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Archive transmission URL copied to clipboard.");
          }}
          className="flex items-center gap-2 rounded-md border border-abyss-700 bg-abyss-900 px-4 py-2 font-mono text-xs text-ghost-ash hover:border-blood hover:text-white transition-all"
        >
          <Share2 className="h-4 w-4" />
          <span>TRANSMIT LINK</span>
        </button>
      </div>

      {/* Official Verified Download & Storefront Section */}
      <div className="mt-8 rounded-xl border border-blood/30 bg-abyss-900/90 p-5 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-abyss-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-toxic" />
            <h3 className="font-display text-base font-bold text-ghost-white">
              LEGITIMATE STOREFRONTS & DOWNLOADS
            </h3>
          </div>
          <span className="text-[11px] font-mono text-toxic uppercase">
            No Piracy • Verified Publishers
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {downloadLinks.map((link) => (
            <button
              key={link.id}
              onClick={() =>
                setSelectedSource({
                  storeName: link.storeName,
                  url: link.url,
                  platform: link.platform,
                  gameTitle,
                })
              }
              className="group flex items-center justify-between rounded-lg border border-abyss-700 bg-abyss-950 p-3.5 text-left transition-all hover:border-blood hover:bg-abyss-800"
            >
              <div>
                <span className="font-mono text-[10px] text-blood uppercase font-semibold">
                  {link.platform}
                </span>
                <p className="font-display text-sm font-bold text-ghost-white group-hover:text-blood transition-colors">
                  {link.storeName}
                </p>
                {link.notes && (
                  <p className="text-[11px] text-ghost-fog mt-0.5">{link.notes}</p>
                )}
              </div>
              <ExternalLink className="h-4 w-4 text-ghost-fog group-hover:text-white shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h3 className="font-display text-2xl font-bold text-ghost-white mb-6 flex items-center gap-2">
          <Star className="h-5 w-5 text-blood fill-blood" />
          COMMUNITY REVIEWS & CRITIQUES ({reviews.length})
        </h3>

        {/* Review Form */}
        <div className="rounded-xl border border-abyss-700 bg-abyss-900/80 p-5 mb-8">
          <h4 className="font-display text-base font-bold text-ghost-white mb-3">
            LOG YOUR DISPATCH & REVIEW
          </h4>

          {reviewSuccess && (
            <div className="mb-4 rounded bg-toxic/10 border border-toxic/40 p-3 text-xs text-toxic flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Review archived successfully to the public register.</span>
            </div>
          )}

          {reviewError && (
            <div className="mb-4 rounded bg-blood/10 border border-blood/40 p-3 text-xs text-blood flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              <span>{reviewError}</span>
            </div>
          )}

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                  Abyss Rating (1 to 10 Skulls)
                </label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                  Platform Played
                </label>
                <select
                  value={platformPlayed}
                  onChange={(e) => setPlatformPlayed(e.target.value)}
                  className="rounded border border-abyss-700 bg-abyss-950 px-3 py-1.5 text-xs text-ghost-white focus:border-blood focus:outline-none"
                >
                  <option value="PC">PC (Steam / Epic / GOG)</option>
                  <option value="PlayStation 5">PlayStation 5</option>
                  <option value="Xbox Series X|S">Xbox Series X|S</option>
                  <option value="iOS">Apple iOS</option>
                  <option value="Android">Google Android</option>
                  <option value="Nintendo Switch">Nintendo Switch</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                  Playtime (Hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={playTime}
                  onChange={(e) => setPlayTime(e.target.value)}
                  placeholder="e.g. 24"
                  className="w-24 rounded border border-abyss-700 bg-abyss-950 px-3 py-1.5 text-xs text-ghost-white focus:border-blood focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                Headline Summary
              </label>
              <input
                type="text"
                required
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="A haunting descent into psychological guilt..."
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                Detailed Critique
              </label>
              <textarea
                required
                rows={4}
                value={reviewBody}
                onChange={(e) => setReviewBody(e.target.value)}
                placeholder="Break down the atmospheric tension, sound design, pacing, and creature encounters..."
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs text-ghost-ash cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSpoilers}
                  onChange={(e) => setHasSpoilers(e.target.checked)}
                  className="rounded border-abyss-700 bg-abyss-950 text-blood focus:ring-blood"
                />
                <span className="flex items-center gap-1 font-mono text-[11px] text-blood">
                  <AlertTriangle className="h-3.5 w-3.5" /> Contains Narrative Spoilers
                </span>
              </label>

              <button
                type="submit"
                disabled={submittingReview}
                className="flex items-center gap-2 rounded border border-blood bg-blood px-6 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blood-crimson transition-all shadow-[0_0_15px_rgba(255,28,47,0.3)] disabled:opacity-50"
              >
                {submittingReview ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                <span>SUBMIT REVIEW</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Reviews List */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-xl border border-abyss-700 bg-abyss-900/60 p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blood-dark/50 border border-blood/40 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                    {rev.user.avatarUrl ? (
                      <img src={rev.user.avatarUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      rev.user.displayName.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ghost-white">{rev.user.displayName}</p>
                    <p className="text-[10px] font-mono text-ghost-fog">
                      Played on {rev.platformPlayed} {rev.playTimeHours ? `• ${rev.playTimeHours} hrs` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded bg-obsidian px-2.5 py-1 border border-blood/30 font-mono text-xs font-bold text-white">
                  <Star className="h-3.5 w-3.5 text-blood fill-blood" />
                  <span>{rev.rating}/10</span>
                </div>
              </div>

              <div>
                <h5 className="font-display text-sm font-bold text-ghost-white">{rev.title}</h5>
                <p className="mt-1 text-xs text-ghost-ash leading-relaxed whitespace-pre-line">
                  {rev.body}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-abyss-800 text-[11px] font-mono text-ghost-fog">
                <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                <button
                  type="button"
                  onClick={() => handleHelpfulVote(rev.id)}
                  className="flex items-center gap-1.5 text-ghost-fog hover:text-toxic transition-colors"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Verified Download Modal */}
      <ExternalDownloadModal
        source={selectedSource}
        isOpen={!!selectedSource}
        onClose={() => setSelectedSource(null)}
      />
    </>
  );
}
