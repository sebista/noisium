<script lang="ts">
  import { Plus } from 'lucide-svelte';
  import { audio } from '@/lib/audio.svelte';
  import { cn } from '@/lib/utils';

  let {
    class: className = '',
    showText = true
  }: {
    class?: string;
    showText?: boolean;
  } = $props();
</script>

<label
  class={cn(
    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-2xl border border-divider outline-none transition-colors duration-150 cursor-pointer bg-surface hover:bg-hover text-foreground',
    className
  )}
>
  {#if showText}
    <span class="hidden sm:inline">Add Sound</span>
  {/if}
  <Plus class="w-3.5 h-3.5" />
  <input
    type="file"
    accept="audio/*"
    onchange={(e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        audio.handleCustomSoundUpload(file)
      }
      (e.target as HTMLInputElement).value = ''
    }}
    class="hidden"
  />
</label>
