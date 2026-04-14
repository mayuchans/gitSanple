import { ZODIAC_SIGNS } from '@/lib/astro'
import type { ZodiacSign } from '@/types'

export function toSlug(sun: ZodiacSign, moon: ZodiacSign): string {
  return `${sun}-${moon}`
}

export function fromSlug(slug: string): { sun: ZodiacSign; moon: ZodiacSign } | null {
  const parts = slug.split('-')
  if (parts.length !== 2) return null
  const [sun, moon] = parts
  if (!ZODIAC_SIGNS.includes(sun as ZodiacSign)) return null
  if (!ZODIAC_SIGNS.includes(moon as ZodiacSign)) return null
  return { sun: sun as ZodiacSign, moon: moon as ZodiacSign }
}

export function isValidCombo(slug: string): boolean {
  return fromSlug(slug) !== null
}
