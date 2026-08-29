<script lang="ts">
  import { Volume2, VolumeX, Play, Pause } from 'lucide-svelte';
  import { audio } from '@/lib/audio.svelte';
  import Slider from './ui/Slider.svelte';
  import Button from './ui/Button.svelte';

  function handlePlayPause() {
    if (audio.activeSoundsText) {
      audio.isPlaying = !audio.isPlaying;
    }
  }

  function handleMuteToggle() {
    audio.toggleMute();
  }
</script>

<footer class="h-[calc(4rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))] sm:pl-[calc(1.5rem+env(safe-area-inset-left))] sm:pr-[calc(1.5rem+env(safe-area-inset-right))] flex items-center justify-between border-t border-divider bg-panel shrink-0 relative overflow-hidden">
  <!-- Left: Active mix details -->
  <div class="flex flex-col justify-center w-[30%] min-w-0 z-10">
    <span class="text-xs text-muted font-bold uppercase tracking-wider">
      Active Mix
    </span>
    <span class="text-xs font-semibold truncate leading-tight">
      {audio.activeSoundsText || 'No sounds active'}
    </span>
  </div>

  <!-- Center: Play/Pause Button -->
  <div class="flex items-center justify-center grow z-10">
    <button
      onclick={handlePlayPause}
      class="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer outline-none bg-primary text-white border border-transparent"
      aria-label={audio.isPlaying ? 'Pause' : 'Play'}
    >
      {#if audio.isPlaying}
        <Pause class="w-4 h-4 fill-white" />
      {:else}
        <Play class="w-4 h-4 fill-current translate-x-[0.5px]" />
      {/if}
    </button>
  </div>

  <!-- Right: Master volume controls -->
  <div class="flex items-center justify-end gap-1.5 sm:gap-2.5 w-[30%] min-w-0 shrink-0 z-10">
    <Button
      variant="ghost"
      onclick={handleMuteToggle}
      aria-label={audio.globalVolume === 0 ? 'Unmute' : 'Mute'}
      title={audio.globalVolume === 0 ? 'Unmute' : 'Mute'}
    >
      {#if audio.globalVolume === 0}
        <VolumeX class="w-4.5 h-4.5" />
      {:else}
        <Volume2 class="w-4.5 h-4.5" />
      {/if}
    </Button>
    <div class="grow max-w-30 sm:max-w-40">
      <Slider
        min={0}
        max={100}
        step={1}
        value={audio.globalVolume}
        oninput={(val) => audio.saveGlobalVolume(val)}
      />
    </div>
    <span class="text-xs font-semibold text-right w-8 tabular-nums shrink-0">
      {audio.globalVolume}%
    </span>
  </div>
</footer>
