export type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer'
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

export interface SignDisplay {
  sign: ZodiacSign
  nameJP: string
  glyph: string
  element: '火' | '地' | '風' | '水'
  elementColor: string
  modality: '活動宮' | '不動宮' | '柔軟宮'
}

export interface DiagnosisEntry {
  title: string
  body: string
  traits: string[]
  love: string
  advice: string
}

export interface DiagnosisResult {
  sunSign: ZodiacSign
  moonSign: ZodiacSign
  diagnosis: DiagnosisEntry
}

export interface BoundaryCheckResponse {
  needsTime: boolean
  sign00h: ZodiacSign
  sign24h: ZodiacSign
}
