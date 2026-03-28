import { rodnecislo } from 'rodnecislo'
import { generateBirthId } from '../src/lib/rodneCisloGenerator'

describe('generateBirthId', () => {
  describe('basic format validation', () => {
    it('should generate a birth ID with correct digit count for male born after 1954', () => {
      const result = generateBirthId(new Date(1990, 5, 15), 'MALE')
      expect(result.pure).toMatch(/^\d{10}$/)
      expect(result.withDelimeter).toMatch(/^\d{6}\/\d{4}$/)
    })

    it('should generate a birth ID with correct digit count for female born after 1954', () => {
      const result = generateBirthId(new Date(1985, 2, 20), 'FEMALE')
      expect(result.pure).toMatch(/^\d{10}$/)
      expect(result.withDelimeter).toMatch(/^\d{6}\/\d{4}$/)
    })

    it('should generate a valid birth ID (passes rodnecislo validation)', () => {
      const result = generateBirthId(new Date(1990, 5, 15), 'MALE')
      const rc = rodnecislo(result.withDelimeter)
      expect(rc.isValid()).toBe(true)
    })

    it('should generate a valid birth ID for year starting with 0 (leading zero handling)', () => {
      // Year "01" = 2001, day "01" → firstPart = "010101", Number loses leading zero
      // This exercises the padStart branch (line 29 in rodneCisloGenerator.ts)
      const result = generateBirthId(new Date(2001, 0, 1), 'MALE')
      expect(result.pure).toMatch(/^\d{10}$/)
      expect(result.pure.charAt(0)).toBe('0')
    })
  })

  describe('gender encoding', () => {
    it('should encode male month correctly (no offset for standard format)', () => {
      // Male: month 6 (July, 0-based) → month digit in ID = 07
      const result = generateBirthId(new Date(1990, 6, 1), 'MALE')
      const monthPart = result.pure.substring(2, 4)
      expect(monthPart).toBe('07')
    })

    it('should encode female month correctly (+50 offset)', () => {
      // Female: month 1 (February, 0-based) → month digit in ID = 51 or 71 (alt)
      const result = generateBirthId(new Date(1990, 1, 1), 'FEMALE')
      const monthPart = parseInt(result.pure.substring(2, 4), 10)
      expect(monthPart).toBeGreaterThanOrEqual(50)
    })
  })

  describe('birth date encoding', () => {
    it('should encode year correctly', () => {
      const result = generateBirthId(new Date(1985, 0, 1), 'MALE')
      const yearPart = result.pure.substring(0, 2)
      expect(yearPart).toBe('85')
    })

    it('should encode day correctly', () => {
      const result = generateBirthId(new Date(1990, 0, 15), 'MALE')
      const dayPart = result.pure.substring(4, 6)
      expect(dayPart).toBe('15')
    })
  })

  describe('short format (born before 1954)', () => {
    it('should generate 9-digit birth ID for people born before 1954', () => {
      const result = generateBirthId(new Date(1950, 5, 15), 'MALE')
      expect(result.pure).toMatch(/^\d{9}$/)
    })
  })

  describe('result format', () => {
    it('should return object with pure and withDelimeter properties', () => {
      const result = generateBirthId(new Date(1990, 5, 15), 'MALE')
      expect(result).toHaveProperty('pure')
      expect(result).toHaveProperty('withDelimeter')
    })

    it('withDelimeter should have slash after 6th digit', () => {
      const result = generateBirthId(new Date(1990, 5, 15), 'MALE')
      expect(result.withDelimeter.charAt(6)).toBe('/')
    })

    it('pure and withDelimeter should encode the same birth ID', () => {
      const result = generateBirthId(new Date(1990, 5, 15), 'MALE')
      const pureFromDelimited = result.withDelimeter.replace('/', '')
      expect(pureFromDelimited).toBe(result.pure)
    })
  })
})
