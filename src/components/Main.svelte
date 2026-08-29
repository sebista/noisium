<script lang="ts">
  import { audio } from '@/lib/audio.svelte';
  import { CATEGORIES } from '@/lib/sounds';
  import { cn } from '@/lib/utils';
  import SoundCard from './ui/SoundCard.svelte';
  import PresetsButton from './button/PresetsButton.svelte';
  import AddSoundButton from './button/AddSoundButton.svelte';

  let filteredSounds = $derived(
    audio.allSounds.filter(
      (s) => audio.activeCategory === 'all' || s.category === audio.activeCategory
    )
  );
</script>

<main class="grow p-4 lg:p-6 pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))] overflow-y-auto max-h-full flex flex-col">
  <!-- Mobile Top Bar (Presets & Add Sound) -->
  <div class="flex lg:hidden items-center justify-between mb-4 shrink-0">
    <span class="text-xs font-bold text-muted uppercase tracking-wider">
      Mix Settings
    </span>

    <div class="flex items-center gap-2">
      <!-- Mobile Presets Dropdown -->
      <PresetsButton
        align="end"
        class="px-2.5 py-1.5 gap-1"
        iconSize={3}
      />

      <AddSoundButton showText={false} class="px-2.5 py-1.5" />
    </div>
  </div>

  <!-- Mobile Horizontal Category Bar -->
  <div class="flex lg:hidden items-center gap-2 overflow-x-auto pb-4 mb-2 scrollbar-none shrink-0 -mx-4 px-4">
    {#each CATEGORIES as cat}
      {@const IconComponent = cat.icon}
      {@const isActive = audio.activeCategory === cat.id}
      {@const soundCount = audio.activeSoundCounts[cat.id]}

      <button
        onclick={() => (audio.activeCategory = cat.id)}
        class={cn(
          'flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border select-none shrink-0 min-h-9',
          isActive
            ? 'bg-primary text-white border-primary'
            : 'bg-surface hover:bg-hover border-divider text-foreground'
        )}
      >
        <IconComponent class="w-4 h-4 shrink-0" />
        <span>{cat.label}</span>
        {#if soundCount > 0}
          <span
            class={cn(
              'h-4 min-w-4 px-1 flex items-center justify-center text-xs font-bold leading-none rounded-full tabular-nums shrink-0',
              isActive ? 'bg-white text-primary' : 'bg-primary text-white'
            )}
          >
            {soundCount}
          </span>
        {/if}
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-6">
    {#each filteredSounds as sound (sound.id)}
      <SoundCard {sound} />
    {/each}
  </div>
</main>
