<script lang="ts">
  import { Pencil } from 'lucide-svelte';
  import Button from '../ui/Button.svelte';

  let {
    onclick,
    title = 'Rename preset',
    class: className = ''
  }: {
    onclick: (e: MouseEvent) => void;
    title?: string;
    class?: string;
  } = $props();

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    onclick(e);
  }
</script>

<Button
  variant="ghost"
  onclick={handleClick}
  {title}
  class={className}
>
  <Pencil class="w-3.5 h-3.5" />
</Button>
