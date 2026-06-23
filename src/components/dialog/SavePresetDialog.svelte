<script lang="ts">
  import { audio } from '@/lib/audio.svelte';
  import Dialog from '../ui/Dialog.svelte';
  import Button from '../ui/Button.svelte';

  function handleModalCancel() {
    audio.isPresetDialogOpen = false;
  }

  function handleModalKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && audio.newPresetName.trim()) {
      audio.handleSavePreset();
    }
  }
</script>

<Dialog bind:open={audio.isPresetDialogOpen} onclose={handleModalCancel}>
  <h2 class="text-sm font-bold mb-2 uppercase tracking-wider text-foreground font-heading">
    Save Current Sound Mix
  </h2>
  
  <p class="text-xs mb-5 text-muted">
    Enter a custom name for this combination of sounds and volumes.
  </p>
  
  <div class="flex flex-col gap-3.5 mb-5">
    <input
      type="text"
      placeholder="e.g. Workspace Rain, Afternoon Café"
      bind:value={audio.newPresetName}
      onkeydown={handleModalKeydown}
      class="w-full border border-divider rounded-2xl px-3 py-2 text-xs focus:outline-none focus:border-primary placeholder:text-muted font-medium bg-surface text-foreground"
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
      onclick={() => audio.handleSavePreset()}
      disabled={!audio.newPresetName.trim()}
    >
      Save Preset
    </Button>
  </div>
</Dialog>
