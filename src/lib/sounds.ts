import birdsUrl from '@/assets/birds.mp3'
import boatUrl from '@/assets/boat.mp3'
import cityUrl from '@/assets/city.mp3'
import coffeeShopUrl from '@/assets/coffee-shop.mp3'
import fireplaceUrl from '@/assets/fireplace.mp3'
import pinkNoiseUrl from '@/assets/pink-noise.mp3'
import rainUrl from '@/assets/rain.mp3'
import stormUrl from '@/assets/storm.mp3'
import streamUrl from '@/assets/stream.mp3'
import summerNightUrl from '@/assets/summer-night.mp3'
import trainUrl from '@/assets/train.mp3'
import wavesUrl from '@/assets/waves.mp3'
import whiteNoiseUrl from '@/assets/white-noise.mp3'
import windUrl from '@/assets/wind.mp3'

import type { SoundDefinition, CategoryId } from '@/types'
import {
  Waves,
  Music,
  CloudRain,
  Sparkles,
  Train,
  Building2,
} from 'lucide-svelte'

export const defaultSounds: SoundDefinition[] = [
  {
    id: 'rain',
    name: 'Rain',
    url: rainUrl,
    category: 'nature',
    icon: 'CloudRain',
  },
  {
    id: 'storm',
    name: 'Storm',
    url: stormUrl,
    category: 'nature',
    icon: 'CloudLightning',
  },
  { id: 'wind', name: 'Wind', url: windUrl, category: 'nature', icon: 'Wind' },
  {
    id: 'waves',
    name: 'Waves',
    url: wavesUrl,
    category: 'nature',
    icon: 'Waves',
  },
  {
    id: 'stream',
    name: 'Stream',
    url: streamUrl,
    category: 'nature',
    icon: 'Droplet',
  },
  {
    id: 'birds',
    name: 'Birds',
    url: birdsUrl,
    category: 'nature',
    icon: 'Bird',
  },
  {
    id: 'summer-night',
    name: 'Summer Night',
    url: summerNightUrl,
    category: 'nature',
    icon: 'Moon',
  },

  {
    id: 'train',
    name: 'Train',
    url: trainUrl,
    category: 'travel',
    icon: 'Train',
  },
  {
    id: 'boat',
    name: 'Boat',
    url: boatUrl,
    category: 'travel',
    icon: 'Sailboat',
  },

  {
    id: 'city',
    name: 'City',
    url: cityUrl,
    category: 'urban',
    icon: 'Building2',
  },
  {
    id: 'coffee-shop',
    name: 'Coffee Shop',
    url: coffeeShopUrl,
    category: 'urban',
    icon: 'Coffee',
  },

  {
    id: 'fireplace',
    name: 'Fireplace',
    url: fireplaceUrl,
    category: 'noise',
    icon: 'Flame',
  },
  {
    id: 'white-noise',
    name: 'White Noise',
    url: whiteNoiseUrl,
    category: 'noise',
    icon: 'Activity',
  },
  {
    id: 'pink-noise',
    name: 'Pink Noise',
    url: pinkNoiseUrl,
    category: 'noise',
    icon: 'Sparkles',
  },
]

export interface CategoryDefinition {
  id: CategoryId
  label: string
  icon: import('svelte').ComponentType
}

export const CATEGORIES: CategoryDefinition[] = [
  { id: 'all', label: 'All Sounds', icon: Waves },
  { id: 'nature', label: 'Nature', icon: CloudRain },
  { id: 'travel', label: 'Travel', icon: Train },
  { id: 'urban', label: 'Urban', icon: Building2 },
  { id: 'noise', label: 'Noise', icon: Sparkles },
  { id: 'custom', label: 'My Sounds', icon: Music },
]
