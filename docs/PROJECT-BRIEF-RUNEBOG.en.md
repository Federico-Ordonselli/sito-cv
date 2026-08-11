# Runebog GM — project brief for the CV site

**What this file is.** The reference description of a personal project of mine, written to
be handed to Claude Code in the repository of my CV site. Its purpose is to produce a
page, a portfolio entry or a CV paragraph **without inventing anything**.

(The Italian original is `SCHEDA-PROGETTO-RUNEBOG.md`. When the two disagree, the Italian
one is the source — this is a translation of it.)

**Rules for whoever reads this, agents included.**

- This file is the source. If a fact is not here, **do not infer it** — ask me.
  Specifically absent, and not to be invented: user counts, traffic, awards, clients,
  hours spent, "used by studios/clubs".
- The figures were **measured on the stated date**. Quote them as orders of magnitude
  ("over 100 tests", "around 330 monster stat blocks") if the copy needs to age well.
- The licence must be stated exactly as written in its section. It is a legal fact.
- Brief last updated: **11 August 2026**.

---

## 1. Ready-to-use summaries

### One line
Runebog GM — a web app for tabletop RPG Game Masters: nested campaign maps, an Italian
D&D 5e bestiary and rules reference, and a read-only shared table for players.

### ~40 words
A web app for tabletop RPG Game Masters: infinitely nested maps of cities and dungeons,
Italian D&D 5e SRD monster stat blocks, a deterministic dungeon generator, and a
read-only shared table for players. Next.js 15 and Postgres for the site; framework-free
vanilla JavaScript for the editor.

### ~120 words
Runebog GM is a tool for tabletop RPG Game Masters, born for a one-shot session and grown
into a full application. At its core is a map of nestable "bubbles" with no depth limit —
a world holds nations, a city holds districts, a building holds rooms — with walls, doors,
a to-scale grid and a combat mode. A secret link opens a **read-only table** for the
players, where what they can see is rebuilt field by field on the server. It ships the
bestiary and ten chapters of the D&D 5e SRD 5.2.1 in Italian, extracted from the official
PDF by a purpose-built script, and works offline as an installable PWA. The site is
Next.js 15 on Postgres; the editor is vanilla JavaScript, no framework and no build step.

---

## 2. What it does, for a non-technical reader

- **Nested maps.** Every "bubble" is a place that can contain more of them, with no depth
  limit. The scale runs from *world* to *room* and can be widened after the fact (zooming
  out turns a campaign that started as a city into a region).
- **Playable floor plans.** Free-standing walls, typed doors (open, closed, locked,
  secret), a to-scale grid (1 square = 1.5 m), and a combat mode with tokens and an
  initiative order.
- **A table for the players.** A shareable link shows only what the GM has revealed:
  separate player-facing notes, invisible secret passages, secret doors rendered as solid
  wall.
- **D&D 5e content in Italian.** 331 monster stat blocks and ten rules chapters
  (SRD 5.2.1, 2024 edition), with cross-chapter title search and navigable cross-references.
- **A dungeon generator**, deterministic from a seed, importable into a campaign as a
  bubble complete with real walls.
- **Table-side tools**: a ruler in metres, areas of effect (circle, cone, line, square), a
  dice roller, a quest journal, a checklist, a player roster.
- **Offline and installable.** The editor runs without a network as a PWA; the rules are
  downloaded on request, with their size stated up front.
- **Twelve visual themes**, each automatically checked for WCAG contrast.

---

## 3. Technical stack

| Area | Choice |
|---|---|
| Site | Next.js 15 (App Router), React 19, TypeScript |
| Authentication | Auth.js v5 — Google OAuth + credentials, JWT sessions, scrypt from the standard library |
| Database | Neon Postgres, Drizzle ORM, versioned SQL migrations |
| Editor | Vanilla JavaScript in ES modules — no framework, no runtime dependencies, no build step |
| Map rendering | Hand-written SVG, pan/zoom via `viewBox`, Pointer Events |
| Offline | Service worker **generated at build time** (file list and versions are content hashes), PWA manifest |
| Tests | `node:test`, pure tests with no DOM and no dependencies |
| CI | GitHub Actions: typecheck + tests + build on every push and PR |
| Deployment | Vercel, `runebog.app` domain (entirely on free tiers: Vercel Hobby + Neon free) |

---

## 4. The decisions worth talking about

These are the "interview" points: each one is a decision with a reason behind it, not a
feature.

1. **One JSON for everything.** A campaign's state is a single serialisable object: the
   same shape for export, for the database's JSONB column, and for injection into the page.
   Export becomes trivial and import symmetrical; there is no second representation to keep
   in sync.
2. **Two applications, one format.** The site (Next.js) and the editor (vanilla) share only
   the document contract, defined in a dependency-free module used by both sides. The
   stated rule: *strict on write, tolerant on read* — the API rejects a malformed document
   with a 422, but no read path ever throws, because an error there would lock the players
   out.
3. **Optimistic concurrency done properly.** Every save declares the revision it started
   from, and the condition lives **inside** the `UPDATE` (`WHERE id AND user_id AND
   revision = base`): zero rows updated *is* the conflict. Verified with genuinely
   concurrent requests against a throwaway database branch — eight writes from the same
   base yield exactly one winner, whereas the same route written read-then-write lets six
   through.
