<script lang="ts">
  import { Minus, Square, X } from 'lucide-svelte';
  import Button from '../ui/Button.svelte';
  import { isTauri } from '@tauri-apps/api/core';
  import { getCurrentWindow } from '@tauri-apps/api/window';

  function minimize() {
    if (isTauri()) {
      getCurrentWindow().minimize();
    }
  }

  function toggleMaximize() {
    if (isTauri()) {
      getCurrentWindow().toggleMaximize();
    }
  }

  function close() {
    if (isTauri()) {
      getCurrentWindow().close();
    }
  }
</script>

{#if isTauri()}
  <div class="h-6 w-px bg-divider mx-1 lg:mx-2 app-no-drag"></div>

  <div class="flex items-center gap-2 app-no-drag">
    <Button
      variant="icon"
      onclick={minimize}
      title="Minimize"
    >
      <Minus class="w-3.5 h-3.5" strokeWidth={2.5} />
    </Button>

    <Button
      variant="icon"
      onclick={toggleMaximize}
      title="Maximize"
    >
      <Square class="w-3 h-3" strokeWidth={2.5} />
    </Button>

    <Button
      variant="icon"
      onclick={close}
      title="Close"
      class="hover:bg-primary/20 hover:text-primary hover:border-primary/30"
    >
      <X class="w-3.5 h-3.5" strokeWidth={2.5} />
    </Button>
  </div>
{/if}
