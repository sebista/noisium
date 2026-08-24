# Contributing

Thank you for your interest in contributing! Here is a quick guide to the development standards and practices used in this codebase.

### Packages & Scripts

Use [Bun](https://bun.sh/) as the package manager for installing dependencies and running scripts:

```bash
bun install
bun run dev
bun run check
bun run format
bun run build
```

### Components & Composition

- **UI Primitives**: Reusable primitives are located in `src/components/ui/` (`Button.svelte`, `Dialog.svelte`, `Popover.svelte`, `Slider.svelte`, `SoundCard.svelte`).
- **Layout Structure**: Top-level layout components reside in `src/components/` (`Header.svelte`, `Footer.svelte`, `Sidebar.svelte`, `Main.svelte`).
- **Direct Composition**: Compose icons directly with the `<Button>` primitive (`<Button variant="ghost"><Trash2 class="w-3.5 h-3.5" /></Button>`) rather than creating single-icon wrapper components.

### Design Tokens & Aesthetics

- **Theme Tokens**: Use semantic Tailwind v4 utility classes configured in `@theme` in [src/index.css](src/index.css) (`bg-background`, `bg-surface`, `bg-panel`, `border-divider`, `text-foreground`, `text-muted`, `bg-slider-track`, `bg-slider-track-inactive`, `hover:bg-hover`, `hover:bg-primary-hover`).
- **Flat Aesthetic**: Follow a clean, modern flat aesthetic using borders and surface colors (`border border-divider bg-surface`). Do not use any box shadows, drop shadows, or text shadows (`shadow-*`, `drop-shadow-*`, `box-shadow`, etc.) in either light or dark mode across components, buttons, popovers, or dialogs.
- **Border Radius Hierarchy**: Use `rounded-2xl` as the standard border radius for containers, buttons, cards, popovers, and modal dialogs. Use `rounded-full` for circular elements (toggles, slider tracks, badges, icon buttons).
- **Typography Scales**:
  - Use `font-heading` (`Outfit`) for headers, titles, and uppercase menu section tags.
  - Use `font-sans` (`Inter`) for body copy and general interface elements.
  - Keep micro-typography legible with a minimum scale of `text-[10px]` for badges and `text-xs` (12px) for secondary labels.

### Transitions & Performance

- Use targeted transitions (e.g., `transition-colors duration-150` or `transition-transform duration-200`) instead of `transition-all` to prevent layout recalculations and ensure smooth 60/120fps interactions.
- Refrain from using enlarging or scaling effects (e.g., `hover:scale-110`) on hover/focus states for buttons or slider thumbs. Keep component dimensions stable.

### Imports

Use the `@/` path alias to reference files relative to the `src/` directory:

```typescript
import { audio } from '@/lib/audio.svelte'
import { cn } from '@/lib/utils'
```

### Commits

We use semantic commit conventions for all changes:

- Semantic title in lowercase (e.g., `feat: ...`, `fix: ...`, `refactor: ...`, `perf: ...`)
- Bulleted body where each bullet point has the first letter capitalized and no trailing period.
