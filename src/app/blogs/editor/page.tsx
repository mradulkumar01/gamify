"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PenTool,
  Eye,
  Send,
  Save,
  CheckCircle2,
  XCircle,
  Loader2,
  Image as ImageIcon,
  HelpCircle,
} from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

interface GameOption {
  id: string;
  title: string;
}

export default function BlogEditorPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState(APP_CONFIG.blogCategories[0]);
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [gameId, setGameId] = useState("");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [gamesList, setGamesList] = useState<GameOption[]>([]);

  useEffect(() => {
    // Fetch games for association dropdown
    fetch("/api/games?limit=50")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.games) {
          setGamesList(data.games.map((g: { id: string; title: string }) => ({ id: g.id, title: g.title })));
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (publishStatus: "DRAFT" | "PUBLISHED") => {
    if (!title.trim() || !content.trim()) {
      setStatusMsg({ type: "error", text: "Title and content cannot be empty." });
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle,
          category,
          coverImage,
          tags,
          gameId: gameId || null,
          content,
          status: publishStatus,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMsg({ type: "error", text: data.error || "Failed to save article." });
      } else {
        setStatusMsg({
          type: "success",
          text: publishStatus === "DRAFT" ? "Draft saved to memory." : "Article published to the archives!",
        });
        setTimeout(() => {
          router.push(`/blogs/${data.blog.slug}`);
        }, 1200);
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error transmitting article." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-abyss-700/80 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
            <PenTool className="h-4 w-4" />
            <span>COMMUNITY WRITING STUDIO</span>
          </div>
          <h1 className="font-display text-3xl font-black text-ghost-white mt-1">
            COMPOSE HORROR DISSERTATION
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-1.5 rounded border border-abyss-700 bg-abyss-900 px-4 py-2 font-mono text-xs text-ghost-ash hover:border-blood hover:text-white transition-all"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{isPreview ? "EDIT MODE" : "PREVIEW"}</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave("DRAFT")}
            className="flex items-center gap-1.5 rounded border border-abyss-700 bg-abyss-800 px-4 py-2 font-mono text-xs text-ghost-ash hover:border-white hover:text-white transition-all disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            <span>SAVE DRAFT</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave("PUBLISHED")}
            className="flex items-center gap-1.5 rounded border border-blood bg-blood px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-blood-crimson transition-all shadow-[0_0_15px_rgba(255,28,47,0.3)] disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            <span>PUBLISH</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-2 ${
            statusMsg.type === "success"
              ? "bg-toxic/10 border border-toxic/40 text-toxic"
              : "bg-blood/10 border border-blood/40 text-blood"
          }`}
        >
          {statusMsg.type === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Main Studio Area */}
      {!isPreview ? (
        <div className="space-y-6">
          {/* Metadata Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
              >
                {APP_CONFIG.blogCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                Associated Game (Optional)
              </label>
              <select
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
              >
                <option value="">None / General Gaming</option>
                {gamesList.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Atmosphere, Audio, Survival"
                className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
              Article Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Acoustic Terrors of Cauldron Lake"
              className="w-full rounded border border-abyss-700 bg-abyss-950 px-4 py-3 font-display text-xl sm:text-2xl font-bold text-ghost-white focus:border-blood focus:outline-none"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1">
              Subtitle / Hook
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Brief description or teaser hook for readers..."
              className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white focus:border-blood focus:outline-none"
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-ghost-fog mb-1 flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5" />
              Cover Image URL (Direct HTTPS image link)
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-xs text-ghost-white font-mono focus:border-blood focus:outline-none"
            />
          </div>

          {/* Content Body Editor */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-mono uppercase text-ghost-fog">
                Article Content (Supports Paragraphs & Markdown formatting)
              </label>
              <span className="text-[10px] font-mono text-ghost-fog">
                {content.trim() ? content.trim().split(/\s+/).length : 0} words
              </span>
            </div>
            <textarea
              required
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Begin your analysis here. Write deep dives into psychological design, character motivations, atmosphere craft, and survival mechanics..."
              className="w-full rounded-xl border border-abyss-700 bg-abyss-950 p-4 font-mono text-xs sm:text-sm text-ghost-white focus:border-blood focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      ) : (
        /* Preview Mode */
        <div className="rounded-2xl border border-abyss-700 bg-abyss-900/80 p-8 space-y-6">
          <div className="border-b border-abyss-800 pb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-toxic font-bold">
              {category}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-ghost-white mt-1">
              {title || "Untitled Essay"}
            </h2>
            {subtitle && <p className="text-base text-ghost-ash mt-2 font-light">{subtitle}</p>}
          </div>

          {coverImage && (
            <div className="rounded-xl overflow-hidden aspect-video bg-abyss-950">
              <img src={coverImage} alt="Cover Preview" className="h-full w-full object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none text-ghost-ash leading-relaxed space-y-4 text-sm font-sans">
            {content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
