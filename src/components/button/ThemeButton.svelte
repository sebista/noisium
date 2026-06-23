<script lang="ts">
  import { Sun, Moon } from 'lucide-svelte';
  import { theme } from '@/lib/theme.svelte';
  import Button from '../ui/Button.svelte';
</script>

<Button
  variant="icon"
  onclick={() => theme.toggleTheme()}
  aria-label="Toggle Theme"
  title="Toggle theme"
>
  {#if theme.darkMode}
    <Sun class="w-4.5 h-4.5" />
  {:else}
    <Moon class="w-4.5 h-4.5" />
  {/if}
</Button>
