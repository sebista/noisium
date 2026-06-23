<script lang="ts">
  import { audio } from '@/lib/audio.svelte';
  import Dialog from '../ui/Dialog.svelte';
  import Button from '../ui/Button.svelte';

  function handleModalCancel() {
    audio.isRenameDialogOpen = false;
  }

  function handleModalKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && audio.renamePresetValue.trim()) {
      audio.handleRenamePreset();
    }
  }
</script>

<Dialog bind:open={audio.isRenameDialogOpen} onclose={handleModalCancel}>
  <h2 class="text-sm font-bold mb-2 uppercase tracking-wider text-foreground font-heading">
    Rename Preset
  </h2>
  
  <p class="text-xs mb-5 text-muted">
    Enter a new name for this custom preset.
  </p>
  
  <div class="flex flex-col gap-3.5 mb-5">
    <!-- svelte-ignore a11y_autofocus -->
    <input
      type="text"
      placeholder="e.g. Workspace Rain, Afternoon Café"
      bind:value={audio.renamePresetValue}
      onkeydown={handleModalKeydown}
      class="w-full border border-divider rounded-2xl px-3 py-2 text-xs focus:outline-none focus:border-primary placeholder:text-muted font-medium bg-surface text-foreground"
      autofocus
    />
  </div>
  
  <div class="flex justify-end gap-2">
    <Button
      variant="secondary"
      onclick={handleModalCancel}
    >
      Cancel
    </Button>
    <Button
      variant="primary"
      onclick={() => audio.handleRenamePreset()}
      disabled={!audio.renamePresetValue.trim() || audio.renamePresetValue.trim() === audio.renamePresetTarget}
    >
      Rename
    </Button>
  </div>
</Dialog>
