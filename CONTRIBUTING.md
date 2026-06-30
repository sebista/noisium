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

- Core UI elements are located in `src/components/ui/` (e.g., buttons, dialogs, sliders).
- Larger layout/structural components are directly in `src/components/` (e.g., `Header.svelte`, `Footer.svelte`, `Sidebar.svelte`, `Main.svelte`).

### Styling

- Use already defined Tailwind v4 theme utility classes (e.g., `bg-background`, `bg-surface`, `bg-panel`, `border-divider`, `text-foreground`, `text-muted`, `bg-slider-track`, `bg-inactive-thumb`) configured in the `@theme` directive in [src/index.css](src/index.css) rather than manually tracking theme states.
- For hover states, use `hover:bg-hover` for general neutral elements, or `hover:bg-primary-hover` if the element uses the modifiable theme primary color, to maintain a unified look.
- Use `rounded-2xl` as the standard border radius for containers, buttons, cards, and modal dialogs. Use `rounded-full` for circular shapes (toggles, sliders, status counts).
- Refrain from using enlarging or scaling effects (e.g., `hover:scale-110` or `focus:scale-110`) on hover/focus states for buttons, slider thumbs, or other interactive elements. Keep component dimensions stable.

### Imports

Use the `@/` path alias to reference files relative to the `src/` directory if they are outside the current file directory:

```typescript
import { audio } from '@/lib/audio.svelte'
import { cn } from '@/lib/utils'
```

### Commits

We use concise semantic commit prefixes for all changes. See [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/#summary).
