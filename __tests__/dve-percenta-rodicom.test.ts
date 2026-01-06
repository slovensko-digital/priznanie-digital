import { validate } from '../src/pages/dve-percenta-rodicom'

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
})
