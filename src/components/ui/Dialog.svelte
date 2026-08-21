<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    open = $bindable(false),
    onclose,
    children
  }: {
    open: boolean;
    onclose?: () => void;
    children?: Snippet;
  } = $props();

  let dialogEl = $state<HTMLDialogElement | null>(null);

  $effect(() => {
    if (dialogEl) {
      if (open) {
        if (!dialogEl.open) {
          dialogEl.showModal();
        }
      } else {
        if (dialogEl.open) {
          dialogEl.close();
        }
      }
    }
  });

  function handleCancel() {
    open = false;
    if (onclose) onclose();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === dialogEl) {
      handleCancel();
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialogEl}
  onclick={handleBackdropClick}
  onclose={handleCancel}
  class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm border border-divider p-6 rounded-2xl z-201 bg-surface text-foreground backdrop:bg-black/20 backdrop:backdrop-blur-sm focus:outline-none"
>
  {#if children}
    {@render children()}
  {/if}
</dialog>
