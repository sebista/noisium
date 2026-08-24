import type { Icon } from 'lucide-svelte'

export interface SoundState {
  active: boolean
  volume: number
  url: string
  isCustom?: boolean
  blob?: Blob
}

export type CategoryId =
  | 'all'
  | 'nature'
  | 'travel'
  | 'urban'
  | 'noise'
  | 'custom'

export interface SoundDefinition {
  id: string
  name: string
  url: string
  category: Exclude<CategoryId, 'all'>
  icon: typeof Icon
}
