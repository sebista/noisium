<script lang="ts">
  import { cn } from '@/lib/utils';

  let {
    value = $bindable(50),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    oninput
  }: {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    oninput?: (val: number) => void;
  } = $props();

  let percentage = $derived(max > min ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)) : 0);
</script>

<div class="relative w-full h-5 flex items-center group select-none">
  <!-- Transparent native input overlay to handle touch/click/drag/keyboard events natively -->
  <input
    type="range"
    {min}
    {max}
    {step}
    {disabled}
    bind:value
    oninput={(e) => {
      const val = Number((e.target as HTMLInputElement).value);
      if (oninput) oninput(val);
    }}
    class="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-default z-10"
  />

  <!-- Custom track background -->
  <div
    class={cn(
      'absolute left-0 right-0 h-1.5 rounded-full pointer-events-none overflow-hidden peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2',
      disabled ? 'bg-slider-track-inactive' : 'bg-slider-track'
    )}
  >
    <!-- Active colored range bar showing progress for both active and inactive -->
    <div
      class={cn(
        'h-full rounded-full',
        disabled ? 'bg-slider-progress-inactive' : 'bg-primary'
      )}
      style="width: {percentage}%;"
    ></div>
  </div>
</div>
