<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '@/lib/utils';

  let {
    variant = 'primary',
    disabled = false,
    onclick,
    class: className = '',
    children,
    ...rest
  }: {
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
    class?: string;
    children?: Snippet;
    [key: string]: any;
  } = $props();
</script>

<button
  {disabled}
  onclick={onclick}
  class={cn(
    'transition-all cursor-pointer font-semibold outline-none text-xs flex items-center justify-center select-none shrink-0',
    // Variants
    variant === 'primary' && 'px-4 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed',
    variant === 'secondary' && 'px-3.5 py-1.5 border border-divider bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed',
    variant === 'icon' && 'w-9 h-9 rounded-full border border-divider bg-surface hover:bg-hover text-foreground disabled:opacity-50 disabled:cursor-not-allowed',
    variant === 'ghost' && 'p-1 rounded-2xl text-muted hover:text-primary hover:bg-primary/10 transition-all',
    className
  )}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</button>
