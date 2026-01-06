import { validate } from '../src/pages/dve-percenta-rodicom'
import { calculate } from '../src/lib/calculation'
import { convertToXML } from '../src/lib/xml/xmlConverter'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { initTaxFormUserInputValues } from '../src/lib/initialValues'

describe('dve-percenta-rodicom', () => {
  describe('#validate', () => {
    it('should return error when dve_percenta_rodicom is not selected', () => {
      const errors = validate({
        dve_percenta_rodicom: undefined,
        dve_percenta_rodicA: undefined,
        dve_percenta_rodicB: undefined,
        dve_percenta_rodicom_nahradna_starostlivost: false,
      })
      expect(errors.dve_percenta_rodicom).toBe('Vyznačte odpoveď')
    })

    it('should return no errors when "nie" is selected', () => {
      const errors = validate({
        dve_percenta_rodicom: 'nie',
        dve_percenta_rodicA: undefined,
        dve_percenta_rodicB: undefined,
        dve_percenta_rodicom_nahradna_starostlivost: false,
      })
      expect(Object.keys(errors)).toHaveLength(0)
    })

    describe('when "jednemu" is selected', () => {
      it('should return errors for missing parent A fields', () => {
        const errors = validate({
          dve_percenta_rodicom: 'jednemu',
          dve_percenta_rodicA: {
            meno: '',
            priezvisko: '',
            rodneCislo: '',
          },
          dve_percenta_rodicB: undefined,
          dve_percenta_rodicom_nahradna_starostlivost: false,
        })
        expect(errors.dve_percenta_rodicA?.meno).toBe('Zadajte meno rodiča')
        expect(errors.dve_percenta_rodicA?.priezvisko).toBe(
          'Zadajte priezvisko rodiča',
        )
        expect(errors.dve_percenta_rodicA?.rodneCislo).toBe(
          'Zadajte rodné číslo rodiča',
        )
      })

      it('should return error for invalid rodné číslo', () => {
        const errors = validate({
          dve_percenta_rodicom: 'jednemu',
          dve_percenta_rodicA: {
            meno: 'Ján',
            priezvisko: 'Novák',
            rodneCislo: '123456789',
          },
          dve_percenta_rodicB: undefined,
          dve_percenta_rodicom_nahradna_starostlivost: false,
        })
        expect(errors.dve_percenta_rodicA?.meno).toBeUndefined()
        expect(errors.dve_percenta_rodicA?.priezvisko).toBeUndefined()
        expect(errors.dve_percenta_rodicA?.rodneCislo).toBe(
          'Zadané rodné číslo nie je správne',
        )
      })

      it('should return no errors when parent A is valid', () => {
        const errors = validate({
          dve_percenta_rodicom: 'jednemu',
          dve_percenta_rodicA: {
            meno: 'Ján',
            priezvisko: 'Novák',
            rodneCislo: '625412 / 2512',
          },
          dve_percenta_rodicB: undefined,
          dve_percenta_rodicom_nahradna_starostlivost: false,
        })
        expect(Object.keys(errors)).toHaveLength(0)
      })

      it('should not validate parent B when "jednemu" is selected', () => {
        const errors = validate({
          dve_percenta_rodicom: 'jednemu',
          dve_percenta_rodicA: {
            meno: 'Ján',
            priezvisko: 'Novák',
            rodneCislo: '625412 / 2512',
          },
          dve_percenta_rodicB: undefined,
          dve_percenta_rodicom_nahradna_starostlivost: false,
        })
        expect(errors.dve_percenta_rodicB).toBeUndefined()
      })
    })

    describe('when "obidvom" is selected', () => {
      it('should return errors for missing parent A and B fields', () => {
        const errors = validate({
          dve_percenta_rodicom: 'obidvom',
          dve_percenta_rodicA: {
            meno: '',
            priezvisko: '',
            rodneCislo: '',
          },
          dve_percenta_rodicB: {
            meno: '',
            priezvisko: '',
            rodneCislo: '',
          },
          dve_percenta_rodicom_nahradna_starostlivost: false,
        })
        expect(errors.dve_percenta_rodicA?.meno).toBe('Zadajte meno rodiča')
        expect(errors.dve_percenta_rodicA?.priezvisko).toBe(
          'Zadajte priezvisko rodiča',
        )
        expect(errors.dve_percenta_rodicA?.rodneCislo).toBe(
          'Zadajte rodné číslo rodiča',
        )
        expect(errors.dve_percenta_rodicB?.meno).toBe('Zadajte meno rodiča')
        expect(errors.dve_percenta_rodicB?.priezvisko).toBe(
          'Zadajte priezvisko rodiča',
        )
        expect(errors.dve_percenta_rodicB?.rodneCislo).toBe(
          'Zadajte rodné číslo rodiča',
        )
      })

      it('should return errors for invalid rodné číslo for both parents', () => {
        const errors = validate({
          dve_percenta_rodicom: 'obidvom',
          dve_percenta_rodicA: {
            meno: 'Ján',
            priezvisko: 'Novák',
            rodneCislo: '123456789',
          },
          dve_percenta_rodicB: {
            meno: 'Mária',
            priezvisko: 'Nováková',
            rodneCislo: '987654321',
          },
          dve_percenta_rodicom_nahradna_starostlivost: false,
        })
        expect(errors.dve_percenta_rodicA?.rodneCislo).toBe(
          'Zadané rodné číslo nie je správne',
        )
        expect(errors.dve_percenta_rodicB?.rodneCislo).toBe(
          'Zadané rodné číslo nie je správne',
        )
      })

      it('should return no errors when both parents are valid', () => {
        const errors = validate({
          dve_percenta_rodicom: 'obidvom',
          dve_percenta_rodicA: {
            meno: 'Ján',
            priezvisko: 'Novák',
            rodneCislo: '625412 / 2512',
          },
          dve_percenta_rodicB: {
            meno: 'Mária',
            priezvisko: 'Nováková',
            rodneCislo: '625412 / 3304',
          },
          dve_percenta_rodicom_nahradna_starostlivost: false,
        })
        expect(Object.keys(errors)).toHaveLength(0)
      })

      it('should return errors only for invalid parent', () => {
        const errors = validate({
          dve_percenta_rodicom: 'obidvom',
          dve_percenta_rodicA: {
            meno: 'Ján',
            priezvisko: 'Novák',
            rodneCislo: '625412 / 6208',
          },
          dve_percenta_rodicB: {
            meno: '',
            priezvisko: 'Nováková',
            rodneCislo: '625412 / 5790',
          },
          dve_percenta_rodicom_nahradna_starostlivost: false,
        })
        expect(errors.dve_percenta_rodicA).toBeUndefined()
        expect(errors.dve_percenta_rodicB?.meno).toBe('Zadajte meno rodiča')
        expect(errors.dve_percenta_rodicB?.priezvisko).toBeUndefined()
        expect(errors.dve_percenta_rodicB?.rodneCislo).toBeUndefined()
      })
    })
  })

  describe('#calculate r153', () => {
    const baseInput: TaxFormUserInput = {
      ...initTaxFormUserInputValues,
      t1r10_prijmy: '25000',
      priloha3_r11_socialne: '1000',
      priloha3_r13_zdravotne: '1000',
      datum: '22.02.2026',
    }

    it('should return undefined when dve_percenta_rodicom is not set', () => {
      const result = calculate({
        ...baseInput,
        dve_percenta_rodicom: undefined,
      })
      expect(result.r153).toBeUndefined()
    })

    it('should return undefined when dve_percenta_rodicom is "nie"', () => {
      const result = calculate({
        ...baseInput,
        dve_percenta_rodicom: 'nie',
      })
      expect(result.r153).toBeUndefined()
    })

    it('should return parent A data when "jednemu" is selected', () => {
      const result = calculate({
        ...baseInput,
        dve_percenta_rodicom: 'jednemu',
        dve_percenta_rodicA: {
          meno: 'Ján',
          priezvisko: 'Novák',
          rodneCislo: '625412 / 2512',
        },
        dve_percenta_rodicom_nahradna_starostlivost: false,
      })

      expect(result.r153).toBeDefined()
      expect(result.r153?.neuplatnujemPar50aa).toBe(false)
      expect(result.r153?.bolZverenyDoStarostlivosti).toBe(false)
      expect(result.r153?.rodicA).toEqual({
        meno: 'Ján',
        priezvisko: 'Novák',
        rodneCislo: '6254122512',
      })
      expect(result.r153?.rodicB).toBeUndefined()
    })

    it('should return parent A data with adoption flag when "jednemu" is selected and adoption is true', () => {
      const result = calculate({
        ...baseInput,
        dve_percenta_rodicom: 'jednemu',
        dve_percenta_rodicA: {
          meno: 'Mária',
          priezvisko: 'Nováková',
          rodneCislo: '625412 / 3304',
        },
        dve_percenta_rodicom_nahradna_starostlivost: true,
      })

      expect(result.r153).toBeDefined()
      expect(result.r153?.bolZverenyDoStarostlivosti).toBe(true)
      expect(result.r153?.rodicA).toEqual({
        meno: 'Mária',
        priezvisko: 'Nováková',
        rodneCislo: '6254123304',
      })
      expect(result.r153?.rodicB).toBeUndefined()
    })

    it('should return both parents data when "obidvom" is selected', () => {
      const result = calculate({
        ...baseInput,
        dve_percenta_rodicom: 'obidvom',
        dve_percenta_rodicA: {
          meno: 'Ján',
          priezvisko: 'Novák',
          rodneCislo: '625412 / 2512',
        },
        dve_percenta_rodicB: {
          meno: 'Mária',
          priezvisko: 'Nováková',
          rodneCislo: '625412 / 3304',
        },
        dve_percenta_rodicom_nahradna_starostlivost: false,
      })

      expect(result.r153).toBeDefined()
      expect(result.r153?.neuplatnujemPar50aa).toBe(false)
      expect(result.r153?.bolZverenyDoStarostlivosti).toBe(false)
      expect(result.r153?.rodicA).toEqual({
        meno: 'Ján',
        priezvisko: 'Novák',
        rodneCislo: '6254122512',
      })
      expect(result.r153?.rodicB).toEqual({
        meno: 'Mária',
        priezvisko: 'Nováková',
        rodneCislo: '6254123304',
      })
    })

    it('should return both parents data with adoption flag when "obidvom" is selected and adoption is true', () => {
      const result = calculate({
        ...baseInput,
        dve_percenta_rodicom: 'obidvom',
        dve_percenta_rodicA: {
          meno: 'Peter',
          priezvisko: 'Horák',
          rodneCislo: '550215 / 1234',
        },
        dve_percenta_rodicB: {
          meno: 'Anna',
          priezvisko: 'Horáková',
          rodneCislo: '555520 / 5678',
        },
        dve_percenta_rodicom_nahradna_starostlivost: true,
      })

      expect(result.r153).toBeDefined()
      expect(result.r153?.bolZverenyDoStarostlivosti).toBe(true)
      expect(result.r153?.rodicA).toEqual({
        meno: 'Peter',
        priezvisko: 'Horák',
        rodneCislo: '5502151234',
      })
      expect(result.r153?.rodicB).toEqual({
        meno: 'Anna',
        priezvisko: 'Horáková',
        rodneCislo: '5555205678',
      })
    })

    it('should strip non-digit characters from rodne cislo', () => {
      const result = calculate({
        ...baseInput,
        dve_percenta_rodicom: 'jednemu',
        dve_percenta_rodicA: {
          meno: 'Test',
          priezvisko: 'User',
          rodneCislo: '123 456 / 7890',
        },
        dve_percenta_rodicom_nahradna_starostlivost: false,
      })

      expect(result.r153?.rodicA?.rodneCislo).toBe('1234567890')
    })
  })

  describe('#convertToXML r153', () => {
    const baseInput: TaxFormUserInput = {
      ...initTaxFormUserInputValues,
      r001_dic: '233123123',
      r003_nace: '62010 - Počítačové programovanie',
      r005_meno: 'Test',
      r004_priezvisko: 'User',
      r007_ulica: 'Testova',
      r008_cislo: '1',
      r009_psc: '82105',
      r010_obec: 'Bratislava',
      r011_stat: 'Slovensko',
      t1r10_prijmy: '50000',
      priloha3_r11_socialne: '3000',
      priloha3_r13_zdravotne: '2000',
      datum: '22.02.2026',
    }

    it('should include parent A data in XML when "jednemu" is selected', () => {
      const taxForm = calculate({
        ...baseInput,
        dve_percenta_rodicom: 'jednemu',
        dve_percenta_rodicA: {
          meno: 'Ján',
          priezvisko: 'Novák',
          rodneCislo: '625412 / 2512',
        },
        dve_percenta_rodicom_nahradna_starostlivost: false,
      })

      const xml = convertToXML(taxForm)

      expect(xml).toContain('<neuplatnujemPar50aa>0</neuplatnujemPar50aa>')
      expect(xml).toContain(
        '<bolZverenyDoStarostlivosti>0</bolZverenyDoStarostlivosti>',
      )
      expect(xml).toContain('<rodicA>')
      expect(xml).toContain('<meno>Ján</meno>')
      expect(xml).toContain('<priezvisko>Novák</priezvisko>')
      expect(xml).toContain('<rodneCislo>6254122512</rodneCislo>')
    })

    it('should include both parents data in XML when "obidvom" is selected', () => {
      const taxForm = calculate({
        ...baseInput,
        dve_percenta_rodicom: 'obidvom',
        dve_percenta_rodicA: {
          meno: 'Ján',
          priezvisko: 'Novák',
          rodneCislo: '625412 / 2512',
        },
        dve_percenta_rodicB: {
          meno: 'Mária',
          priezvisko: 'Nováková',
          rodneCislo: '625412 / 3304',
        },
        dve_percenta_rodicom_nahradna_starostlivost: true,
      })

      const xml = convertToXML(taxForm)

      expect(xml).toContain('<neuplatnujemPar50aa>0</neuplatnujemPar50aa>')
      expect(xml).toContain(
        '<bolZverenyDoStarostlivosti>1</bolZverenyDoStarostlivosti>',
      )
      expect(xml).toContain('<rodicA>')
      expect(xml).toContain('<rodicB>')
      // Parent A
      expect(xml).toMatch(/<rodicA>[\s\S]*<meno>Ján<\/meno>[\s\S]*<\/rodicA>/)
      expect(xml).toMatch(
        /<rodicA>[\s\S]*<priezvisko>Novák<\/priezvisko>[\s\S]*<\/rodicA>/,
      )
      expect(xml).toMatch(
        /<rodicA>[\s\S]*<rodneCislo>6254122512<\/rodneCislo>[\s\S]*<\/rodicA>/,
      )
      // Parent B
      expect(xml).toMatch(/<rodicB>[\s\S]*<meno>Mária<\/meno>[\s\S]*<\/rodicB>/)
      expect(xml).toMatch(
        /<rodicB>[\s\S]*<priezvisko>Nováková<\/priezvisko>[\s\S]*<\/rodicB>/,
      )
      expect(xml).toMatch(
        /<rodicB>[\s\S]*<rodneCislo>6254123304<\/rodneCislo>[\s\S]*<\/rodicB>/,
      )
    })
  })
})
