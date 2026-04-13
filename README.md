# QMee — Intelligent AI Assistant (Frontend Redesign)

A modern, premium redesign of the QMee AI assistant frontend. Built with React, Vite, Tailwind CSS v4, and Framer Motion.

## Live Demo

**Production:** [https://qmee.netlify.app/](https://qmee.netlify.app/)

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + Vite 8 | Application framework |
| Tailwind CSS v4 | Utility-first styling with custom design tokens |
| Framer Motion | Entrance animations & micro-interactions |
| React Router DOM v7 | Client-side routing |
| Lucide React | Iconography |

## Design Principles

- **Off-white base** (`#F7F7FC`) — never pure black by default
- **Brand gradient** (`#6C55F5 → #06B6D4`) — consistent across buttons, icons, accents
- **Subtle depth** — card shadows, backdrop blur for navbar, layered backgrounds
- **Motion with purpose** — staggered reveal animations, hover lifts, smooth transitions

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — Hero, Features, How it Works, Testimonials, FAQ, CTA |
| `/chat` | Interactive chat interface with mock AI responses |
| `/share` | Public conversation hub — profile, syntax-highlighted code threads, share actions |

## Project Structure

```
src/
├── pages/          # Route-level pages
├── components/     # Reusable UI components
│   └── ui/         # Primitive UI pieces (Button, Badge, AnimatedSection)
├── data/           # Mock content (features, testimonials, FAQ, steps)
└── index.css       # Tailwind v4 + design tokens (@theme)
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deployment

This project is configured for zero-config deployment on Vercel or Netlify.

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=dist
```

## Disclaimer

QMee can generate inaccurate responses. Always verify important information through independent sources.
