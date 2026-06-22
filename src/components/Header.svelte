<script lang="ts">
  import PresetsButton from './button/PresetsButton.svelte'
  import AddSoundButton from './button/AddSoundButton.svelte'
  import TimerButton from './button/TimerButton.svelte'
  import ColorsButton from './button/ColorsButton.svelte'
  import ThemeButton from './button/ThemeButton.svelte'
  import AboutButton from './button/AboutButton.svelte'
  import Logo from './Logo.svelte'
  import WindowControls from './electron/WindowControls.svelte'
</script>

<header class="h-[calc(4rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] pl-[calc(1rem+env(safe-area-inset-left))] pr-[calc(1rem+env(safe-area-inset-right))] sm:pl-[calc(1.5rem+env(safe-area-inset-left))] sm:pr-[calc(1.5rem+env(safe-area-inset-right))] flex items-center justify-between border-b border-divider bg-panel shrink-0 select-none app-drag">
  <!-- Left -->
  <div class="flex items-center gap-2 lg:gap-4">
    <div class="flex items-center gap-2">
      <Logo class="w-6 h-6 text-primary" />
      <span class="text-lg font-bold tracking-wide font-heading">
        Noisium
      </span>
    </div>

    <div class="hidden lg:flex items-center gap-2 lg:gap-4">
      <div class="h-6 w-px bg-divider"></div>

      <!-- Presets -->
      <PresetsButton />

      <!-- Add Sound -->
      <AddSoundButton />
    </div>
  </div>

  <!-- Right -->
  <div class="flex items-center gap-2 lg:gap-3 z-10">
    <TimerButton />
    <ColorsButton />
    <ThemeButton />
    <AboutButton />
    <WindowControls />
  </div>
</header>
