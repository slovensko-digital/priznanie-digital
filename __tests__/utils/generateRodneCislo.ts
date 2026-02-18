export type GenderType = 'MALE' | 'FEMALE'
export type BirthIdGeneratorResult = { withDelimeter: string; pure: string }

export interface GenerateBirthIdOptions {
  /** Birth date. If not provided, calculated from age parameter or random date */
  birthDate?: Date
  /** Age in years. Used if birthDate is not provided */
  age?: number
  /** Gender of the person */
  gender: GenderType
  /**
   * Use alternative month encoding (+20 for males, +70 for females).
   * Only valid for dates after 2004. Default: false
   */
  useAlternativeMonth?: boolean
}

/**
 * Generate a valid Czech/Slovak birth ID (rodné číslo) for testing purposes.
 *
 * @param options - Generation options
 * @returns Object with birth ID in two formats: with delimiter (/) and pure numbers
 *
 * @example
 * // Generate for a specific birth date
 * generateRodneCislo({ birthDate: new Date(1990, 5, 15), gender: 'MALE' })
 *
 * // Generate for a person of specific age
 * generateRodneCislo({ age: 30, gender: 'FEMALE' })
 */
export const generateRodneCislo = (
  options: GenerateBirthIdOptions,
): BirthIdGeneratorResult => {
  let birthDate: Date

  if (options.birthDate) {
    birthDate = options.birthDate
  } else if (options.age !== undefined) {
    // Calculate birth date from age
    const today = new Date()
    birthDate = new Date(
      today.getFullYear() - options.age,
      Math.floor(Math.random() * 12), // Random month
      Math.floor(Math.random() * 28) + 1, // Random day (1-28 to avoid issues)
    )
  } else {
    // Generate random birth date between 1920 and now
    const now = new Date()
    const minYear = 1920
    const maxYear = now.getFullYear()
    const randomYear =
      Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear
    birthDate = new Date(
      randomYear,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    )
  }

  const fullYear = birthDate.getFullYear()
  const year = String(fullYear).substring(2)
  let month = birthDate.getMonth() + 1

  // Apply month encoding based on gender
  if (options.gender === 'FEMALE') {
    if (options.useAlternativeMonth && fullYear >= 2004) {
      month += 70
    } else {
      month += 50
    }
  } else if (options.gender === 'MALE') {
    if (options.useAlternativeMonth && fullYear >= 2004) {
      month += 20
    }
  }

  const day = birthDate.getDate()
  const datePart = [year, paddingLeft(month), paddingLeft(day)].join('')

  // Determine if short (9 digits) or long (10 digits) format
  const isShortFormat = fullYear < 1954

  // Generate random serial number and calculate check digit
  let birthId: string
  if (isShortFormat) {
    // Short format (before 1954): no check digit, just 3-digit serial
    const serial = Math.floor(Math.random() * 1000)
    birthId = datePart + paddingLeft(serial).padStart(3, '0')
  } else {
    // Long format (1954+): 3-digit serial + 1 check digit
    // The entire 10-digit number must be divisible by 11 (with exceptions)
    let attempts = 0
    const maxAttempts = 100

    while (attempts < maxAttempts) {
      const serial = Math.floor(Math.random() * 1000)
      const serialStr = paddingLeft(serial).padStart(3, '0')
      const firstNineDigits = datePart + serialStr

      // Calculate check digit to make the number divisible by 11
      const checkDigitResult = calculateCheckDigit(firstNineDigits, fullYear)

      if (checkDigitResult !== null) {
        birthId = firstNineDigits + checkDigitResult
        break
      }

      attempts++
    }

    // Fallback: if we couldn't find valid serial, use a deterministic approach
    if (!birthId) {
      const serial = 1
      const serialStr = paddingLeft(serial).padStart(3, '0')
      const firstNineDigits = datePart + serialStr
      const checkDigit = calculateCheckDigit(firstNineDigits, fullYear)
      birthId = firstNineDigits + (checkDigit || '0')
    }
  }

  return {
    pure: birthId,
    withDelimeter: addDelimeter(birthId),
  }
}

/**
 * Calculate the check digit for a 9-digit birth ID prefix.
 * The full 10-digit number must be divisible by 11.
 *
 * For years 1954-1985: If the calculated check digit would be 10, use 0 instead (special exception).
 * For other years: If check digit would be 10, return null to indicate we need a different serial.
 *
 * @returns Check digit as string, or null if we need to try a different serial number
 */
const calculateCheckDigit = (
  nineDigits: string,
  year: number,
): string | null => {
  const num = parseInt(nineDigits, 10)

  // We want the 10-digit number to be divisible by 11
  // The 10-digit number is: num * 10 + checkDigit
  // So we need: (num * 10 + checkDigit) % 11 === 0
  const remainder = (num * 10) % 11

  if (remainder === 0) {
    return '0'
  }

  // Check digit that makes the number divisible by 11
  const checkDigit = 11 - remainder

  // If check digit is 10, it's a special case
  if (checkDigit === 10) {
    // For years 1954-1985, the exception allows using 0
    if (year >= 1954 && year <= 1985) {
      return '0'
    }
    // For other years, we can't use 10 as a digit, return null to retry
    return null
  }

  return String(checkDigit)
}

const addDelimeter = (birthId: string): string => {
  const firstPart = birthId.substring(0, 6)
  const secondPart = birthId.substring(6)
  return `${firstPart}/${secondPart}`
}

const paddingLeft = (digit: number): string => {
  return String(digit).padStart(2, '0')
}
