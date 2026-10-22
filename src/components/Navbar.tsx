"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Skull,
  Search,
  Menu,
  X,
  Bookmark,
  PlusSquare,
  ShieldAlert,
  LogOut,
  LayoutDashboard,
  User as UserIcon,
} from "lucide-react";
import { APP_CONFIG } from "@/lib/config";
import { AudioAtmosphere } from "./AudioAtmosphere";
import { SearchModal } from "./SearchModal";

interface SessionUser {
  id: string;
  username: string;
  displayName: string;
  role: string;
  avatarUrl?: string;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch current user session
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { label: "GAMES", href: "/games" },
    { label: "PLATFORMS", href: "/platforms" },
    { label: "CHARACTERS", href: "/characters" },
    { label: "UPCOMING", href: "/upcoming" },
    { label: "NEWS", href: "/news" },
    { label: "BLOGS", href: "/blogs" },
    { label: "REVIEWS", href: "/reviews" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-abyss-700/80 bg-obsidian/90 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
            : "border-b border-transparent bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blood/40 bg-abyss-900 shadow-[0_0_15px_rgba(255,28,47,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:border-blood">
              <Skull className="h-5 w-5 text-blood transition-all group-hover:text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-black tracking-wider text-ghost-white group-hover:text-blood transition-colors">
                {APP_CONFIG.shortName}
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-blood uppercase -mt-1 font-semibold">
                {APP_CONFIG.subName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-mono tracking-widest transition-colors py-1 relative ${
                    active ? "text-blood font-bold" : "text-ghost-ash hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blood shadow-[0_0_8px_#ff1c2f]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-3">
            {/* Ambient Horror Audio Synthesizer */}
            <div className="hidden sm:block">
              <AudioAtmosphere />
            </div>

            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-md border border-abyss-700 bg-abyss-900/80 px-2.5 py-1.5 text-xs text-ghost-ash hover:border-blood/50 hover:text-white transition-all"
              aria-label="Search Archives"
            >
              <Search className="h-4 w-4 text-blood" />
              <span className="hidden md:inline font-mono text-[11px]">SEARCH</span>
              <kbd className="hidden md:inline rounded bg-abyss-800 px-1.5 py-0.5 text-[10px] font-mono text-ghost-fog">
                ⌘K
              </kbd>
            </button>

            {/* User Session Area */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-abyss-700 bg-abyss-900 p-1 hover:border-blood transition-all"
                  aria-label="User profile menu"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blood-dark/50 text-xs font-bold text-ghost-white overflow-hidden">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.displayName} className="h-full w-full object-cover" />
                    ) : (
                      user.displayName.charAt(0)
                    )}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg border border-abyss-700 bg-abyss-950 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in-0">
                    <div className="border-b border-abyss-800 px-3 py-2">
                      <p className="text-xs font-bold text-ghost-white truncate">{user.displayName}</p>
                      <p className="text-[11px] font-mono text-blood uppercase">{user.role}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded px-3 py-1.5 text-xs text-ghost-ash hover:bg-abyss-800 hover:text-white"
                      >
                        <LayoutDashboard className="h-3.5 w-3.5 text-blood" />
                        <span>Command Dashboard</span>
                      </Link>

                      <Link
                        href="/dashboard/saved"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded px-3 py-1.5 text-xs text-ghost-ash hover:bg-abyss-800 hover:text-white"
                      >
                        <Bookmark className="h-3.5 w-3.5 text-blood" />
                        <span>Saved Games</span>
                      </Link>

                      <Link
                        href="/blogs/editor"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded px-3 py-1.5 text-xs text-ghost-ash hover:bg-abyss-800 hover:text-white"
                      >
                        <PlusSquare className="h-3.5 w-3.5 text-toxic" />
                        <span>Write Blog Post</span>
                      </Link>

                      {user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded px-3 py-1.5 text-xs text-blood font-semibold hover:bg-abyss-800"
                        >
                          <ShieldAlert className="h-3.5 w-3.5 text-blood" />
                          <span>Admin Console</span>
                        </Link>
                      )}

                      <Link
                        href={`/profile/${user.username}`}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded px-3 py-1.5 text-xs text-ghost-ash hover:bg-abyss-800 hover:text-white"
                      >
                        <UserIcon className="h-3.5 w-3.5 text-ghost-fog" />
                        <span>Public Profile</span>
                      </Link>
                    </div>

                    <div className="border-t border-abyss-800 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded px-3 py-1.5 text-xs text-ghost-fog hover:bg-blood/20 hover:text-blood transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sever Connection</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="rounded border border-abyss-700 bg-abyss-900/60 px-3 py-1.5 font-mono text-xs text-ghost-ash hover:border-blood hover:text-white transition-all"
                >
                  LOGIN
                </Link>
                <Link
                  href="/auth/register"
                  className="hidden sm:inline-flex rounded border border-blood/60 bg-blood/20 px-3 py-1.5 font-mono text-xs font-semibold text-blood hover:bg-blood hover:text-white transition-all shadow-[0_0_15px_rgba(255,28,47,0.3)]"
                >
                  ENTER ABYSS
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded border border-abyss-700 bg-abyss-900 p-1.5 text-ghost-ash hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-abyss-700 bg-obsidian/95 px-4 pt-3 pb-6 backdrop-blur-xl animate-in slide-in-from-top-4">
            <div className="mb-4">
              <AudioAtmosphere />
            </div>
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 font-mono text-sm tracking-wider text-ghost-ash hover:bg-abyss-800 hover:text-blood"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-abyss-800 flex gap-2">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-mono text-ghost-fog hover:text-blood"
                >
                  About the Creator
                </Link>
                <span className="text-ghost-fog">•</span>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-mono text-ghost-fog hover:text-blood"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Instant Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
