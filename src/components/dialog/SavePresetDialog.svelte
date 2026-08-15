<script lang="ts">
  import { audio } from '@/lib/audio.svelte';
  import { BUILTIN_PRESETS } from '@/lib/presets';
  import Dialog from '../ui/Dialog.svelte';
  import Button from '../ui/Button.svelte';

  function handleModalCancel() {
    audio.isPresetDialogOpen = false;
  }

  let trimmedName = $derived(audio.newPresetName.trim());
  let isDuplicate = $derived(
    Boolean(BUILTIN_PRESETS[trimmedName]) || Boolean(audio.presets[trimmedName])
  );
  let isNameInvalid = $derived(!trimmedName || isDuplicate);
  let buttonTitle = $derived(
    isDuplicate ? 'This preset name is already in use' : undefined
  );

  function handleModalKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !isNameInvalid) {
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
    <!-- svelte-ignore a11y_autofocus -->
    <input
      type="text"
      placeholder="e.g. Workspace Rain, Afternoon Café"
      bind:value={audio.newPresetName}
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
      onclick={() => audio.handleSavePreset()}
      disabled={isNameInvalid}
      title={buttonTitle}
    >
      Save Preset
    </Button>
  </div>
</Dialog>
