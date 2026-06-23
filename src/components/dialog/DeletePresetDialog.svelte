<script lang="ts">
  import { audio } from '@/lib/audio.svelte';
  import Dialog from '../ui/Dialog.svelte';
  import Button from '../ui/Button.svelte';

  function handleModalCancel() {
    audio.isDeleteDialogOpen = false;
  }
</script>

<Dialog bind:open={audio.isDeleteDialogOpen} onclose={handleModalCancel}>
  <h2 class="text-sm font-bold mb-2 uppercase tracking-wider text-foreground font-heading">
    Delete Preset
  </h2>
  
  <p class="text-xs mb-5 text-muted leading-relaxed">
    Are you sure you want to delete <strong class="text-foreground">"{audio.deletePresetTarget}"</strong>? This action cannot be undone.
  </p>
  
  <div class="flex justify-end gap-2">
    <Button
      variant="secondary"
      onclick={handleModalCancel}
    >
      Cancel
    </Button>
    <Button
      variant="primary"
      onclick={() => audio.handleDeletePreset()}
    >
      Delete
    </Button>
  </div>
</Dialog>
