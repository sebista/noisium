<script lang="ts">
  import { audio } from '@/lib/audio.svelte';
  import { cn } from '@/lib/utils';
  import type { SoundDefinition } from '@/types';
  import Slider from './Slider.svelte';
  import Button from './Button.svelte';
  import { Trash2 } from 'lucide-svelte';

  let { sound }: { sound: SoundDefinition } = $props();

  let state = $derived(audio.soundStates[sound.id] || { active: false, volume: 50 });
  let IconComponent = $derived(sound.icon);
</script>

<div
  class={cn(
    'border rounded-2xl p-4 flex flex-col justify-between relative group select-none transition-colors duration-150 text-foreground',
    state.active
      ? 'bg-primary/10 border-primary'
      : 'bg-surface border-divider hover:bg-hover'
  )}
>
  <!-- Card Top: Toggle sound active -->
  <button
    onclick={() => audio.toggleSound(sound.id)}
    class="flex items-start justify-between cursor-pointer select-none mb-4 w-full text-left bg-transparent border-0 p-0 outline-none rounded-2xl"
    aria-checked={state.active}
    role="switch"
    aria-label="Toggle {sound.name}"
  >
    <div class="flex items-center gap-3">
      <div
        class={cn(
          'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
          state.active ? 'bg-primary text-white' : 'bg-foreground/5 text-muted',
          state.active && audio.isPlaying && 'animate-pulse-slow'
        )}
      >
        <IconComponent class="w-5 h-5 shrink-0" />
      </div>
      <div class="flex flex-col">
        <span class="font-semibold text-xs leading-tight tracking-wide">
          {sound.name}
        </span>
        <span class="text-xs text-muted capitalize">
          {sound.category}
        </span>
      </div>
    </div>

    <!-- Toggle switch visual -->
    <div
      class={cn(
        'w-7.5 h-4.5 rounded-full p-0.5 transition-colors shrink-0 flex items-center',
        state.active ? 'bg-primary' : 'bg-divider'
      )}
    >
      <div
        class={cn(
          'w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200',
          state.active ? 'translate-x-3' : 'translate-x-0'
        )}
      ></div>
    </div>
  </button>

  <!-- Card Bottom: Volume Slider & Delete (for custom) -->
  <div class="flex items-center gap-2.5 mt-1">
    <span class="text-xs font-semibold w-4 text-center shrink-0">
      {state.volume}
    </span>
    <div class="grow">
      <Slider
        min={0}
        max={100}
        step={1}
        value={state.volume}
        disabled={!state.active}
        oninput={(val) => audio.setSoundVolume(sound.id, val)}
      />
    </div>

    <!-- Custom Sound trash bin -->
    {#if sound.category === 'custom'}
      <Button
        variant="ghost"
        onclick={() => audio.handleDeleteCustomSound(sound.id)}
        title="Delete custom sound"
        aria-label="Delete custom sound"
      >
        <Trash2 class="w-3.5 h-3.5" />
      </Button>
    {/if}
  </div>
</div>
