<script lang="ts">
  import { audio } from '@/lib/audio.svelte';
  import { CATEGORIES } from '@/lib/sounds';
  import { cn } from '@/lib/utils';
</script>

<aside class="hidden lg:flex w-56 border-r border-divider bg-panel dark:bg-panel/85 flex-col p-3 shrink-0 select-none">
  <div class="flex flex-col gap-1">
    {#each CATEGORIES as cat}
      {@const IconComponent = cat.icon}
      {@const isActive = audio.activeCategory === cat.id}
      {@const soundCount = audio.allSounds.filter((s) => {
        const state = audio.soundStates[s.id];
        return state?.active && (cat.id === 'all' || s.category === cat.id);
      }).length}

      <button
        onclick={() => audio.activeCategory = cat.id}
        class={cn(
          'w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left text-xs font-semibold transition-all cursor-pointer select-none border-0 bg-transparent outline-none',
          isActive
            ? 'bg-primary text-white'
            : 'hover:bg-hover hover:text-foreground text-foreground/80'
        )}
      >
        <div class="flex items-center gap-2.5">
          <IconComponent class="w-4.5 h-4.5 shrink-0" />
          <span>{cat.label}</span>
        </div>
        {#if soundCount > 0}
          <span
            class={cn(
              'text-[9px] font-bold px-2 py-0.5 rounded-full',
              isActive ? 'bg-white text-primary' : 'bg-primary text-white'
            )}
          >
            {soundCount}
          </span>
        {/if}
      </button>
    {/each}
  </div>
</aside>
