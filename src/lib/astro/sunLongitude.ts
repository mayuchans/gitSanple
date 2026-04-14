/**
 * Sun ecliptic longitude calculation.
 * Based on Jean Meeus, "Astronomical Algorithms" 2nd ed., Chapter 25
 * (low-precision version, accurate to ~0.01° — more than sufficient for sign determination).
 */

import { toJulianDay } from './julianDay'
import { longitudeToSign } from './zodiacSign'
import type { ZodiacSign } from '@/types'

/**
 * Returns the Sun's apparent ecliptic longitude in degrees [0, 360)
 * for the given Julian Day Number.
 */
export function getSunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525

  // Sun's mean longitude (degrees)
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T

  // Sun's mean anomaly (degrees)
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T
  const Mr = (((M % 360) + 360) % 360) * (Math.PI / 180)

  // Equation of center
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mr) +
    0.000289 * Math.sin(3 * Mr)

  // Sun's true longitude
  const trueLon = L0 + C

  // Apparent longitude (correction for nutation and aberration)
  const omega = 125.04 - 1934.136 * T
  const omegaR = (((omega % 360) + 360) % 360) * (Math.PI / 180)
  const apparentLon = trueLon - 0.00569 - 0.00478 * Math.sin(omegaR)

  return ((apparentLon % 360) + 360) % 360
}

/** Returns the Sun's zodiac sign for a given calendar date (noon JST) */
export function getSunSign(year: number, month: number, day: number): ZodiacSign {
  const jd = toJulianDay(year, month, day, 12, 0, 9)
  return longitudeToSign(getSunLongitude(jd))
}
