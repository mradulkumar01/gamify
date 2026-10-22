"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Gamepad2, User, Newspaper, BookOpen, Loader2 } from "lucide-react";

interface SearchResultItem {
  type: "game" | "character" | "news" | "blog";
  title: string;
  subtitle?: string;
  url: string;
}

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via external state or dispatch
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-obsidian/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-blood/30 bg-abyss-900 shadow-[0_0_50px_rgba(255,28,47,0.25)] animate-in fade-in-0 zoom-in-95">
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center border-b border-abyss-700/60 px-4 py-3">
          <Search className="h-5 w-5 text-blood shrink-0" />
          <input
            type="text"
            placeholder="Search horror games, characters, news, lore, platforms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent px-3 text-sm text-ghost-white placeholder-ghost-fog focus:outline-none font-mono"
          />
          {loading && <Loader2 className="h-4 w-4 animate-spin text-blood mr-2" />}
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-ghost-fog hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </form>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim().length >= 2 && results.length === 0 && !loading && (
            <div className="py-8 text-center text-sm text-ghost-fog font-mono">
              No darkness found matching &quot;{query}&quot;. Press Enter to explore all archives.
            </div>
          )}

          {results.map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              onClick={onClose}
              className="group flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-abyss-800 border border-transparent hover:border-blood/20"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-abyss-950 text-blood">
                {item.type === "game" && <Gamepad2 className="h-4 w-4" />}
                {item.type === "character" && <User className="h-4 w-4" />}
                {item.type === "news" && <Newspaper className="h-4 w-4" />}
                {item.type === "blog" && <BookOpen className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-ghost-white group-hover:text-blood">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="truncate text-xs text-ghost-fog">{item.subtitle}</p>
                )}
              </div>
              <span className="shrink-0 text-[10px] font-mono uppercase text-ghost-fog border border-abyss-700 px-2 py-0.5 rounded">
                {item.type}
              </span>
            </Link>
          ))}

          {query.trim().length === 0 && (
            <div className="p-4 text-xs font-mono text-ghost-fog space-y-2">
              <p className="font-semibold text-ghost-ash">POPULAR ARCHIVE SEARCHES:</p>
              <div className="flex flex-wrap gap-2">
                {["Silent Hill 2", "Alan Wake 2", "Pyramid Head", "Xenomorph", "Signalis", "Dead Space"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="rounded bg-abyss-800 px-2 py-1 text-ghost-ash hover:text-blood hover:bg-abyss-700 border border-abyss-700/50"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-abyss-800/80 bg-abyss-950/80 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-ghost-fog">
          <span>Press ESC to exit</span>
          <span>Press ENTER for full results</span>
        </div>
      </div>
    </div>
  );
}
