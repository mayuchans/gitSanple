/**
 * Moon ecliptic longitude calculation.
 * Based on Jean Meeus, "Astronomical Algorithms" 2nd ed., Chapter 47
 * (low-precision version, accurate to ~10 arcminutes — sufficient for sign determination).
 */

import { toJulianDay } from './julianDay'
import { longitudeToSign } from './zodiacSign'
import type { ZodiacSign } from '@/types'

const toRad = (d: number) => (((d % 360) + 360) % 360) * (Math.PI / 180)

/**
 * Returns the Moon's apparent ecliptic longitude in degrees [0, 360)
 * for the given Julian Day Number.
 */
export function getMoonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525

  // Fundamental arguments (degrees)
  const L0 = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + (T * T * T) / 538841 - (T * T * T * T) / 65194000
  const M  = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + (T * T * T) / 69699     - (T * T * T * T) / 14712000
  const Ms = 357.5291092 +  35999.0502909 * T - 0.0001536 * T * T + (T * T * T) / 24490000
  const F  =  93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - (T * T * T) / 3526000   + (T * T * T * T) / 863310000
  const D  = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + (T * T * T) / 545868     - (T * T * T * T) / 113065000
  const Om = 125.0445479 -   1934.1362608 * T + 0.0020754 * T * T + (T * T * T) / 467441    - (T * T * T * T) / 60616000

  const Mr  = toRad(M)
  const Msr = toRad(Ms)
  const Fr  = toRad(F)
  const Dr  = toRad(D)
  const Omr = toRad(Om)

  // Periodic terms for longitude (degrees) — main 60 terms from Table 47.A
  const sigma =
    6.288774 * Math.sin(Mr) +
    1.274027 * Math.sin(2 * Dr - Mr) +
    0.658314 * Math.sin(2 * Dr) +
    0.213618 * Math.sin(2 * Mr) +
   -0.185116 * Math.sin(Msr) +
   -0.114332 * Math.sin(2 * Fr) +
    0.058793 * Math.sin(2 * Dr - 2 * Mr) +
    0.057066 * Math.sin(2 * Dr - Msr - Mr) +
    0.053322 * Math.sin(2 * Dr + Mr) +
    0.045758 * Math.sin(2 * Dr - Msr) +
   -0.040923 * Math.sin(Msr - Mr) +
   -0.034720 * Math.sin(Dr) +
   -0.030383 * Math.sin(Msr + Mr) +
    0.015327 * Math.sin(2 * Dr - 2 * Fr) +
   -0.012528 * Math.sin(2 * Fr + Mr) +
    0.010980 * Math.sin(2 * Fr - Mr) +
    0.010675 * Math.sin(4 * Dr - Mr) +
    0.010034 * Math.sin(3 * Mr) +
    0.008548 * Math.sin(4 * Dr - 2 * Mr) +
   -0.007888 * Math.sin(2 * Dr + Msr - Mr) +
   -0.006766 * Math.sin(2 * Dr + Msr) +
   -0.005163 * Math.sin(Dr - Mr) +
    0.004987 * Math.sin(Dr + Msr) +
    0.004036 * Math.sin(2 * Dr - Msr + Mr) +
    0.003994 * Math.sin(2 * Dr + 2 * Mr) +
    0.003861 * Math.sin(4 * Dr) +
    0.003665 * Math.sin(2 * Dr - 3 * Mr) +
   -0.002689 * Math.sin(Msr - 2 * Mr) +
   -0.002602 * Math.sin(2 * Dr - 2 * Fr + Mr) +
    0.002390 * Math.sin(2 * Dr - Msr - 2 * Mr) +
   -0.002348 * Math.sin(Dr + Mr) +
    0.002236 * Math.sin(2 * Dr - 2 * Msr) +
   -0.002120 * Math.sin(Msr + 2 * Mr) +
   -0.002069 * Math.sin(2 * Msr) +
    0.002048 * Math.sin(2 * Dr - 2 * Msr - Mr) +
   -0.001773 * Math.sin(2 * Dr + Mr - 2 * Fr) +
   -0.001595 * Math.sin(2 * Dr + 2 * Fr) +
    0.001215 * Math.sin(4 * Dr - Msr - Mr) +
   -0.001110 * Math.sin(2 * Mr + 2 * Fr) +
   -0.000892 * Math.sin(3 * Dr - Mr) +
   -0.000810 * Math.sin(2 * Dr + Msr + Mr) +
    0.000759 * Math.sin(4 * Dr - Msr - 2 * Mr) +
   -0.000713 * Math.sin(2 * Msr - Mr) +
   -0.000700 * Math.sin(2 * Dr + 2 * Msr - Mr) +
    0.000691 * Math.sin(2 * Dr + Msr - 2 * Mr) +
    0.000596 * Math.sin(2 * Dr - Omr - Mr) +
    0.000549 * Math.sin(4 * Dr + Mr) +
    0.000537 * Math.sin(4 * Mr) +
    0.000520 * Math.sin(4 * Dr - Msr) +
   -0.000487 * Math.sin(Dr - 2 * Mr) +
   -0.000399 * Math.sin(2 * Dr + Msr - 2 * Fr) +
   -0.000381 * Math.sin(2 * Mr - 2 * Fr) +
    0.000351 * Math.sin(Dr + Msr + Mr) +
   -0.000340 * Math.sin(3 * Dr - 2 * Mr) +
    0.000330 * Math.sin(4 * Dr - 3 * Mr) +
    0.000327 * Math.sin(2 * Dr - Msr + 2 * Mr) +
   -0.000323 * Math.sin(2 * Msr + Mr) +
    0.000299 * Math.sin(Dr + Msr - Mr) +
    0.000294 * Math.sin(2 * Dr + 3 * Mr)

  // Additive corrections for longitude
  const add =
   -0.00017 * Math.sin(Omr) +
   -0.00015 * Math.sin(Msr + Mr) +
   -0.00011 * Math.sin(2 * Fr) +
    0.00009 * Math.sin(2 * Mr - 2 * Fr) +
    0.00008 * Math.sin(2 * Dr - 2 * Fr + Mr)

  const longitude = L0 + sigma + add * 57.29578 // convert add from radians approximation
  // Note: add terms are already in degrees-equivalent, so:
  const finalLon = L0 + sigma
  return ((finalLon % 360) + 360) % 360
}

/** Returns the Moon's zodiac sign at a given JST date and time */
export function getMoonSignAtTime(
  year: number,
  month: number,
  day: number,
  hour: number = 12,
  minute: number = 0
): ZodiacSign {
  const jd = toJulianDay(year, month, day, hour, minute, 9)
  return longitudeToSign(getMoonLongitude(jd))
}

/**
 * Check whether the Moon changes zodiac sign during the given calendar day (JST).
 * Returns the sign at 00:00 JST and at 23:00 JST.
 */
export function checkMoonBoundary(
  year: number,
  month: number,
  day: number
): { needsTime: boolean; sign00h: ZodiacSign; sign24h: ZodiacSign } {
  const sign00h = getMoonSignAtTime(year, month, day, 0, 0)
  const sign24h = getMoonSignAtTime(year, month, day, 23, 0)
  return {
    needsTime: sign00h !== sign24h,
    sign00h,
    sign24h,
  }
}