4. **No automatic merge, no silent data loss.** On conflict the local copy is written
   *before* the request goes out, and the user picks between three explicit actions, with
   both titles and both timestamps in front of them.
5. **The players' table is a projection, not a client-side filter.** Players receive only
   what the server rebuilds field by field: IDs resolved to names, GM notes stripped,
   secret passages absent. Polling is conditional (the ETag is the revision number, with
   weak comparison per RFC 9110).
6. **PDF → JSON: a purpose-built extractor.** The rules chapters and the 331 monster stat
   blocks are extracted from the official PDF by my own scripts, because in that document
   the semantics live in the *fonts and colours*, not the text: headings recognised by the
   relationship between RGB channels, tables reconstructed from column geometry, ligatures
   and Private Use Area codepoints resolved by hand. Every chapter passes through a
   verifier that diffs it against `pdftotext` before being published.
7. **Accessibility measured, not claimed.** A script compares the WCAG contrast ratios of
   every colour pair across twelve themes and fails below threshold; accent families are
   compared in Lab ΔE, because the WCAG ratio calls two different hues of the same
   luminance identical. 44px touch targets are declared by **role**, not by CSS class.
8. **Few tests, but on the right invariants.** No surface-level tests: they cover JSON
   serialisation inside `<script>` tags (XSS), the player-facing projection as a whitelist,
   sanitisation of untrusted input, the dungeon generator's determinism, and the agreement
   between the two lists of shapes which, were they to diverge, would bounce a perfectly
   legitimate campaign.
9. **Documentation as part of the work.** The repository keeps an extensive `CLAUDE.md`
   recording invariants, traps already paid for, and *the direction in which it is
   acceptable to be wrong* for each decision — written so the project can be picked up
   cold.

---

## 5. Verified figures

Measured on **11 August 2026** by running the repository's own commands.

| Item | Value |
|---|---|
| First commit | 13 July 2026 |
| Total commits | 155 |
| Site code (TypeScript/TSX) | ~6,200 lines across 59 files |
| Editor code (JS, dataset excluded) | ~7,500 lines across 28 ES modules |
| Automated tests | 104, all passing |
| Italian SRD monster stat blocks | 331 |
| Published rules chapters | 10 (plus the legal information page) |
| Visual themes | 12 |
| Runtime dependencies | 7 (`next`, `react`, `react-dom`, `next-auth`, `@auth/drizzle-adapter`, `drizzle-orm`, `@neondatabase/serverless`) |
| Editor dependencies | 0 |

Sole author: **Federico Ordonselli**. A personal project, not commissioned work.

---

## 6. Demonstrable skills (CV tags)

`Next.js 15` · `React 19` · `TypeScript` · `PostgreSQL` · `Drizzle ORM` · `Auth.js / OAuth`
· `vanilla JavaScript / ES modules` · `SVG` · `Pointer Events` · `PWA / service workers`
· `optimistic concurrency` · `REST API design` · `application security (XSS,
authorisation, password hashing)` · `WCAG accessibility` · `PDF parsing` · `deterministic
algorithms (procedural generation)` · `CI/CD (GitHub Actions, Vercel)` ·
`technical writing`

---

## 7. Links, licences, attributions

- Site: **https://runebog.app**
- Repository: **https://github.com/Federico-Ordonselli/runebog-gm**
- Contact published by the project: `support@runebog.app`

**Careful — these are legal facts and must be reported as written:**

- The **code** is released under **PolyForm Noncommercial 1.0.0**: commercial use is not
  permitted. **Do not write "open source"** without qualifying it — PolyForm is not an
  OSI-approved licence. A short usable phrasing: *"source-available, non-commercial licence
  (PolyForm Noncommercial 1.0.0)"*. Versions distributed before 29 July 2026 were MIT and
  that grant remains valid.
- The **SRD content** (monster stat blocks, rules chapters) is **CC-BY-4.0** and does allow
  commercial use. If the CV page quotes or displays that content, the attribution must be
  kept: it is a condition of the licence.
- D&D and its trademarks are not mine: the project uses the SRD 5.2.1, material provided
  under licence. Do not present it as an official or affiliated product.

---

## 8. What NOT to write

- ❌ "open source" without qualification (see above) — ❌ "MIT licensed" (no longer true).
- ❌ User counts, downloads, traffic, ratings: I have no public ones.
- ❌ "commercial product", "startup", "paid SaaS": it is free and non-commercial, with a
  donations page.
- ❌ "native mobile app": it is an installable PWA, not a store app.
- ❌ "built with React" applied to the editor: the site is React, the **editor is vanilla** —
  and that is a deliberate choice, not a shortcoming.
- ❌ "official D&D product" or "Wizards of the Coast".
- ❌ File names, internal paths or repository details in public copy: they are here to
  explain, not to be published.

---

## 9. How to refresh this brief

In the Runebog repository (`runebog-web`), after significant changes:

```bash
npm test                     # test count
git rev-list --count HEAD    # commits
find src -name '*.ts' -o -name '*.tsx' | xargs wc -l | tail -1
```

The full architectural context lives in the repository's `CLAUDE.md` and the work log in
`TODO.md`; this brief is their publishable summary. When they disagree, the repository
wins.
