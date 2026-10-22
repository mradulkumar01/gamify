"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Gamepad2, Plus, Trash2, ArrowLeft, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

interface GameItem {
  id: string;
  slug: string;
  title: string;
  genre: string;
  platforms: string;
  developer: string;
  publisher: string;
  rating: number;
}

export default function AdminGamesPage() {
  const [games, setGames] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New Game Form
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [genre, setGenre] = useState("Psychological Horror");
  const [developer, setDeveloper] = useState("");
  const [publisher, setPublisher] = useState("");
  const [platforms, setPlatforms] = useState("PC, PlayStation 5, Xbox Series X");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [price, setPrice] = useState("59.99");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch("/api/games?limit=100");
      if (res.ok) {
        const data = await res.json();
        setGames(data.games || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you wish to eradicate "${title}" from the abyss archives?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/games?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setGames(games.filter((g) => g.id !== id));
        setStatusMsg({ type: "success", text: `"${title}" eradicated.` });
      } else {
        const data = await res.json();
        setStatusMsg({ type: "error", text: data.error || "Failed to delete game." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error." });
    }
  };

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/admin/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          tagline,
          genre,
          genres: genre,
          developer,
          publisher,
          platforms,
          shortDescription,
          fullDescription,
          coverImage,
          isUpcoming,
          price,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMsg({ type: "error", text: data.error || "Failed to create game." });
      } else {
        setStatusMsg({ type: "success", text: `Game "${title}" cataloged successfully.` });
        setShowAddModal(false);
        // Reset form
        setTitle("");
        setTagline("");
        setDeveloper("");
        setPublisher("");
        setShortDescription("");
        setFullDescription("");
        setCoverImage("");
        fetchGames();
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error creating game." });
    } finally {
      setSubmitting(false);
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-abyss-700/80 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blood font-semibold">
            <Gamepad2 className="h-4 w-4" />
            <span>CATALOG MANAGEMENT</span>
          </div>
          <h1 className="font-display text-3xl font-black text-ghost-white mt-1">
            MANAGE GAME ARCHIVES ({games.length})
          </h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded border border-blood bg-blood px-4 py-2 font-mono text-xs font-bold uppercase text-white shadow-[0_0_15px_rgba(255,28,47,0.3)] hover:bg-blood-crimson transition-all shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>CATALOG NEW GAME</span>
        </button>
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

      {/* Games Table */}
      <div className="rounded-xl border border-abyss-700 bg-abyss-900/90 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-ghost-fog font-mono text-xs flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-blood" />
            <span>Summoning game archives...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-abyss-950 border-b border-abyss-800 text-ghost-fog uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Genre</th>
                  <th className="p-3.5">Platforms</th>
                  <th className="p-3.5">Studio</th>
                  <th className="p-3.5">Rating</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-abyss-800 text-ghost-ash">
                {games.map((g) => (
                  <tr key={g.id} className="hover:bg-abyss-800/50 transition-colors">
                    <td className="p-3.5 font-bold text-white">
                      <Link href={`/games/${g.slug}`} className="hover:text-blood">
                        {g.title}
                      </Link>
                    </td>
                    <td className="p-3.5 text-blood">{g.genre}</td>
                    <td className="p-3.5 text-ghost-fog truncate max-w-[180px]">{g.platforms}</td>
                    <td className="p-3.5">{g.developer}</td>
                    <td className="p-3.5 text-white">★ {g.rating.toFixed(1)}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDelete(g.id, g.title)}
                        className="rounded p-1 text-ghost-fog hover:text-blood hover:bg-abyss-950 transition-colors"
                        title="Delete Game"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Game Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-blood/50 bg-abyss-900 p-6 shadow-2xl">
            <h3 className="font-display text-xl font-bold text-white mb-4">
              CATALOG NEW HORROR TITLE
            </h3>

            <form onSubmit={handleCreateGame} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-ghost-fog uppercase text-[10px] mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Outlast Trials"
                    className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-ghost-fog uppercase text-[10px] mb-1">Tagline</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Short eerie tagline"
                    className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-ghost-fog uppercase text-[10px] mb-1">Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                  >
                    {APP_CONFIG.genres.map((gen) => (
                      <option key={gen} value={gen}>
                        {gen}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-ghost-fog uppercase text-[10px] mb-1">Developer</label>
                  <input
                    type="text"
                    required
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                    placeholder="Red Barrels"
                    className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-ghost-fog uppercase text-[10px] mb-1">Publisher</label>
                  <input
                    type="text"
                    required
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="Red Barrels"
                    className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-ghost-fog uppercase text-[10px] mb-1">Supported Platforms</label>
                <input
                  type="text"
                  value={platforms}
                  onChange={(e) => setPlatforms(e.target.value)}
                  placeholder="PC, PlayStation 5, Xbox Series X|S"
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-ghost-fog uppercase text-[10px] mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-ghost-fog uppercase text-[10px] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="1-2 sentences for card previews..."
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-ghost-fog uppercase text-[10px] mb-1">Full Story & Gameplay Lore</label>
                <textarea
                  rows={4}
                  required
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Comprehensive breakdown of fear mechanics..."
                  className="w-full rounded border border-abyss-700 bg-abyss-950 px-3 py-2 text-white focus:border-blood focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUpcoming}
                    onChange={(e) => setIsUpcoming(e.target.checked)}
                    className="rounded border-abyss-700 bg-abyss-950 text-blood"
                  />
                  <span>Mark as Upcoming Title</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-abyss-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded border border-abyss-700 bg-abyss-800 px-4 py-2 text-ghost-ash hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded border border-blood bg-blood px-5 py-2 font-bold text-white hover:bg-blood-crimson disabled:opacity-50"
                >
                  {submitting ? "RECORDING..." : "COMMIT TO DATABASE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
