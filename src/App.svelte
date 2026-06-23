<script lang="ts">
  import Header from '@/components/Header.svelte'
  import Sidebar from '@/components/Sidebar.svelte'
  import Main from '@/components/Main.svelte'
  import Footer from '@/components/Footer.svelte'
  import { audio } from '@/lib/audio.svelte'
  import { theme } from '@/lib/theme.svelte'

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
    if (theme.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  // Reactively sync DOM primary-color variable when theme state changes
  $effect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor)
  })

  // Reactively tick sleep timer when it is active and audio is playing
  $effect(() => {
    if (audio.timerActive && audio.isPlaying) {
      const interval = setInterval(() => {
        audio.tickTimer()
      }, 1000)
      return () => clearInterval(interval)
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
