import type { SoundState, SoundDefinition, CategoryId } from '@/types'
import { Music } from 'lucide-svelte'
import { defaultSounds } from './sounds'
import {
  getAllCustomSounds,
  saveCustomSound,
  deleteCustomSound as dbDeleteCustomSound,
} from './db'
import type { CustomSoundData } from './db'
import { BUILTIN_PRESETS } from './presets'

class AudioManager {
  isPlaying = $state(false)
  globalVolume = $state(80)
  previousVolume = 80
  soundStates = $state<Record<string, SoundState>>({})
  customSounds = $state<SoundDefinition[]>([])
  presets = $state<Record<string, Record<string, number>>>({})
  newPresetName = $state('')
  isPresetDialogOpen = $state(false)
  isRenameDialogOpen = $state(false)
  renamePresetTarget = $state('')
  renamePresetValue = $state('')
  isOverwriteDialogOpen = $state(false)
  overwritePresetTarget = $state('')
  isDeleteDialogOpen = $state(false)
  deletePresetTarget = $state('')
  isAboutDialogOpen = $state(false)
  timerSeconds = $state<number | null>(null)
  timerActive = $state(false)
  customTimerMinutes = $state(90)
  activeCategory = $state<CategoryId>('all')
  totalTimerDuration = $state(0)

  #audioPlayers: Record<string, { audio: HTMLAudioElement; url: string }> = {}
  #timerEndTime: number | null = null
  #timerInterval: number | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      // 1. Load global volume
      try {
        const vol = localStorage.getItem('noisium_global_volume')
        if (vol !== null) {
          this.globalVolume = JSON.parse(vol)
          if (this.globalVolume > 0) {
            this.previousVolume = this.globalVolume
          }
        }
      } catch (e) {
        console.warn('Error reading global volume from localStorage:', e)
      }

      // 2. Load sound states
      const initialSoundStates: Record<string, SoundState> = {}
      defaultSounds.forEach((s) => {
        initialSoundStates[s.id] = { active: false, volume: 50, url: s.url }
      })
      try {
        const savedStates = localStorage.getItem('noisium_sound_states')
        const parsed = savedStates ? JSON.parse(savedStates) : {}
        // Merge with default sounds to ensure we have all default sounds
        defaultSounds.forEach((s) => {
          if (!parsed[s.id]) {
            parsed[s.id] = { active: false, volume: 50, url: s.url }
          } else if (parsed[s.id].url !== s.url) {
            parsed[s.id].url = s.url
          }
        })
        this.soundStates = parsed
      } catch (e) {
        this.soundStates = initialSoundStates
        console.warn('Error reading sound states from localStorage:', e)
      }

      // 3. Load presets
      try {
        const savedPresets = localStorage.getItem('noisium_custom_presets')
        const parsedPresets = savedPresets ? JSON.parse(savedPresets) : {}
        this.presets = { ...BUILTIN_PRESETS, ...parsedPresets }
      } catch (e) {
        this.presets = { ...BUILTIN_PRESETS }
        console.warn('Error reading presets from localStorage:', e)
      }

