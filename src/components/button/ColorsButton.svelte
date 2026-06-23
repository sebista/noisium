<script lang="ts">
  import { Paintbrush, Check } from 'lucide-svelte';
  import { theme } from '@/lib/theme.svelte';
  import { onMount, onDestroy } from 'svelte';
  import Button from '../ui/Button.svelte';

  const PRESETS = [
    { name: 'Blue', value: '#3584e4' },
    { name: 'Green', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
  ];

  let isOpen = $state(false);
  let containerEl = $state<HTMLDivElement | null>(null);

  function toggle(e: MouseEvent) {
    e.stopPropagation();
    isOpen = !isOpen;
  }

  function close() {
    isOpen = false;
  }

  function handleWindowClick(e: MouseEvent) {
    if (isOpen && containerEl && !containerEl.contains(e.target as Node)) {
      close();
    }
  }

  onMount(() => {
    window.addEventListener('click', handleWindowClick);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', handleWindowClick);
    }
  });
</script>

<div class="relative inline-block text-left" bind:this={containerEl}>
  <Button
    variant="icon"
    onclick={toggle}
    aria-label="Customize primary color"
    title="Customize theme color"
  >
    <Paintbrush class="w-4.5 h-4.5" />
  </Button>

  {#if isOpen}
    <div
      class="absolute right-0 mt-2 w-64 border border-divider rounded-2xl p-4 z-100 bg-surface text-foreground shadow-lg animate-in fade-in duration-150 focus:outline-none"
    >
      <span class="block text-xs font-bold mb-3 uppercase tracking-wider text-muted font-heading">
        Primary Color
      </span>

      <div class="grid grid-cols-6 gap-2 mb-4">
        {#each PRESETS as preset}
          {@const isActive = theme.primaryColor.toLowerCase() === preset.value.toLowerCase()}
          <button
            onclick={() => theme.setPrimaryColor(preset.value)}
            class="relative w-8 h-8 rounded-full cursor-pointer flex items-center justify-center focus:outline-none"
            style="background-color: {preset.value}"
            title={preset.name}
          >
            {#if isActive}
              <Check class="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
            {/if}
          </button>
        {/each}
      </div>

      <div class="h-px my-3 bg-divider"></div>

      <div class="flex items-center justify-between gap-3">
        <span class="text-xs font-semibold text-muted">
          Custom Color
        </span>
        <div class="flex items-center gap-2">
          <span class="font-mono text-xs text-muted uppercase">
            {theme.primaryColor}
          </span>
          <label
            class="relative w-8 h-8 rounded-full cursor-pointer block overflow-hidden focus:outline-none"
            style="background-color: {theme.primaryColor}"
          >
            <input
              type="color"
              value={theme.primaryColor}
              oninput={(e) => theme.setPrimaryColor((e.target as HTMLInputElement).value)}
              class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  {/if}
</div>
