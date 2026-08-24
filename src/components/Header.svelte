<script lang="ts">
  import PresetsButton from './button/PresetsButton.svelte'
  import AddSoundButton from './button/AddSoundButton.svelte'
  import TimerButton from './button/TimerButton.svelte'
  import ColorsButton from './button/ColorsButton.svelte'
  import Logo from './Logo.svelte'
  import WindowControls from './tauri/WindowControls.svelte'
  import Button from './ui/Button.svelte'
  import { theme } from '@/lib/theme.svelte'
  import { dialogs } from '@/lib/dialogs.svelte'
  import { Sun, Moon, Info } from 'lucide-svelte'
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
    <Button
      variant="icon"
      onclick={() => theme.toggleTheme()}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {#if theme.darkMode}
        <Sun class="w-4.5 h-4.5" />
      {:else}
        <Moon class="w-4.5 h-4.5" />
      {/if}
    </Button>
    <Button
      variant="icon"
      onclick={() => dialogs.openAbout()}
      aria-label="About Noisium"
      title="About"
    >
      <Info class="w-4.5 h-4.5" />
    </Button>
    <WindowControls />
  </div>
</header>
