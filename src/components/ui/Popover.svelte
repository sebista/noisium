<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '@/lib/utils';
  import { onMount, onDestroy } from 'svelte';

  let {
    open = $bindable(false),
    align = 'end',
    class: className = '',
    trigger,
    children,
    onclose
  }: {
    open?: boolean;
    align?: 'start' | 'end' | 'center';
    class?: string;
    trigger: Snippet<[{ open: boolean; toggle: (e: MouseEvent) => void }]>;
    children: Snippet<[{ close: () => void }]>;
    onclose?: () => void;
  } = $props();

  let containerEl = $state<HTMLDivElement | null>(null);

  function toggle(e: MouseEvent) {
    e.stopPropagation();
    open = !open;
    if (!open && onclose) onclose();
  }

  function close() {
    if (open) {
      open = false;
      if (onclose) onclose();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      close();
    }
  }

  function handleOutsideClick(e: MouseEvent) {
    if (open && containerEl && !containerEl.contains(e.target as Node)) {
      close();
    }
  }

  onMount(() => {
    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleKeydown);
    }
  });
</script>

<div class="relative inline-block text-left" bind:this={containerEl}>
  {@render trigger({ open, toggle })}

  {#if open}
    <!-- Mobile Backdrop for touch clarity and click-away -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="fixed inset-0 bg-black/30 backdrop-blur-xs z-90 sm:hidden animate-in fade-in duration-150"
      onclick={close}
      aria-hidden="true"
    ></div>

    <!-- Popover Panel -->
    <div
      class={cn(
        'fixed top-[calc(4rem+env(safe-area-inset-top)+0.5rem)] left-1/2 -translate-x-1/2 z-100',
        'border border-divider rounded-2xl bg-surface text-foreground py-3',
        'animate-in fade-in zoom-in-95 duration-150 focus:outline-none',
        'sm:absolute sm:top-auto sm:left-auto sm:translate-x-0 sm:mt-2',
        align === 'start' && 'sm:left-0 sm:right-auto',
        align === 'end' && 'sm:right-0 sm:left-auto',
        align === 'center' && 'sm:left-1/2 sm:-translate-x-1/2',
        className
      )}
      role="dialog"
      aria-modal="true"
    >
      {@render children({ close })}
    </div>
  {/if}
</div>