      // 4. Load custom sounds
      this.loadCustomSounds()
    }
  }

  // Derived properties using getters
  get allSounds(): SoundDefinition[] {
    return [...defaultSounds, ...this.customSounds]
  }

  get hasActiveSounds(): boolean {
    return Object.values(this.soundStates).some((s) => s.active)
  }

  get activeSoundsText(): string {
    return this.allSounds
      .filter((s) => this.soundStates[s.id]?.active)
      .map((s) => s.name)
      .join(', ')
  }

  get activeSoundCounts(): Record<CategoryId, number> {
    const counts: Record<CategoryId, number> = {
      all: 0,
      nature: 0,
      travel: 0,
      urban: 0,
      noise: 0,
      custom: 0,
    }
    for (const sound of this.allSounds) {
      if (this.soundStates[sound.id]?.active) {
        counts.all += 1
        if (sound.category in counts) {
          counts[sound.category] += 1
        }
      }
    }
    return counts
  }

  // Save states helper
  saveGlobalVolume(val: number) {
    if (val > 0) {
      this.previousVolume = val
    }
    this.globalVolume = val
    if (typeof window !== 'undefined') {
      localStorage.setItem('noisium_global_volume', JSON.stringify(val))
    }
  }

  toggleMute() {
    if (this.globalVolume === 0) {
      this.saveGlobalVolume(this.previousVolume > 0 ? this.previousVolume : 80)
    } else {
      this.previousVolume = this.globalVolume
      this.saveGlobalVolume(0)
    }
  }

  saveSoundStates() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'noisium_sound_states',
        JSON.stringify(this.soundStates),
      )
    }
  }

  // Sync Audio Players with current state
  syncAudio() {
    if (typeof window === 'undefined') return

    this.allSounds.forEach((s) => {
      const state = this.soundStates[s.id]
      if (!state) return

      let player = this.#audioPlayers[s.id]
      if (!player) {
        const audio = new Audio(state.url)
        audio.loop = true
        audio.crossOrigin = 'anonymous'
        player = { audio, url: state.url }
        this.#audioPlayers[s.id] = player
      }

      const { audio } = player
      if (player.url !== state.url) {
        player.url = state.url
        const wasPlaying = !audio.paused
        audio.src = state.url
        if (wasPlaying) {
          audio.load()
        }
      }

      const isCurrentlyPlaying = this.isPlaying && state.active
      const targetActualVolume = isCurrentlyPlaying
        ? (state.volume / 100) * (this.globalVolume / 100)
        : 0

      try {
        audio.volume = Math.max(0, Math.min(1, targetActualVolume))
      } catch {
        // Ignore
      }

      if (targetActualVolume > 0) {
        if (audio.paused) {
          audio.play().catch((err) => {
            console.warn(`Play failed for ${s.id}:`, err)
          })
        }
      } else {
        if (!audio.paused) {
          audio.pause()
        }
      }
    })
  }

  // Sound control methods
  toggleSound(id: string) {
    const current = this.soundStates[id]
    if (!current) return

    current.active = !current.active
    this.saveSoundStates()

    const hasActive = Object.values(this.soundStates).some((s) => s.active)
    if (!hasActive) {
      this.isPlaying = false
    } else if (current.active) {
      this.isPlaying = true
    }
  }

  setSoundVolume(id: string, volume: number) {
    const current = this.soundStates[id]
    if (!current) return

    current.volume = volume
    current.active = volume > 0 ? true : current.active
    this.saveSoundStates()

    if (current.active) {
      this.isPlaying = true
    } else {
      const hasActive = Object.values(this.soundStates).some((s) => s.active)
      if (!hasActive) {
        this.isPlaying = false
      }
    }
  }

  // Timer methods
  handleStartTimer(mins: number) {
    const secs = mins * 60
    this.totalTimerDuration = secs
    this.timerSeconds = secs
    this.timerActive = true
    this.#timerEndTime = Date.now() + secs * 1000
    this.#ensureTimerInterval()
  }

  cancelTimer() {
    this.timerSeconds = null
    this.timerActive = false
    this.#timerEndTime = null
    if (this.#timerInterval !== null) {
      clearInterval(this.#timerInterval)
      this.#timerInterval = null
    }
  }

  #ensureTimerInterval() {
    if (typeof window === 'undefined') return
    if (this.#timerInterval !== null) return
    this.#timerInterval = window.setInterval(() => {
      this.#tickTimer()
    }, 500)
  }

  #tickTimer() {
    if (!this.timerActive || this.#timerEndTime === null) {
      if (this.#timerInterval !== null) {
        clearInterval(this.#timerInterval)
        this.#timerInterval = null
      }
      return
    }

    if (!this.isPlaying) {
      // While playback is paused, adjust end time so timer pauses alongside playback
      this.#timerEndTime = Date.now() + (this.timerSeconds ?? 0) * 1000
      return
    }

    const remaining = Math.max(
      0,
      Math.round((this.#timerEndTime - Date.now()) / 1000),
    )
    this.timerSeconds = remaining

    if (remaining <= 0) {
      this.isPlaying = false
      this.cancelTimer()
    }
  }

  formatTimerTime(secs: number): string {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  // Custom sound handlers
  async loadCustomSounds() {
    try {
      const items = await getAllCustomSounds()

      // Revoke old blob URLs if any
      this.customSounds.forEach((s) => {
        if (s.url.startsWith('blob:')) {
          URL.revokeObjectURL(s.url)
        }
      })

      const mapped: SoundDefinition[] = items.map((item) => {
        const url = URL.createObjectURL(item.blob)
        return {
          id: item.id,
          name: item.name,
          url,
          category: 'custom',
          icon: Music,
        }
      })

      this.customSounds = mapped

      // Update soundStates with new URLs
      mapped.forEach((s) => {
        if (!this.soundStates[s.id]) {
          this.soundStates[s.id] = {
            active: false,
            volume: 50,
            url: s.url,
            isCustom: true,
          }
        } else {
          this.soundStates[s.id].url = s.url
        }
      })
      this.saveSoundStates()
    } catch (err) {
      console.error('Failed to load custom sounds:', err)
    }
  }

  async handleCustomSoundUpload(file: File) {
    if (file.size > 15 * 1024 * 1024) {
      alert('File too large (Max 15MB)')
      return
    }

    const name = file.name.substring(0, file.name.lastIndexOf('.')) || file.name
    const soundId = 'custom-' + Date.now()

    const newSound: CustomSoundData = {
      id: soundId,
      name,
      blob: file,
      type: file.type,
    }

    try {
      await saveCustomSound(newSound)

      this.soundStates[soundId] = {
        active: true,
        volume: 60,
        url: '',
        isCustom: true,
      }

      await this.loadCustomSounds()
      this.isPlaying = true
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Failed to upload custom sound')
    }
  }

  async handleDeleteCustomSound(id: string) {
    const p = this.#audioPlayers[id]
    if (p) {
      p.audio.pause()
      delete this.#audioPlayers[id]
    }

    const sound = this.customSounds.find((s) => s.id === id)
    if (sound?.url.startsWith('blob:')) {
      URL.revokeObjectURL(sound.url)
    }

    try {
      await dbDeleteCustomSound(id)

      delete this.soundStates[id]
      this.saveSoundStates()

      const hasActive = Object.values(this.soundStates).some((s) => s.active)
      if (!hasActive) {
        this.isPlaying = false
      }

      this.customSounds = this.customSounds.filter((s) => s.id !== id)
    } catch (err) {
      console.error('Failed to delete custom sound:', err)
    }
  }

  #saveCustomPresets() {
    if (typeof window === 'undefined') return
    const customOnly: Record<string, Record<string, number>> = {}
    for (const [name, vols] of Object.entries(this.presets)) {
      if (!BUILTIN_PRESETS[name]) {
        customOnly[name] = vols
      }
    }
    localStorage.setItem('noisium_custom_presets', JSON.stringify(customOnly))
  }

  // Preset handlers
  handleLoadPreset(name: string) {
    const presetVolumes = this.presets[name]
    if (!presetVolumes) return

    Object.keys(this.soundStates).forEach((id) => {
      this.soundStates[id].active = false
    })

    Object.keys(presetVolumes).forEach((id) => {
      if (this.soundStates[id]) {
        this.soundStates[id].active = true
        this.soundStates[id].volume = presetVolumes[id]
      }
    })

    this.saveSoundStates()
    this.isPlaying = true
  }

  handleSavePreset() {
    const name = this.newPresetName.trim()
    if (!name || this.presets[name] || !this.hasActiveSounds) return

    const activeVolumes: Record<string, number> = {}
    Object.keys(this.soundStates).forEach((id) => {
      if (this.soundStates[id].active) {
        activeVolumes[id] = this.soundStates[id].volume
      }
    })

    if (Object.keys(activeVolumes).length === 0) {
      return
    }

    this.presets[name] = activeVolumes
    this.#saveCustomPresets()

    this.newPresetName = ''
    this.isPresetDialogOpen = false
  }

  handleOpenRenameDialog(name: string, e: MouseEvent) {
    e.stopPropagation()
    this.renamePresetTarget = name
    this.renamePresetValue = name
    this.isRenameDialogOpen = true
  }

  handleRenamePreset() {
    const oldName = this.renamePresetTarget
    const newName = this.renamePresetValue.trim()
    if (
      !newName ||
      oldName === newName ||
      this.presets[newName]
    ) {
      this.isRenameDialogOpen = false
      return
    }

    this.presets[newName] = this.presets[oldName]
    delete this.presets[oldName]
    this.#saveCustomPresets()

    this.isRenameDialogOpen = false
  }

  handleOpenOverwriteDialog(name: string, e: MouseEvent) {
    e.stopPropagation()
    this.overwritePresetTarget = name
    this.isOverwriteDialogOpen = true
  }

  handleOverwritePreset() {
    const name = this.overwritePresetTarget
    if (!name || !this.hasActiveSounds) return

    const activeVolumes: Record<string, number> = {}
    Object.keys(this.soundStates).forEach((id) => {
      if (this.soundStates[id].active) {
        activeVolumes[id] = this.soundStates[id].volume
      }
    })

    if (Object.keys(activeVolumes).length === 0) {
      return
    }

    this.presets[name] = activeVolumes
    this.#saveCustomPresets()

    this.isOverwriteDialogOpen = false
  }

  handleOpenDeleteDialog(name: string, e: MouseEvent) {
    e.stopPropagation()
    this.deletePresetTarget = name
    this.isDeleteDialogOpen = true
  }

  handleDeletePreset() {
    const name = this.deletePresetTarget
    if (!name) return

    delete this.presets[name]
    this.#saveCustomPresets()

    this.isDeleteDialogOpen = false
    this.deletePresetTarget = ''
  }
}

export const audio = new AudioManager()
