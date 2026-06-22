# Contributing

Thank you for your interest in contributing! Here is a quick guide to the development standards and practices used in this codebase. :^)

### Packages

Use [Bun](https://bun.sh/) as the package manager for installing dependencies and running scripts:

```bash
bun install
bun run dev
bun run build
```

### Components

- UI elements in `src/components/ui/` (e.g., buttons, cards).
- Larger structural layouts in `src/components/layout/` (e.g., sidebar, header, footer).
- Barrel components from their respective folders using entry `index.ts` files to simplify imports.

### Styling

- Use already defined theme variables (e.g., `bg-background`, `bg-surface`, `bg-panel`, `border-divider`, `text-foreground`, `text-muted`, `bg-slider-track`, `bg-inactive-thumb`, `bg-hover`) defined in [src/index.css](src/index.css) rather than manually checking `darkMode` state.
- Use `rounded-2xl` as the standard border radius for containers, buttons, cards, and modal dialogs. Use `rounded-full` for circular shapes (toggles, sliders, status counts).
- Refrain from using enlarging or scaling effects (e.g., `hover:scale-110` or `focus:scale-110`) on hover/focus states for buttons, slider thumbs, or other interactive elements. Keep component dimensions stable.

### Imports

Use the `@/` path alias to reference files relative to the `src/` directory if they are outside the current file directory:

```typescript
import { useAudio } from '@/context/AudioContext'
import { cn } from '@/lib/utils'
```

### Commits

We use concise semantic commit prefixes for all changes. See [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/#summary).
