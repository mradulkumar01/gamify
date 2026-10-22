# AFTERDARK — THE GAMING ABYSS

> **"ENTER THE UNKNOWN. PLAY BEYOND FEAR."**  
> *Alternative Tagline: "EVERY GAME HAS A DARK SIDE."*

A full-stack, production-ready cinematic horror gaming discovery platform, character and lore archive, editorial news wire, legitimate download aggregator, and community writing studio.

**Founder, Creator & Developer:** **MRADUL KUMAR**  
- **GitHub:** [https://github.com/mradulkumar01](https://github.com/mradulkumar01)  
- **LinkedIn:** [https://linkedin.com/in/mradul-kumar0001](https://linkedin.com/in/mradul-kumar0001)  
- **Platform:** AFTERDARK — THE GAMING ABYSS  

---

## 🩸 Table of Contents
1. [Core Features](#-core-features)
2. [Aesthetic & Cinematic UI/UX](#-aesthetic--cinematic-uiux)
3. [Technology Stack](#-technology-stack)
4. [Project Structure](#-project-structure)
5. [Quickstart & Installation](#-quickstart--installation)
6. [Environment Variables](#-environment-variables)
7. [Database Migration & Seeding](#-database-migration--seeding)
8. [Testing & Quality Assurance](#-testing--quality-assurance)
9. [Production Build & Deployment](#-production-build--deployment)
10. [Legal & Security Standards](#-legal--security-standards)

---

## 👁️ Core Features

- **Cinematic Prologue Experience:** A full-screen opening scene with dark screen, foggy silhouettes, emerging red light, glitch reveals, and tagline animations (skippable with persistent session state).
- **Web Audio API Ambient Synthesizer:** Real-time synthesized low-frequency horror drones (48Hz-51.5Hz binaural beating), resonant low-pass filters, and ambient cavern wind whispers. Starts muted by default per modern accessibility and browser policies, with persistent volume controls and equalizer visualizer.
- **Dynamic Cursor Torchlight / Spotlight:** Radial torchlight revealing hidden darkness around desktop cursor coordinates with accessible fallback.
- **Game Discovery Library:** Filterable by platform (PC, Mobile, PlayStation, Xbox), genre (Psychological, Survival, Action, Sci-Fi, Indie), price (Free-to-play vs Paid), rating, and release date.
- **Legitimate Official Storefronts Only:** Zero pirated files, cracked binaries, or unauthorized APKs. Every external download links verified platforms (Steam, Epic Games Store, GOG, Google Play, Apple App Store, official publishers) preceded by an external link security modal displaying the destination domain.
- **Character Lore & Entity Compendium:** Interactive character cards with full backstories, abilities, weapon arsenals, and **spoilers toggle shields**.
- **Upcoming Radar & Gaming News:** Real-time editorial dispatches covering sales milestones, developer roundtables (Hideo Kojima's OD, Alien Isolation sequel), and upcoming release calendars.
- **Community Writing Studio:** Registered users can write essays, reviews, and guides with markdown formatting, instant live preview mode, draft saving, and moderation workflows.
- **Verified Community Reviews:** 1-10 skull rating system, playtime tracking, helpfulness voting, and dynamic real-time database average calculations.
- **Overseer Admin Console:** Complete administrative dashboard for site owner Mradul Kumar to manage games, review user reports, moderate essays, inspect audit metrics, and globally configure brand settings without code alterations.

---

## 🎨 Aesthetic & Cinematic UI/UX

- **Obsidian & Charcoal Backgrounds:** Deep hex `#040306` obsidian base with `#0d0b13` layered panels.
- **Blood-Red & Crimson Accents:** `#ff1c2f` neon blood glows, `#8a030f` scarlet depths.
- **Atmospheric Highlights:** Toxic green (`#00ff87`) for verified badges, cold electric blue (`#40c4ff`) for technical specs.
- **Atmospheric Grain & Scanlines:** Subtle CSS scanlines and SVG fractal film grain texture.
- **Accessibility & Reduced Motion:** Respects `prefers-reduced-motion` and keyboard navigation (`Tab` focus rings, `Cmd+K` / `Ctrl+K` global search).

---

## ⚙️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript / Node.js |
| **Styling** | Tailwind CSS with custom horror tokens |
| **Icons** | Lucide React |
| **Database ORM** | Prisma ORM |
| **Local Database** | SQLite (`dev.db` - zero config, instant setup) |
| **Production Database** | PostgreSQL compatible (Neon, Supabase, Railway) |
| **Authentication** | Secure JWT with HttpOnly, SameSite cookies & bcrypt password hashing |
| **Audio Engine** | Web Audio API Realtime Synthesizer (Zero external audio assets required) |

---

## 📁 Project Structure

```text
gamify/
├── prisma/
│   ├── schema.prisma       # Complete schema (Users, Games, Characters, Reviews, Blogs, Settings)
│   └── seed.js             # Rich horror universe seed script (10 games, 6 characters, news, reviews)
├── src/
│   ├── app/
│   │   ├── (all 32 required pages & routes)
│   │   ├── api/            # Secure REST API endpoints (Auth, Games, Reviews, Blogs, Admin, Search)
│   │   ├── layout.tsx      # Root layout with fonts, cursor, audio, navigation
│   │   ├── page.tsx        # 13-section cinematic homepage
│   │   ├── not-found.tsx   # Custom 404 Abyss Page
│   │   └── error.tsx       # Custom error boundary
│   ├── components/         # Reusable horror UI components (HorrorCursor, AudioAtmosphere, GameCard...)
│   ├── lib/
│   │   ├── audio.ts        # Synthesized Web Audio drone engine
│   │   ├── auth.ts         # JWT session management & bcrypt hashing
│   │   ├── config.ts       # Global brand & owner configuration
│   │   └── prisma.ts       # Singleton Prisma client
│   └── styles/
│       └── globals.css     # Custom horror scrollbars, scanlines, glitch titles
├── scripts/
│   └── run-tests.js        # Automated integration test suite
├── .env.example            # Safe environment template
└── package.json
```

---

## 🚀 Quickstart & Installation

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/mradulkumar01/gamify.git
cd gamify
npm install
```

### 2. Configure Environment
Create `.env` from `.env.example`:
```bash
cp .env.example .env
```

### 3. Initialize & Seed Database
```bash
npx prisma db push
node prisma/seed.js
```

### 4. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Default Seed Credentials

For evaluation and testing:
- **Admin / Owner Account:**
  - Username: `mradulkumar`
  - Email: `mradul@afterdark.games`
  - Password: `DarkAbyss2026!`
  - Role: `ADMIN`
- **Author Account:**
  - Username: `gravekeeper`
  - Password: `DarkAbyss2026!`
  - Role: `AUTHOR`
- **Community User:**
  - Username: `abysswalker`
  - Password: `DarkAbyss2026!`
  - Role: `USER`

---

## 🧪 Testing & Quality Assurance

Run the automated integration test suite:
```bash
npm test
# Or: node scripts/run-tests.js
```
The test suite validates:
- Database connectivity & owner record verification (`MRADUL KUMAR`)
- Bcrypt password hash verification
- JWT token signing and decoding
- Game catalog verified storefront links (HTTPS validation)
- Lore character database associations
- Dynamic community review calculations
- Essay draft and moderation lifecycle
- Site settings key-value persistence

---

## 🚢 Production Deployment

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Connect a managed PostgreSQL database (e.g. Neon, Supabase, Vercel Postgres).
4. In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`.
5. Add your environment variables in Vercel Project Settings (`DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_NAME`, etc.).
6. Set build command to `npx prisma db push && node prisma/seed.js && next build`.

---

## ⚖️ Legal & Security Standards

- **Zero Piracy Policy:** AFTERDARK explicitly refuses to host, link, or facilitate unauthorized downloads or cracked game software.
- **Trademark Fair Use:** All game titles and trademarks are property of their respective owners (Konami, Capcom, Remedy, EA, SEGA, etc.) and referenced under critical review and educational conventions.
- **Creator Attribution:** Engineered, architected, and designed by **MRADUL KUMAR** (Founder, Creator & Developer).
