<script lang="ts">
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
  <!-- Custom track background -->
  <div class="absolute left-0 right-0 h-1 rounded-full bg-slider-track pointer-events-none">
    <!-- Active colored range bar -->
    <div
      class="h-full rounded-full"
      style="width: {percentage}%; background-color: {disabled ? 'var(--color-slider-track)' : 'var(--color-primary)'};"
    ></div>
  </div>

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
    class="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
  />

  <!-- Custom slider thumb -->
  <div
    class="absolute w-3.5 h-3.5 rounded-full pointer-events-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
    style="left: calc({percentage}% - 7px); background-color: {disabled ? 'var(--color-inactive-thumb)' : 'var(--color-thumb)'}; opacity: {disabled ? 0.5 : 1};"
  ></div>
</div>
