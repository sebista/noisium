<script lang="ts">
  import { Clock } from 'lucide-svelte';
  import { audio } from '@/lib/audio.svelte';
  import { cn } from '@/lib/utils';
  import { onMount, onDestroy } from 'svelte';
  import Slider from '../ui/Slider.svelte';
  import Button from '../ui/Button.svelte';

  let isOpen = $state(false);
  let containerEl = $state<HTMLDivElement | null>(null);

  function toggle(e: MouseEvent) {
    e.stopPropagation();
    isOpen = !isOpen;
  }

  function close() {
    isOpen = false;
  }

  function handleWindowClick(e: MouseEvent) {
    if (isOpen && containerEl && !containerEl.contains(e.target as Node)) {
      close();
    }
  }

  onMount(() => {
    window.addEventListener('click', handleWindowClick);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', handleWindowClick);
    }
  });

  let dasharray = 2 * Math.PI * 16;
  let strokeDashoffset = $derived(
    audio.timerSeconds !== null && audio.totalTimerDuration > 0
      ? 2 * Math.PI * 16 * (1 - audio.timerSeconds / audio.totalTimerDuration)
      : 0
  );
</script>

<div class="relative inline-block text-left" bind:this={containerEl}>
  <Button
    variant="icon"
    onclick={toggle}
    class={cn(
      'relative',
      audio.timerSeconds !== null
        ? 'bg-primary/20 border-transparent text-primary'
        : 'bg-surface hover:bg-hover border-divider text-foreground'
    )}
    aria-label="Toggle Sleep Timer"
    title="Sleep timer"
  >
    <Clock class="w-4.5 h-4.5" />

    {#if audio.timerSeconds !== null && audio.totalTimerDuration > 0}
      <svg class="absolute -top-px -left-px w-9 h-9 -rotate-90 select-none pointer-events-none">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="var(--color-primary)"
          stroke-width="2"
          stroke-dasharray={dasharray}
          stroke-dashoffset={strokeDashoffset}
          class="transition-all duration-1000"
        />
      </svg>
    {/if}
    {#if audio.timerSeconds !== null}
      <span class="absolute -bottom-1 -right-1 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full scale-90">
        {Math.ceil(audio.timerSeconds / 60)}m
      </span>
    {/if}
  </Button>

  {#if isOpen}
    <div
      class="fixed top-[calc(3.625rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 w-64 border border-divider rounded-2xl p-4 z-100 bg-surface text-foreground shadow-lg animate-in fade-in duration-150 focus:outline-none sm:absolute sm:top-auto sm:left-auto sm:right-0 sm:translate-x-0 sm:mt-2"
    >
      <span class="block text-xs font-bold mb-3 uppercase tracking-wider text-muted font-heading">
        Sleep Timer
      </span>

      {#if audio.timerSeconds !== null}
        <div class="text-center">
          <div class="text-3xl font-mono font-bold mb-2 text-foreground">
            {audio.formatTimerTime(audio.timerSeconds)}
          </div>
          <span class="text-xs block mb-4 text-muted">
            Remaining until pause
          </span>
          <Button
            variant="primary"
            class="w-full"
            onclick={() => { audio.cancelTimer(); close(); }}
          >
            Cancel Timer
          </Button>
        </div>
      {:else}
        <div class="flex flex-col gap-3">
          <div class="grid grid-cols-3 gap-1.5">
            {#each [5, 15, 30, 45, 60, 120] as mins}
              <Button
                variant="secondary"
                onclick={() => { audio.handleStartTimer(mins); close(); }}
              >
                {mins >= 60 ? `${mins / 60}h` : `${mins}m`}
              </Button>
            {/each}
          </div>

          <div class="h-px my-1 bg-divider"></div>

          <span class="text-xs font-semibold text-muted">
            Custom ({audio.customTimerMinutes} mins)
          </span>
          <div class="flex items-center gap-3">
            <div class="grow">
              <Slider
                min={5}
                max={300}
                step={5}
                value={audio.customTimerMinutes}
                oninput={(val) => audio.customTimerMinutes = val}
              />
            </div>
            <Button
              variant="primary"
              onclick={() => { audio.handleStartTimer(audio.customTimerMinutes); close(); }}
            >
              Start
            </Button>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>
