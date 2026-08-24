<script lang="ts">
  import { audio } from '@/lib/audio.svelte';
  import { dialogs } from '@/lib/dialogs.svelte';
  import Dialog from '../ui/Dialog.svelte';
  import Button from '../ui/Button.svelte';

  function handleCancel() {
    dialogs.closeRenamePreset();
  }

  function handleRename() {
    if (!isNameInvalid) {
      if (audio.renamePreset(dialogs.renameTarget, dialogs.renameValue)) {
        dialogs.closeRenamePreset();
      }
    }
  }

  let trimmedName = $derived(dialogs.renameValue.trim());
  let isDuplicate = $derived(
    trimmedName !== dialogs.renameTarget &&
    Boolean(audio.presets[trimmedName])
  );
  let isNameInvalid = $derived(
    !trimmedName ||
    trimmedName === dialogs.renameTarget ||
    isDuplicate
  );
  let buttonTitle = $derived(
    isDuplicate ? 'This preset name is already in use' : undefined
  );

  function handleModalKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !isNameInvalid) {
      handleRename();
    }
  }
</script>

<Dialog bind:open={dialogs.isRenamePresetOpen} onclose={handleCancel}>
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
      bind:value={dialogs.renameValue}
      onkeydown={handleModalKeydown}
      class="w-full border border-divider rounded-2xl px-3 py-2 text-xs focus:outline-none focus:border-primary placeholder:text-muted font-medium bg-surface text-foreground"
      autofocus
    />
  </div>
  
  <div class="flex justify-end gap-2">
    <Button
      variant="secondary"
      onclick={handleCancel}
    >
      Cancel
    </Button>
    <Button
      variant="primary"
      onclick={handleRename}
      disabled={isNameInvalid}
      title={buttonTitle}
    >
      Rename
    </Button>
  </div>
</Dialog>
