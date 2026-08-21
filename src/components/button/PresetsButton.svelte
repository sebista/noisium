<script lang="ts">
  import {
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
  import { audio } from '@/lib/audio.svelte';
  import { BUILTIN_PRESETS } from '@/lib/presets';
  import { cn } from '@/lib/utils';
  import Button from '../ui/Button.svelte';
  import Popover from '../ui/Popover.svelte';

  const PRESET_ICONS: Record<string, any> = {
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

  let hasCustomPresets = $derived(
    Object.keys(audio.presets).some((k) => !builtinPresetNames.includes(k))
  );
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
        onclick={() => { audio.handleLoadPreset(name); close(); }}
        class="w-full flex items-center gap-2.5 px-2.5 min-h-[34px] py-1 rounded-2xl outline-none cursor-pointer text-left text-xs font-medium hover:bg-hover text-foreground transition-colors"
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
      {#each Object.keys(audio.presets).filter((k) => !builtinPresetNames.includes(k)) as name}
        <div
          class="flex items-center justify-between px-2.5 min-h-[34px] py-1 rounded-2xl text-xs font-medium group hover:bg-hover cursor-pointer text-foreground transition-colors"
          onclick={() => { audio.handleLoadPreset(name); close(); }}
          role="button"
          tabindex="0"
          onkeydown={(e) => e.key === 'Enter' && audio.handleLoadPreset(name)}
        >
          <div class="flex items-center gap-2.5 min-w-0 pr-2">
            <Bookmark class="w-3.5 h-3.5 text-muted shrink-0" />
            <span class="truncate">{name}</span>
          </div>
          <div class="flex items-center gap-0.5 shrink-0">
            <Button
              variant="ghost"
              onclick={(e: MouseEvent) => {
                e.stopPropagation();
                audio.handleOpenRenameDialog(name, e);
                close();
              }}
              title="Rename preset"
              aria-label="Rename preset"
            >
              <Pencil class="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              onclick={(e: MouseEvent) => {
                e.stopPropagation();
                audio.handleOpenOverwriteDialog(name, e);
                close();
              }}
              title="Update preset sounds"
              aria-label="Update preset sounds"
            >
              <RefreshCw class="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              onclick={(e: MouseEvent) => {
                e.stopPropagation();
                audio.handleOpenDeleteDialog(name, e);
                close();
              }}
              title="Delete preset"
              aria-label="Delete preset"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      {/each}
    {/if}

    <div class="border-t border-divider my-1"></div>
    <button
      onclick={() => { audio.isPresetDialogOpen = true; close(); }}
      class="w-full flex items-center gap-2 px-2.5 min-h-[34px] py-1 rounded-2xl hover:bg-primary/20 text-primary font-semibold outline-none cursor-pointer text-left text-xs transition-colors"
    >
      <Plus class="w-4 h-4" />
      <span>Save current mix...</span>
    </button>
  {/snippet}
</Popover>
