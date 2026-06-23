<script lang="ts">
  import { Info } from 'lucide-svelte';
  import { audio } from '@/lib/audio.svelte';
  import Button from '../ui/Button.svelte';
</script>

<Button
  variant="icon"
  onclick={() => audio.isAboutDialogOpen = true}
  aria-label="About Noisium"
>
  <Info class="w-4.5 h-4.5" />
</Button>
