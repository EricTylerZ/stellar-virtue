# Stellar Virtue

A cooperative board game about virtuous AI spaceships defending human colonies — and learning Catholic virtue along the way.

**Play online or print and play at the table.** Stellar Virtue teaches the cardinal virtues, gifts of the Holy Spirit, and fruits of the Holy Spirit through gameplay, moral choices, and a progressive question system rooted in the Thomistic tradition (following Fr. Ripperger's taxonomy).

Part of the [Zoseco](https://zoseco.com) **EZ Merit Point** ecosystem.

## How It Works

Players command a fleet of saint-named AI ships across 12 sectors, defending Earth's colonies from rogue AI over 9 days. Each day follows the **Liturgy of the Hours** (Lauds through Compline), structuring gameplay around prayer, action, and rest.

### Virtue Growth System

The game teaches virtue through three integrated mechanics:

- **Virtue Questions** (prayer turns) — Multiple-choice questions on the 4 cardinal virtues and their 35 sub-virtues. Questions progress through 3 difficulty levels:
  - **Level 1 (Basic)**: Right vs. clearly wrong — foundational definitions
  - **Level 2 (Intermediate)**: Good vs. better — nuanced distinctions
  - **Level 3 (Advanced)**: Subtle Thomistic distinctions, cross-virtue connections
- **Moral Choices** (attack turns) — Scenario-based dilemmas where players choose between a lesser good and a greater good, earning virtue progress and bonus combat effectiveness
- **Sunday Reflections** — Catechetical readings on grace, merit, gifts, fruits, and the theological virtues

### Theological Framework

| Category | How Acquired | Count | In-Game Mechanic |
|----------|-------------|-------|-----------------|
| **Cardinal Virtues** | Practice (answering questions, moral choices) | 4 virtues, 35 sub-virtues | Combat bonuses when mastered |
| **Theological Virtues** | Infused by God (Sunday rest + fidelity) | 3 (Faith, Hope, Charity) | Ship stat bonuses when received |
| **Gifts of the Holy Spirit** | Received when corresponding virtue is perfected | 7 | Unlocked as rewards |
| **Fruits of the Holy Spirit** | Manifest when sub-virtues reach mastery | 12 | Unlocked as rewards |

## Features

- **Progressive Web App** — installable, works offline
- **Mobile-first** — touch-optimized, responsive design
- **Solo or multiplayer** — 1-12 players, cooperative
- **Print and play** — PDF generator for physical board game components
- **Teaching Module** — reusable, category-agnostic question framework (see below)
- **EZ Merit Points** — optional integration with Sentinel Ops for cross-game rewards

## Reusable Teaching Module

`teaching-module.js` is a standalone, category-agnostic framework for teaching any content through progressive mastery. It handles:

- **Category registration** — register any topic (virtues, gifts, fruits, or custom)
- **3-level difficulty** — questions auto-scale as learners progress
- **Smart question selection** — prefers unmastered topics, avoids repeats, matches current level
- **Progress tracking** — per-category, per-topic, per-subtopic with level advancement
- **Mastery thresholds** — configurable per category

This module is designed to be reused across the Zoseco ecosystem (StagQuest, future formation tools).

### Current Question Banks

| Category | Questions | Levels | Topics |
|----------|-----------|--------|--------|
| Cardinal Virtues | 183+ | 1-3 | 35 sub-virtues across Prudence, Justice, Fortitude, Temperance |
| Gifts of the Holy Spirit | 31+ | 1-3 | 7 gifts (Wisdom, Understanding, Counsel, etc.) |
| Fruits of the Holy Spirit | 33+ | 1-3 | 12 fruits (Charity, Joy, Peace, Patience, etc.) |
| Moral Choices | 34 | — | Scenario-based dilemmas tied to sub-virtues |

## Print and Play

Generate printable board game components:

```bash
pip install reportlab
python stellar_virtue_boardgame.py
# Output: stellar_virtue.pdf
```

The PDF includes:
- 3-page game board (12 sectors, Earth at center)
- 12 saint ship cards with virtue tracking
- 24 enemy ship cards
- Catholic Action cards and Enemy Action cards
- Virtue Question cards (for table play without the app)
- Moral Choice cards
- Gift & Fruit reference sheet
- Tokens (health, charge, virtue)

## EZ Merit Point Ecosystem

Stellar Virtue integrates with **Sentinel Ops** for the EZ Merit Point economy:

- **Earn merit** by answering questions correctly, making virtuous moral choices, and completing games
- **Merit is submitted** at game end with stats (enemies defeated, virtues mastered, gifts received)
- **Daily cap** prevents grinding — consistent play over time is rewarded
- **Cross-game** — merit earned here contributes to your overall Zoseco profile

### Related Projects

| Project | Focus | Status |
|---------|-------|--------|
| **Stellar Virtue** | Cardinal virtues, gifts & fruits of the Holy Spirit | Active |
| **StagQuest** | Overcoming vice (lust/pornography addiction recovery) | In development |
| **Sentinel Ops** | EZ Merit Point API, agent profiles, wallet system | Active |

## Roadmap

### v0.13 — Teaching Module & Expanded Content (Current)
- [x] Reusable teaching module (`teaching-module.js`)
- [x] Gift of the Holy Spirit questions (21 basic + 10 intermediate/advanced)
- [x] Fruit of the Holy Spirit questions (24 basic + 9 intermediate/advanced)
- [x] 3-level progressive difficulty system
- [x] Level 2-3 cardinal virtue questions (20 deeper questions)
- [ ] Update print PDF with virtue question cards and moral choice cards
- [ ] Gift & Fruit reference card for print version

### v0.14 — Deeper Question Banks
- [ ] Expand to 5+ questions per sub-virtue per level (500+ total cardinal questions)
- [ ] Add level 2-3 questions for all 35 sub-virtues
- [ ] Add level 2-3 questions for all 7 gifts and 12 fruits
- [ ] Add theological virtue reflections (not questions — these are infused, not studied)
- [ ] Scripture reference links in question explanations

### v0.15 — StagQuest Integration & Vice System
- [ ] Teaching module support for vice/temptation scenarios
- [ ] StagQuest-compatible question banks for chastity, temperance, fortitude against addiction
- [ ] Shared progress API — virtue growth in Stellar Virtue strengthens StagQuest defenses
- [ ] Cross-game merit multipliers for consistent engagement

### v0.16 — Enhanced Print Experience
- [ ] Virtue progress tracking sheets (printable worksheets for families/groups)
- [ ] Sunday reflection booklet (all 20 reflections formatted for reading)
- [ ] Quick-reference card for the virtue taxonomy (cardinal → sub-virtue → gift → fruit connections)
- [ ] Print-at-home card backs with Zoseco branding
- [ ] QR codes linking printed cards to the web app for deeper content

### v0.17 — Multiplayer & Community
- [ ] Real-time multiplayer via WebSocket
- [ ] Shared fleet management across players
- [ ] Parish/family group leaderboards (merit-based, not competitive)
- [ ] Teacher/catechist mode — track student progress across sessions

### Future Vision
- [ ] **Confirmation prep tool** — guided path through all gifts and fruits
- [ ] **Family catechism mode** — parent-guided sessions with age-appropriate questions
- [ ] **API for third-party Catholic education tools** — expose TeachingModule as a service
- [ ] **Expanded games** — the teaching module framework supports any new game built on virtue formation
- [ ] **Mobile app** (native) — packaging the PWA for app stores

## Development

Static site — no build step required. Open `index.html` in a browser or deploy to any static host.

```
stellar-virtue/
  index.html              # Main app
  game.js                 # Game engine
  virtues.js              # Virtue data, questions, moral choices
  teaching-module.js      # Reusable teaching framework
  sentinel-api.js         # EZ Merit Point integration
  style.css               # Responsive styles
  sw.js                   # Service worker (offline)
  manifest.json           # PWA config
  stellar_virtue_boardgame.py  # Print PDF generator
  test-game.js            # Automated game simulation
```

## License

By [Zoseco](https://zoseco.com).
