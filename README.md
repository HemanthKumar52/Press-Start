# Press Start 2026

A gamified cyberpunk web experience designed to make users feel good, curious, and entertained at the start of the new year.

## Features
- **Landing Screen**: Neon cyberpunk aesthetics.
- **Boot Sequence**: Fun text-based loading interaction.
- **Account Creation**: Frictionless identity setup.
- **Skill Path**: Interactive skill selection game.
- **Terminal**: Encrypted message to self.
- **Profile Card**: Deterministic unique profile generation and download.

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS v4
- Framer Motion
- Zustand
- TypeScript

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure
- `app/components`: core UI components for each step.
- `app/store`: Zustand store for state management.
- `app/utils`: Helper functions (seeded generator).
