<script lang="ts">
  import { audio } from '@/lib/audio.svelte';
  import { dialogs } from '@/lib/dialogs.svelte';
  import Dialog from '../ui/Dialog.svelte';
  import Button from '../ui/Button.svelte';

  function handleCancel() {
    dialogs.closeDeletePreset();
  }

  function handleDelete() {
    audio.deletePreset(dialogs.deleteTarget);
    dialogs.closeDeletePreset();
  }
</script>

<Dialog bind:open={dialogs.isDeletePresetOpen} onclose={handleCancel}>
  <h2 class="text-sm font-bold mb-2 uppercase tracking-wider text-foreground font-heading">
    Delete Preset
  </h2>
  
  <p class="text-xs mb-5 text-muted leading-relaxed">
    Are you sure you want to delete <strong class="text-foreground">"{dialogs.deleteTarget}"</strong>? This action cannot be undone.
  </p>
  
  <div class="flex justify-end gap-2">
    <Button
      variant="secondary"
      onclick={handleCancel}
    >
      Cancel
    </Button>
    <Button
      variant="primary"
      onclick={handleDelete}
    >
      Delete
    </Button>
  </div>
</Dialog>
