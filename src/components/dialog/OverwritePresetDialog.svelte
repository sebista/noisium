<script lang="ts">
  import { audio } from '@/lib/audio.svelte';
  import { dialogs } from '@/lib/dialogs.svelte';
  import Dialog from '../ui/Dialog.svelte';
  import Button from '../ui/Button.svelte';

  function handleCancel() {
    dialogs.closeOverwritePreset();
  }

  function handleOverwrite() {
    if (audio.overwritePreset(dialogs.overwriteTarget)) {
      dialogs.closeOverwritePreset();
    }
  }
</script>

<Dialog bind:open={dialogs.isOverwritePresetOpen} onclose={handleCancel}>
  <h2 class="text-sm font-bold mb-2 uppercase tracking-wider text-foreground font-heading">
    Update Preset Sounds
  </h2>
  
  <p class="text-xs mb-5 text-muted leading-relaxed">
    Are you sure you want to update <strong class="text-foreground">"{dialogs.overwriteTarget}"</strong> with your current sound mix? This will overwrite the saved volumes.
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
      onclick={handleOverwrite}
      disabled={!audio.hasActiveSounds}
      title={!audio.hasActiveSounds ? 'No sounds are currently active' : undefined}
    >
      Proceed
    </Button>
  </div>
</Dialog>
