<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '@/lib/utils';
  import { onMount, onDestroy } from 'svelte';

  let {
    open = $bindable(false),
    align = 'end',
    class: className = '',
    mobileCenter = false,
    trigger,
    children,
    onclose
  }: {
    open?: boolean;
    align?: 'start' | 'end' | 'center';
    class?: string;
    mobileCenter?: boolean;
    trigger: Snippet<[{ open: boolean; toggle: (e: MouseEvent) => void }]>;
    children: Snippet<[{ close: () => void }]>;
    onclose?: () => void;
  } = $props();

  let containerEl = $state<HTMLDivElement | null>(null);
  let mobileTop = $state<number>(0);

  function updatePosition() {
    if (containerEl) {
      const rect = containerEl.getBoundingClientRect();
      mobileTop = rect.bottom + 8;
    }
  }

  function toggle(e: MouseEvent) {
    e.stopPropagation();
    open = !open;
    if (open) {
      updatePosition();
    } else if (onclose) {
      onclose();
    }
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

  function handleOutsideClick(e: MouseEvent | TouchEvent) {
    if (open && containerEl && !containerEl.contains(e.target as Node)) {
      close();
    }
  }

  $effect(() => {
    if (open) {
      updatePosition();
    }
  });

  onMount(() => {
    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('touchstart', handleOutsideClick, { passive: true });
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', updatePosition);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('touchstart', handleOutsideClick);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('resize', updatePosition);
    }
  });
</script>

<div class="relative inline-block text-left" bind:this={containerEl}>
  {@render trigger({ open, toggle })}

  {#if open}
    <!-- Popover Panel -->
    <div
      class={cn(
        'border border-divider rounded-2xl bg-surface text-foreground py-3',
        'animate-in fade-in zoom-in-95 duration-150 focus:outline-none z-100',
        mobileCenter
          ? [
              'fixed top-[var(--popover-mobile-top)] left-1/2 -translate-x-1/2',
              'xs:absolute xs:top-auto xs:left-auto xs:translate-x-0 xs:mt-2',
              align === 'start' && 'xs:left-0 xs:right-auto',
              align === 'end' && 'xs:right-0 xs:left-auto',
              align === 'center' && 'xs:left-1/2 xs:-translate-x-1/2'
            ]
          : [
              'absolute top-auto mt-2',
              align === 'start' && 'left-0 right-auto',
              align === 'end' && 'right-0 left-auto',
              align === 'center' && 'left-1/2 -translate-x-1/2'
            ],
        className
      )}
      style={mobileCenter && mobileTop ? `--popover-mobile-top: ${mobileTop}px;` : undefined}
      role="dialog"
      aria-modal="false"
    >
      {@render children({ close })}
    </div>
  {/if}
</div>
