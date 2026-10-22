"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileCheck, ArrowLeft, Check, X, Trash2, Loader2, AlertTriangle } from "lucide-react";

interface PendingBlog {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
  author: {
    username: string;
    displayName: string;
  };
}

interface ReviewItem {
  id: string;
  title: string;
  body: string;
  rating: number;
  isModerated: boolean;
  user: { username: string };
  game: { title: string };
}

export default function AdminModerationPage() {
  const [pendingBlogs, setPendingBlogs] = useState<PendingBlog[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const res = await fetch("/api/admin/moderation");
      if (res.ok) {
        const data = await res.json();
        setPendingBlogs(data.pendingBlogs || []);
        setReviews(data.allReviews || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleModerateBlog = async (id: string, action: "approve" | "reject" | "delete") => {
    try {
      const res = await fetch("/api/admin/moderation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "blog", id, action }),
      });
      if (res.ok) {
        setPendingBlogs(pendingBlogs.filter((b) => b.id !== id));
        setMsg(`Blog ${action}d successfully.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Delete this review permanently?")) return;
    try {
      const res = await fetch("/api/admin/moderation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "review", id, action: "delete" }),
      });
      if (res.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
        setMsg("Review deleted.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-toxic font-semibold">
          <FileCheck className="h-4 w-4" />
          <span>CONTENT GUARDIAN</span>
        </div>
        <h1 className="font-display text-3xl font-black text-ghost-white mt-1">
          COMMUNITY CONTENT MODERATION
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ghost-ash font-mono">
          Review user-submitted essays, verify compliance with spoiler guidelines, and excise abusive content.
        </p>
      </div>

      {msg && (
        <div className="mb-6 rounded-lg bg-toxic/10 border border-toxic/40 p-3 text-xs text-toxic font-mono">
          {msg}
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-ghost-fog font-mono text-xs flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-blood" />
          <span>Auditing moderation queues...</span>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Pending Essays Section */}
          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-ghost-white flex items-center gap-2 border-l-2 border-toxic pl-3">
              PENDING / DRAFT ESSAYS ({pendingBlogs.length})
            </h2>

            {pendingBlogs.length > 0 ? (
              <div className="space-y-3 font-mono text-xs">
                {pendingBlogs.map((b) => (
                  <div
                    key={b.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-abyss-700 bg-abyss-900/80 p-4 gap-4"
                  >
                    <div>
                      <span className="text-[10px] uppercase text-blood font-bold">{b.category}</span>
                      <h3 className="font-display text-sm font-bold text-white mt-0.5">{b.title}</h3>
                      <p className="text-[11px] text-ghost-fog">
                        Author: {b.author.displayName} (@{b.author.username}) • Status: {b.status}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/blogs/${b.slug}`}
                        target="_blank"
                        className="rounded border border-abyss-700 bg-abyss-800 px-3 py-1 text-ghost-ash hover:text-white"
                      >
                        PREVIEW
                      </Link>
                      <button
                        onClick={() => handleModerateBlog(b.id, "approve")}
                        className="flex items-center gap-1 rounded border border-toxic bg-toxic/20 px-3 py-1 text-toxic hover:bg-toxic hover:text-black font-bold"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>APPROVE</span>
                      </button>
                      <button
                        onClick={() => handleModerateBlog(b.id, "reject")}
                        className="flex items-center gap-1 rounded border border-blood bg-blood/20 px-3 py-1 text-blood hover:bg-blood hover:text-white"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>REJECT</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-abyss-800 bg-abyss-950 p-6 text-center text-xs font-mono text-ghost-fog">
                No pending essay submissions. All queues clear.
              </div>
            )}
          </section>

          {/* Reviews Moderation */}
          <section className="space-y-4">
            <h2 className="font-display text-lg font-bold text-ghost-white flex items-center gap-2 border-l-2 border-blood pl-3">
              RECENT ACTIVE REVIEWS ({reviews.length})
            </h2>

            <div className="space-y-3 font-mono text-xs">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-abyss-800 bg-abyss-950 p-4 gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-blood font-bold">{r.game.title}</span>
                      <span className="text-ghost-white font-bold">★ {r.rating}/10</span>
                      <span className="text-ghost-fog">— by {r.user.username}</span>
                    </div>
                    <p className="font-display text-xs text-white mt-1 truncate">{r.title}</p>
                    <p className="text-[11px] text-ghost-ash truncate">{r.body}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteReview(r.id)}
                    className="rounded p-2 text-ghost-fog hover:text-blood hover:bg-abyss-900 transition-colors self-end sm:self-center"
                    title="Delete Abusive Review"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
