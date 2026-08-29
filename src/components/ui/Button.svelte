<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '@/lib/utils';

  interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
    href?: string;
    target?: string;
    rel?: string;
    title?: string;
    type?: 'button' | 'submit' | 'reset';
    autofocus?: boolean;
    class?: string;
    children?: Snippet;
    'aria-label'?: string;
    'aria-expanded'?: boolean | 'true' | 'false';
    'aria-haspopup'?: boolean | 'dialog' | 'menu' | 'true' | 'false';
    [key: string]: unknown;
  }

  let {
    variant = 'primary',
    disabled = false,
    onclick,
    href,
    type = 'button',
    class: className = '',
    children,
    ...rest
  }: ButtonProps = $props();

  const buttonClasses = $derived(cn(
    'cursor-pointer font-semibold outline-none text-xs flex items-center justify-center select-none shrink-0',
    // Variants
    variant === 'primary' && 'px-4 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed',
    variant === 'secondary' && 'px-3.5 py-1.5 border border-divider bg-surface hover:bg-hover text-foreground rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed',
    variant === 'icon' && 'w-9 h-9 rounded-full border border-divider bg-surface hover:bg-hover text-foreground disabled:opacity-50 disabled:cursor-not-allowed',
    variant === 'ghost' && 'p-1 rounded-2xl text-muted hover:text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-muted',
    className
  ));
</script>

{#if href}
  <a
    {href}
    onclick={onclick}
    class={buttonClasses}
    {...rest}
  >
    {#if children}
      {@render children()}
    {/if}
  </a>
{:else}
  <button
    {disabled}
    onclick={onclick}
    class={buttonClasses}
    {...rest}
  >
    {#if children}
      {@render children()}
    {/if}
  </button>
{/if}
