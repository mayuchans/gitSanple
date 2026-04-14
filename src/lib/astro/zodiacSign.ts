import type { ZodiacSign, SignDisplay } from '@/types'

export const ZODIAC_SIGNS: ZodiacSign[] = [
  'aries', 'taurus', 'gemini', 'cancer',
  'leo', 'virgo', 'libra', 'scorpio',
  'sagittarius', 'capricorn', 'aquarius', 'pisces',
]

export const SIGN_DISPLAY: Record<ZodiacSign, SignDisplay> = {
  aries:       { sign: 'aries',       nameJP: '牡羊座', glyph: '♈', element: '火', elementColor: '#E8603C', modality: '活動宮' },
  taurus:      { sign: 'taurus',      nameJP: '牡牛座', glyph: '♉', element: '地', elementColor: '#6B8E4E', modality: '不動宮' },
  gemini:      { sign: 'gemini',      nameJP: '双子座', glyph: '♊', element: '風', elementColor: '#5B8EC4', modality: '柔軟宮' },
  cancer:      { sign: 'cancer',      nameJP: '蟹座',   glyph: '♋', element: '水', elementColor: '#7B9EC4', modality: '活動宮' },
  leo:         { sign: 'leo',         nameJP: '獅子座', glyph: '♌', element: '火', elementColor: '#E8603C', modality: '不動宮' },
  virgo:       { sign: 'virgo',       nameJP: '乙女座', glyph: '♍', element: '地', elementColor: '#6B8E4E', modality: '柔軟宮' },
  libra:       { sign: 'libra',       nameJP: '天秤座', glyph: '♎', element: '風', elementColor: '#5B8EC4', modality: '活動宮' },
  scorpio:     { sign: 'scorpio',     nameJP: '蠍座',   glyph: '♏', element: '水', elementColor: '#7B9EC4', modality: '不動宮' },
  sagittarius: { sign: 'sagittarius', nameJP: '射手座', glyph: '♐', element: '火', elementColor: '#E8603C', modality: '柔軟宮' },
  capricorn:   { sign: 'capricorn',   nameJP: '山羊座', glyph: '♑', element: '地', elementColor: '#6B8E4E', modality: '活動宮' },
  aquarius:    { sign: 'aquarius',    nameJP: '水瓶座', glyph: '♒', element: '風', elementColor: '#5B8EC4', modality: '不動宮' },
  pisces:      { sign: 'pisces',      nameJP: '魚座',   glyph: '♓', element: '水', elementColor: '#7B9EC4', modality: '柔軟宮' },
}

/** Convert ecliptic longitude (0-360°) to zodiac sign index (0=Aries … 11=Pisces) */
export function longitudeToSignIndex(longitude: number): number {
  return Math.floor(((longitude % 360) + 360) % 360 / 30)
}

/** Convert ecliptic longitude to ZodiacSign */
export function longitudeToSign(longitude: number): ZodiacSign {
  return ZODIAC_SIGNS[longitudeToSignIndex(longitude)]
}
