<script lang="ts">
  import {
    type Icon,
    ChevronDown,
    Plus,
    Bookmark,
    CloudRain,
    Flame,
    CloudLightning,
    Coffee,
    Waves,
    Moon,
    Sparkles,
    Pencil,
    RefreshCw,
    Trash2
  } from 'lucide-svelte';
  import { dialogs } from '@/lib/dialogs.svelte';
  import { audio } from '@/lib/audio.svelte';
  import { BUILTIN_PRESETS } from '@/lib/presets';
  import { cn } from '@/lib/utils';
  import Button from '../ui/Button.svelte';
  import Popover from '../ui/Popover.svelte';

  const PRESET_ICONS: Record<string, typeof Icon> = {
    'Gentle Rain': CloudRain,
    'Cozy Fireplace': Flame,
    Thunderstorm: CloudLightning,
    'Coffee Shop Focus': Coffee,
    'Ocean Breeze': Waves,
    'Sleep Noise': Moon,
  };

  let {
    align = 'start',
    class: triggerClassName = '',
    iconSize = 3.5
  }: {
    align?: 'start' | 'end' | 'center';
    class?: string;
    iconSize?: number;
  } = $props();

  let isOpen = $state(false);
  const builtinPresetNames = Object.keys(BUILTIN_PRESETS);

  let customPresetNames = $derived(
    Object.keys(audio.presets).filter((k) => !builtinPresetNames.includes(k)),
  );
  let hasCustomPresets = $derived(customPresetNames.length > 0);
</script>

<Popover bind:open={isOpen} {align} class="w-56 px-1.5">
  {#snippet trigger({ open, toggle })}
    <Button
      variant="secondary"
      onclick={toggle}
      class={cn('gap-1.5 px-3 py-1.5', triggerClassName)}
      aria-expanded={open}
      aria-haspopup="dialog"
    >
      <span>Presets</span>
      <ChevronDown
        style="width: {iconSize * 0.25}rem; height: {iconSize * 0.25}rem;"
      />
    </Button>
  {/snippet}

  {#snippet children({ close })}
    <span class="block px-2 pb-1 text-xs font-bold uppercase tracking-wider mb-1 text-muted font-heading">
      Built-in Presets
    </span>
    {#each builtinPresetNames as name}
      {@const IconComponent = PRESET_ICONS[name] || Sparkles}
      <button
        type="button"
        onclick={() => { audio.loadPreset(name); close(); }}
        class="w-full flex items-center gap-2.5 px-2.5 min-h-[34px] py-1 rounded-2xl outline-none cursor-pointer text-left text-xs font-medium hover:bg-hover text-foreground transition-colors"
        aria-label="Load preset {name}"
      >
        <IconComponent class="w-3.5 h-3.5 text-muted shrink-0" />
        <span class="truncate">{name}</span>
      </button>
    {/each}

    {#if hasCustomPresets}
      <div class="border-t border-divider my-1"></div>
      <span class="block px-2 py-1 text-xs font-bold uppercase tracking-wider mb-1 text-muted font-heading">
        My Presets
      </span>
      {#each customPresetNames as name}
        <div
          class="flex items-center justify-between pl-2.5 pr-1 min-h-[34px] py-0.5 rounded-2xl text-xs font-medium group hover:bg-hover text-foreground transition-colors"
        >
          <button
            type="button"
            onclick={() => { audio.loadPreset(name); close(); }}
            class="flex items-center gap-2.5 min-w-0 pr-2 grow text-left bg-transparent border-0 p-0 outline-none cursor-pointer text-foreground"
            aria-label="Load preset {name}"
          >
            <Bookmark class="w-3.5 h-3.5 text-muted shrink-0" />
            <span class="truncate">{name}</span>
          </button>
          <div class="flex items-center gap-0.5 shrink-0">
            <Button
              variant="ghost"
              onclick={() => {
                dialogs.openRenamePreset(name);
                close();
              }}
              title="Rename preset"
              aria-label="Rename preset {name}"
            >
              <Pencil class="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              disabled={!audio.hasActiveSounds}
              onclick={() => {
                dialogs.openOverwritePreset(name);
                close();
              }}
              title={!audio.hasActiveSounds ? 'No sounds are currently active' : 'Update preset sounds'}
              aria-label="Update preset {name} with current sounds"
            >
              <RefreshCw class="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              onclick={() => {
                dialogs.openDeletePreset(name);
                close();
              }}
              title="Delete preset"
              aria-label="Delete preset {name}"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      {/each}
    {/if}

    <div class="border-t border-divider my-1"></div>
    <button
      disabled={!audio.hasActiveSounds}
      onclick={() => { dialogs.openSavePreset(); close(); }}
      class="w-full flex items-center gap-2 px-2.5 min-h-[34px] py-1 rounded-2xl font-semibold outline-none text-left text-xs transition-colors cursor-pointer text-primary hover:bg-primary/20 disabled:text-muted disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      title={!audio.hasActiveSounds ? 'No sounds are currently active' : undefined}
    >
      <Plus class="w-4 h-4" />
      <span>Save current mix...</span>
    </button>
  {/snippet}
</Popover>
