import { rodnecislo } from 'rodnecislo'
import { generateRodneCislo } from './utils/generateRodneCislo'

describe('generateRodneCislo', () => {
  describe('generation and validation', () => {
    describe('basic format validation', () => {
      it('should generate valid birth ID with correct format (10 digits + delimiter)', () => {
        const result = generateRodneCislo({
          birthDate: new Date(2000, 5, 15),
          gender: 'MALE',
        })

        expect(result.pure).toMatch(/^\d{10}$/)
        expect(result.withDelimeter).toMatch(/^\d{6}\/\d{4}$/)

        // Validate with rodnecislo library
        const rc = rodnecislo(result.withDelimeter)
        expect(rc.isValid()).toBe(true)
      })

      it('should generate short format for dates before 1954 (9 digits)', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1950, 5, 15),
          gender: 'MALE',
        })

        expect(result.pure).toMatch(/^\d{9}$/)
        expect(result.withDelimeter).toMatch(/^\d{6}\/\d{3}$/)

        // Validate with rodnecislo library
        const rc = rodnecislo(result.withDelimeter)
        expect(rc.isValid()).toBe(true)
      })

      it('should generate long format for dates after 1954 (10 digits)', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1990, 5, 15),
          gender: 'MALE',
        })

        expect(result.pure).toMatch(/^\d{10}$/)
        expect(result.withDelimeter).toMatch(/^\d{6}\/\d{4}$/)

        // Validate with rodnecislo library
        const rc = rodnecislo(result.withDelimeter)
        expect(rc.isValid()).toBe(true)
      })
    })

    describe('date encoding', () => {
      it('should encode birth date correctly for males', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1990, 5, 15), // June 15, 1990
          gender: 'MALE',
        })

        const yearPart = result.pure.substring(0, 2)
        const monthPart = result.pure.substring(2, 4)
        const dayPart = result.pure.substring(4, 6)

        expect(yearPart).toBe('90')
        expect(monthPart).toBe('06') // Month 6 (June), no offset for males
        expect(dayPart).toBe('15')
      })

      it('should encode birth date correctly for females (month + 50)', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1990, 5, 15), // June 15, 1990
          gender: 'FEMALE',
        })

        const yearPart = result.pure.substring(0, 2)
        const monthPart = result.pure.substring(2, 4)
        const dayPart = result.pure.substring(4, 6)

        expect(yearPart).toBe('90')
        expect(monthPart).toBe('56') // Month 6 + 50 = 56
        expect(dayPart).toBe('15')
      })

      it('should handle December correctly for males', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1985, 11, 25), // December 25, 1985
          gender: 'MALE',
        })

        const monthPart = result.pure.substring(2, 4)
        expect(monthPart).toBe('12')
      })

      it('should handle December correctly for females', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1985, 11, 25), // December 25, 1985
          gender: 'FEMALE',
        })

        const monthPart = result.pure.substring(2, 4)
        expect(monthPart).toBe('62') // 12 + 50
      })

      it('should handle single-digit days with padding', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1990, 0, 5), // January 5, 1990
          gender: 'MALE',
        })

        const dayPart = result.pure.substring(4, 6)
        expect(dayPart).toBe('05')
      })
    })

    describe('alternative month encoding (post-2004)', () => {
      it('should support month + 20 for males when useAlternativeMonth is true', () => {
        const result = generateRodneCislo({
          birthDate: new Date(2010, 5, 15), // June 15, 2010
          gender: 'MALE',
          useAlternativeMonth: true,
        })

        const monthPart = result.pure.substring(2, 4)
        expect(monthPart).toBe('26') // 6 + 20 = 26
      })

      it('should support month + 70 for females when useAlternativeMonth is true', () => {
        const result = generateRodneCislo({
          birthDate: new Date(2010, 5, 15), // June 15, 2010
          gender: 'FEMALE',
          useAlternativeMonth: true,
        })

        const monthPart = result.pure.substring(2, 4)
        expect(monthPart).toBe('76') // 6 + 70 = 76
      })

      it('should not use alternative month for dates before 2004', () => {
        const result = generateRodneCislo({
          birthDate: new Date(2000, 5, 15),
          gender: 'MALE',
          useAlternativeMonth: true, // This should be ignored
        })

        const monthPart = result.pure.substring(2, 4)
        expect(monthPart).toBe('06') // Should be normal encoding, not 26
      })
    })

    describe('age-based generation', () => {
      it('should generate birth ID for specific age', () => {
        const result = generateRodneCislo({
          age: 30,
          gender: 'MALE',
        })

        expect(result.pure).toMatch(/^\d{10}$/)
        expect(result.withDelimeter).toMatch(/^\d{6}\/\d{4}$/)

        // Verify the year is approximately correct
        const yearPart = parseInt(result.pure.substring(0, 2), 10)
        const currentYear = new Date().getFullYear()
        const expectedYearShort = (currentYear - 30) % 100

        // Allow some flexibility due to month/day randomness
        expect(Math.abs(yearPart - expectedYearShort)).toBeLessThanOrEqual(1)
      })

      it('should generate birth ID for specific age and sex', () => {
        const result = generateRodneCislo({
          age: 40,
          gender: 'FEMALE',
        })

        expect(result.pure).toMatch(/^\d{10}$/)
        expect(result.withDelimeter).toMatch(/^\d{6}\/\d{4}$/)

        // Verify the year is approximately correct
        const yearPart = parseInt(result.pure.substring(0, 2), 10)
        const currentYear = new Date().getFullYear()
        const expectedYearShort = (currentYear - 40) % 100

        // Allow some flexibility due to month/day randomness
        expect(Math.abs(yearPart - expectedYearShort)).toBeLessThanOrEqual(1)
      })

      it('should generate birth ID when neither birthDate nor age is provided', () => {
        const result = generateRodneCislo({
          gender: 'FEMALE',
        })

        expect(result.pure).toBeTruthy()
        expect(result.withDelimeter).toMatch(/^\d{6}\/\d{3,4}$/)
      })
    })

    describe('divisibility by 11 check', () => {
      it('should generate number divisible by 11 for post-1954 dates', () => {
        // Run multiple times to test randomness
        for (let i = 0; i < 10; i++) {
          const result = generateRodneCislo({
            birthDate: new Date(1990, 5, 15),
            gender: 'MALE',
          })

          const number = parseInt(result.pure, 10)

          // Check divisibility by 11 OR special case (first 9 digits % 11 == 10 and last digit is 0)
          const firstNine = parseInt(result.pure.substring(0, 9), 10)
          const lastDigit = parseInt(result.pure.substring(9), 10)

          const isDivisibleBy11 = number % 11 === 0
          const isSpecialCase = firstNine % 11 === 10 && lastDigit === 0

          expect(isDivisibleBy11 || isSpecialCase).toBe(true)
        }
      })

      it('should work for various dates', () => {
        const testDates = [
          new Date(1990, 0, 1),
          new Date(2000, 6, 15),
          new Date(1975, 11, 31),
          new Date(2020, 5, 20),
        ]

        testDates.forEach((date) => {
          const result = generateRodneCislo({
            birthDate: date,
            gender: 'FEMALE',
          })

          const number = parseInt(result.pure, 10)
          const firstNine = parseInt(result.pure.substring(0, 9), 10)
          const lastDigit = parseInt(result.pure.substring(9), 10)

          const isDivisibleBy11 = number % 11 === 0
          const isSpecialCase = firstNine % 11 === 10 && lastDigit === 0

          expect(isDivisibleBy11 || isSpecialCase).toBe(true)
        })
      })
    })

    describe('delimiter handling', () => {
      it('should include delimiter in withDelimeter format', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1990, 5, 15),
          gender: 'MALE',
        })

        expect(result.withDelimeter).toContain('/')

        const parts = result.withDelimeter.split('/')
        expect(parts).toHaveLength(2)
        expect(parts[0]).toHaveLength(6)
        expect(parts[1]).toHaveLength(4)
      })

      it('should not include delimiter in pure format', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1990, 5, 15),
          gender: 'MALE',
        })

        expect(result.pure).not.toContain('/')
      })

      it('should generate consistent formats', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1990, 5, 15),
          gender: 'MALE',
        })

        const pureWithoutDelimiter = result.pure
        const delimitedWithoutSlash = result.withDelimeter.replace('/', '')

        expect(pureWithoutDelimiter).toBe(delimitedWithoutSlash)
      })
    })

    describe('gender encoding', () => {
      it('should generate different month codes for males and females', () => {
        const maleResult = generateRodneCislo({
          birthDate: new Date(1990, 5, 15),
          gender: 'MALE',
        })

        const femaleResult = generateRodneCislo({
          birthDate: new Date(1990, 5, 15),
          gender: 'FEMALE',
        })

        const maleMonth = parseInt(maleResult.pure.substring(2, 4), 10)
        const femaleMonth = parseInt(femaleResult.pure.substring(2, 4), 10)

        expect(femaleMonth - maleMonth).toBe(50)
      })

      it('should consistently apply gender encoding across multiple generations', () => {
        for (let i = 0; i < 5; i++) {
          const result = generateRodneCislo({
            birthDate: new Date(1990, 5, 15),
            gender: 'FEMALE',
          })

          const monthPart = parseInt(result.pure.substring(2, 4), 10)
          expect(monthPart).toBeGreaterThanOrEqual(51)
          expect(monthPart).toBeLessThanOrEqual(62)
        }
      })
    })

    describe('year encoding', () => {
      it('should use 2-digit year correctly for 20th century', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1985, 5, 15),
          gender: 'MALE',
        })

        const yearPart = result.pure.substring(0, 2)
        expect(yearPart).toBe('85')
      })

      it('should use 2-digit year correctly for 21st century', () => {
        const result = generateRodneCislo({
          birthDate: new Date(2015, 5, 15),
          gender: 'MALE',
        })

        const yearPart = result.pure.substring(0, 2)
        expect(yearPart).toBe('15')
      })

      it('should handle year 2000 correctly', () => {
        const result = generateRodneCislo({
          birthDate: new Date(2000, 0, 1),
          gender: 'MALE',
        })

        const yearPart = result.pure.substring(0, 2)
        expect(yearPart).toBe('00')
      })
    })

    describe('randomness', () => {
      it('should generate different serial numbers for same birth date', () => {
        const results = new Set()

        for (let i = 0; i < 20; i++) {
          const result = generateRodneCislo({
            birthDate: new Date(1990, 5, 15),
            gender: 'MALE',
          })
          results.add(result.pure)
        }

        // Should have generated mostly unique values
        expect(results.size).toBeGreaterThan(15)
      })
    })

    describe('edge cases', () => {
      it('should handle leap year dates', () => {
        const result = generateRodneCislo({
          birthDate: new Date(2000, 1, 29), // Feb 29, 2000 (leap year)
          gender: 'FEMALE',
        })

        const dayPart = result.pure.substring(4, 6)
        expect(dayPart).toBe('29')
      })

      it('should handle January (month 1)', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1990, 0, 15), // January
          gender: 'MALE',
        })

        const monthPart = result.pure.substring(2, 4)
        expect(monthPart).toBe('01')
      })

      it('should handle year boundaries', () => {
        const result1953 = generateRodneCislo({
          birthDate: new Date(1953, 5, 15),
          gender: 'MALE',
        })
        const result1954 = generateRodneCislo({
          birthDate: new Date(1954, 5, 15),
          gender: 'MALE',
        })

        expect(result1953.pure).toMatch(/^\d{9}$/) // Short format
        expect(result1954.pure).toMatch(/^\d{10}$/) // Long format
      })
    })

    describe('validation with rodnecislo library', () => {
      it('should generate valid IDs that pass rodnecislo validation', () => {
        for (let i = 0; i < 20; i++) {
          const result = generateRodneCislo({
            birthDate: new Date(1990, 5, 15),
            gender: 'MALE',
          })

          const rc = rodnecislo(result.withDelimeter)
          expect(rc.isValid()).toBe(true)
        }
      })

      it('should generate IDs with correct gender encoding (male)', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1990, 5, 15),
          gender: 'MALE',
        })

        const rc = rodnecislo(result.withDelimeter)
        expect(rc.isMale()).toBe(true)
        expect(rc.isFemale()).toBe(false)
      })

      it('should generate IDs with correct gender encoding (female)', () => {
        const result = generateRodneCislo({
          birthDate: new Date(1990, 5, 15),
          gender: 'FEMALE',
        })

        const rc = rodnecislo(result.withDelimeter)
        expect(rc.isFemale()).toBe(true)
        expect(rc.isMale()).toBe(false)
      })

      it('should generate IDs with correct birth date', () => {
        const birthDate = new Date(1990, 5, 15) // June 15, 1990
        const result = generateRodneCislo({
          birthDate,
          gender: 'MALE',
        })

        const rc = rodnecislo(result.withDelimeter)
        expect(rc.year()).toBe(1990)
        expect(rc.month()).toBe(5) // 0-based month
        expect(rc.day()).toBe(15)
      })

      it('should work for various dates and genders', () => {
        const testCases = [
          { date: new Date(1980, 0, 1), gender: 'MALE' as const },
          { date: new Date(1995, 6, 20), gender: 'FEMALE' as const },
          { date: new Date(2010, 11, 31), gender: 'MALE' as const },
          { date: new Date(1970, 3, 15), gender: 'FEMALE' as const },
        ]

        testCases.forEach(({ date, gender }) => {
          const result = generateRodneCislo({
            birthDate: date,
            gender,
          })

          const rc = rodnecislo(result.withDelimeter)
          expect(rc.isValid()).toBe(true)
          expect(rc.year()).toBe(date.getFullYear())
          expect(rc.month()).toBe(date.getMonth())
          expect(rc.day()).toBe(date.getDate())

          if (gender === 'MALE') {
            expect(rc.isMale()).toBe(true)
          } else {
            expect(rc.isFemale()).toBe(true)
          }
        })
      })

      it('should generate valid IDs with alternative month encoding', () => {
        const result = generateRodneCislo({
          birthDate: new Date(2010, 5, 15),
          gender: 'MALE',
          useAlternativeMonth: true,
        })

        const rc = rodnecislo(result.withDelimeter)
        expect(rc.isValid()).toBe(true)
        expect(rc.isMale()).toBe(true)
      })

      it('should generate valid IDs for ages', () => {
        for (let age = 18; age <= 65; age += 10) {
          const result = generateRodneCislo({
            age,
            gender: age % 2 === 0 ? 'MALE' : 'FEMALE',
          })

          const rc = rodnecislo(result.withDelimeter)
          expect(rc.isValid()).toBe(true)
          // Age can be off by 1 due to random month/day
          expect(Math.abs(rc.age() - age)).toBeLessThanOrEqual(1)
        }
      })
    })
  })
})
