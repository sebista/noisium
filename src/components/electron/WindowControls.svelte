<script lang="ts">
  import { Minus, Square, X } from 'lucide-svelte';
  import Button from '../ui/Button.svelte';

  const isElectron = typeof window !== 'undefined' && 'electron' in window;

  const handleMinimize = () => {
    (window as any).electron.minimize();
  };

  const handleMaximize = () => {
    (window as any).electron.maximize();
  };

  const handleClose = () => {
    (window as any).electron.close();
  };
</script>

{#if isElectron}
  <div class="h-6 w-px bg-divider mx-1 lg:mx-2 app-no-drag"></div>

  <div class="flex items-center gap-2 app-no-drag">
    <Button
      variant="icon"
      onclick={handleMinimize}
      title="Minimize"
    >
      <Minus class="w-3.5 h-3.5" strokeWidth={2.5} />
    </Button>

    <Button
      variant="icon"
      onclick={handleMaximize}
      title="Maximize"
    >
      <Square class="w-3 h-3" strokeWidth={2.5} />
    </Button>

    <Button
      variant="icon"
      onclick={handleClose}
      title="Close"
      class="hover:bg-primary/20 hover:text-primary hover:border-primary/30"
    >
      <X class="w-3.5 h-3.5" strokeWidth={2.5} />
    </Button>
  </div>
{/if}
