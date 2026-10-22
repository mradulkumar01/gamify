"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Bookmark, MessageSquare, Send, CheckCircle2, Loader2, Share2 } from "lucide-react";

interface CommentItem {
  id: string;
  content: string;
  createdAt: string | Date;
  user: {
    displayName: string;
    username: string;
    avatarUrl?: string | null;
  };
}

interface BlogDetailClientProps {
  blogSlug: string;
  initialLikes: number;
  initialLiked: boolean;
  initialBookmarked: boolean;
  comments: CommentItem[];
}

export function BlogDetailClient({
  blogSlug,
  initialLikes,
  initialLiked,
  initialBookmarked,
  comments: initialComments,
}: BlogDetailClientProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/blogs/${blogSlug}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsLiked(data.liked);
        setLikes(data.likesCount);
      } else {
        alert("Please login to react to essays.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await fetch(`/api/blogs/${blogSlug}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "bookmark" }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsBookmarked(data.bookmarked);
      } else {
        alert("Please login to bookmark essays.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    setCommentError("");

    try {
      const res = await fetch(`/api/blogs/${blogSlug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCommentError(data.error || "Failed to post comment. Ensure you are logged in.");
      } else {
        setComments([data.comment, ...comments]);
        setNewComment("");
      }
    } catch (err) {
      setCommentError("Network error posting comment.");
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="mt-12 space-y-10">
      {/* Action Bar (Like, Bookmark, Share) */}
      <div className="flex items-center justify-between border-y border-abyss-800 py-4 font-mono text-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 rounded px-3 py-1.5 border transition-all ${
              isLiked
                ? "border-blood bg-blood text-white shadow-[0_0_15px_#ff1c2f]"
                : "border-abyss-700 bg-abyss-900 text-ghost-ash hover:border-blood hover:text-white"
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
            <span>{likes} LIKES</span>
          </button>

          <button
            onClick={handleBookmark}
            className={`flex items-center gap-2 rounded px-3 py-1.5 border transition-all ${
              isBookmarked
                ? "border-toxic bg-toxic text-black font-bold shadow-[0_0_15px_#00ff87]"
                : "border-abyss-700 bg-abyss-900 text-ghost-ash hover:border-toxic hover:text-white"
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-black" : ""}`} />
            <span>{isBookmarked ? "SAVED" : "BOOKMARK"}</span>
          </button>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Essay link copied to clipboard.");
          }}
          className="flex items-center gap-1.5 text-ghost-fog hover:text-white"
        >
          <Share2 className="h-4 w-4" />
          <span>SHARE</span>
        </button>
      </div>

      {/* Discussion / Comments Section */}
      <div className="space-y-6">
        <h3 className="font-display text-xl font-bold text-ghost-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blood" />
          ESSAY DISCUSSIONS ({comments.length})
        </h3>

        {/* Comment Input */}
        <form onSubmit={handleCommentSubmit} className="space-y-3">
          {commentError && (
            <div className="rounded bg-blood/10 border border-blood/30 p-2.5 text-xs text-blood">
              {commentError}
            </div>
          )}

          <textarea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Contribute your interpretation or critique to this lore..."
            className="w-full rounded-xl border border-abyss-700 bg-abyss-900/90 p-3.5 text-xs text-ghost-white placeholder-ghost-fog focus:border-blood focus:outline-none"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submittingComment}
              className="flex items-center gap-2 rounded border border-blood bg-blood px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blood-crimson transition-all shadow-[0_0_10px_rgba(255,28,47,0.3)] disabled:opacity-50"
            >
              {submittingComment ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              <span>POST COMMENT</span>
            </button>
          </div>
        </form>

        {/* Comments Feed */}
        <div className="space-y-3 pt-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-abyss-800 bg-abyss-950 p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <Link
                  href={`/profile/${c.user.username}`}
                  className="flex items-center gap-2 hover:text-blood transition-colors"
                >
                  <div className="h-6 w-6 rounded-full bg-abyss-800 border border-abyss-700 overflow-hidden flex items-center justify-center text-[10px] text-ghost-ash">
                    {c.user.avatarUrl ? (
                      <img src={c.user.avatarUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      c.user.displayName.charAt(0)
                    )}
                  </div>
                  <span className="text-xs font-bold text-ghost-white">{c.user.displayName}</span>
                </Link>
                <span className="font-mono text-[10px] text-ghost-fog">
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-ghost-ash leading-relaxed whitespace-pre-line pl-8">
                {c.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
