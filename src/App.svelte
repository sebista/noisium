<script lang="ts">
  import { onMount } from 'svelte'
  import { audio } from '@/lib/audio.svelte'
  import { theme } from '@/lib/theme.svelte'

  import { getCurrentWindow } from '@tauri-apps/api/window'
  import { isTauri } from '@tauri-apps/api/core';

  import Header from '@/components/Header.svelte'
  import Sidebar from '@/components/Sidebar.svelte'
  import Main from '@/components/Main.svelte'
  import Footer from '@/components/Footer.svelte'

  import SavePresetDialog from '@/components/dialog/SavePresetDialog.svelte'
  import RenamePresetDialog from '@/components/dialog/RenamePresetDialog.svelte'
  import OverwritePresetDialog from '@/components/dialog/OverwritePresetDialog.svelte'
  import DeletePresetDialog from '@/components/dialog/DeletePresetDialog.svelte'
  import AboutDialog from '@/components/dialog/AboutDialog.svelte'

  // Reactively sync audio player elements when audio manager state changes
  $effect(() => {
    audio.syncAudio()
  })

  // Reactively sync DOM dark class when theme state changes
  $effect(() => {
    document.documentElement.classList.toggle('dark', theme.darkMode)
  })

  // Reactively sync DOM primary-color variable when theme state changes
  $effect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor)
  })

  // On the desktop build, show window once the frontend mounts
  onMount(() => {
    if (isTauri()) {
      getCurrentWindow().show()
    }
  })
</script>

<div class="w-screen h-dvh flex flex-col overflow-hidden font-sans bg-background text-foreground">
  <Header />

  <div class="grow flex overflow-hidden">
    <Sidebar />
    <Main />
  </div>

  <Footer />
</div>

<SavePresetDialog />
<RenamePresetDialog />
<OverwritePresetDialog />
<DeletePresetDialog />
<AboutDialog />
