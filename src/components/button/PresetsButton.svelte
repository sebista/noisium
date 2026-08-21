<script lang="ts">
  import { ChevronDown, Plus } from 'lucide-svelte';
  import { audio } from '@/lib/audio.svelte';
  import { BUILTIN_PRESETS } from '@/lib/presets';
  import { cn } from '@/lib/utils';
  import DeleteButton from './DeleteButton.svelte';
  import RenameButton from './RenameButton.svelte';
  import OverwriteButton from './OverwriteButton.svelte';
  import Button from '../ui/Button.svelte';
  import Popover from '../ui/Popover.svelte';

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

<Popover bind:open={isOpen} {align} class="w-52 p-1.5">
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
    <span class="block px-2.5 py-1 text-xs font-bold uppercase tracking-wider mb-1 text-muted">
      Built-in Presets
    </span>
    {#each builtinPresetNames as name}
      <button
        onclick={() => { audio.handleLoadPreset(name); close(); }}
        class="w-full flex items-center justify-between px-2.5 h-8 rounded-2xl outline-none cursor-pointer text-left text-xs hover:bg-hover text-foreground transition-colors"
      >
        <span>{name}</span>
      </button>
    {/each}

    {#if hasCustomPresets}
      <div class="h-px my-1 bg-divider"></div>
      <span class="block px-2.5 py-1 text-xs font-bold uppercase tracking-wider mb-1 text-muted">
        My Presets
      </span>
      {#each Object.keys(audio.presets).filter((k) => !builtinPresetNames.includes(k)) as name}
        <div
          class="flex items-center justify-between px-2.5 h-8 rounded-2xl text-xs group hover:bg-hover cursor-pointer text-foreground transition-colors"
          onclick={() => { audio.handleLoadPreset(name); close(); }}
          role="button"
          tabindex="0"
          onkeydown={(e) => e.key === 'Enter' && audio.handleLoadPreset(name)}
        >
          <span class="truncate pr-2">{name}</span>
          <div class="flex items-center gap-1 shrink-0">
            <RenameButton
              onclick={(e) => { audio.handleOpenRenameDialog(name, e); close(); }}
              title="Rename preset"
            />
            <OverwriteButton
              onclick={(e) => { audio.handleOpenOverwriteDialog(name, e); close(); }}
              title="Update preset sounds"
            />
            <DeleteButton
              onclick={(e) => { audio.handleOpenDeleteDialog(name, e); close(); }}
              title="Delete preset"
            />
          </div>
        </div>
      {/each}
    {/if}

    <div class="h-px my-1 bg-divider"></div>
    <button
      onclick={() => { audio.isPresetDialogOpen = true; close(); }}
      class="w-full flex items-center gap-2 px-2.5 h-8 rounded-2xl hover:bg-primary/20 text-primary font-semibold outline-none cursor-pointer text-left text-xs transition-colors"
    >
      <Plus class="w-4 h-4" />
      <span>Save current mix...</span>
    </button>
  {/snippet}
</Popover>
