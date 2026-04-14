/**
 * Convert a calendar date/time to Julian Day Number.
 * Based on Jean Meeus, "Astronomical Algorithms" 2nd ed., Chapter 7.
 *
 * @param year   - Gregorian year (e.g. 1990)
 * @param month  - 1-12
 * @param day    - 1-31
 * @param hour   - 0-23 (local time)
 * @param minute - 0-59
 * @param tzOffsetHours - offset from UTC in hours (e.g. +9 for JST)
 */
export function toJulianDay(
  year: number,
  month: number,
  day: number,
  hour: number = 12,
  minute: number = 0,
  tzOffsetHours: number = 9
): number {
  // Convert local time to UTC
  const utcDecimalHour = hour + minute / 60 - tzOffsetHours
  let utcDay = day + utcDecimalHour / 24

  // Handle day overflow/underflow
  let y = year
  let m = month
  let d = utcDay

  if (d < 1) {
    m -= 1
    if (m < 1) {
      m = 12
      y -= 1
    }
    const daysInPrevMonth = new Date(y, m, 0).getDate()
    d += daysInPrevMonth
  } else if (d >= new Date(y, m, 0).getDate() + 1) {
    d -= new Date(y, m, 0).getDate()
    m += 1
    if (m > 12) {
      m = 1
      y += 1
    }
  }

  if (m <= 2) {
    y -= 1
    m += 12
  }

  const A = Math.floor(y / 100)
  const B = 2 - A + Math.floor(A / 4)

  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    d +
    B -
    1524.5
  )
}
