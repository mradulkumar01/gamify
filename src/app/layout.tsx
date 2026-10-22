import type { Metadata, Viewport } from "next";
import { Inter, Cinzel, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { APP_CONFIG } from "@/lib/config";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HorrorCursor } from "@/components/HorrorCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  keywords: [
    "horror games",
    "survival horror",
    "psychological horror",
    "game lore",
    "game characters",
    "game discovery",
    "upcoming horror games",
    "verified game downloads",
    "Silent Hill",
    "Alan Wake",
    "Resident Evil",
  ],
  authors: [{ name: APP_CONFIG.owner.name, url: APP_CONFIG.owner.github }],
  creator: APP_CONFIG.owner.name,
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.tagline,
    url: APP_CONFIG.url,
    siteName: APP_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: APP_CONFIG.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.name,
    description: APP_CONFIG.tagline,
    images: ["https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80"],
  },
};

export const viewport: Viewport = {
  themeColor: "#040306",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${cinzel.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-obsidian text-ghost-white selection:bg-blood selection:text-white min-h-screen flex flex-col relative antialiased">
        {/* Skip to Main Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 rounded bg-blood px-4 py-2 font-mono text-xs text-white"
        >
          Skip to main content
        </a>

        {/* Dynamic Desktop Cursor Torchlight */}
        <HorrorCursor />

        {/* Top Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 relative z-10 pt-16">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
