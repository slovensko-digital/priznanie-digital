import { anoymizeChild, anonymizeTaxForm } from '../src/components/Feedback'
import { initTaxFormUserInputValues } from '../src/lib/initialValues'

describe('anonymizeTaxForm', () => {
  const PII_FIELDS = [
    'r001_dic',
    'r003_nace',
    'r004_priezvisko',
    'r005_meno',
    'meno_priezvisko',
    'r006_titul',
    'r006_titul_za',
    'r007_ulica',
    'r008_cislo',
    'r009_psc',
    'r010_obec',
    'r011_stat',
    'r031_priezvisko_a_meno',
    'r031_rodne_cislo',
    'r034_priezvisko_a_meno',
    'r034_rodne_cislo',
    'iban',
    'email',
  ] as const

  const input = {
    ...initTaxFormUserInputValues,
    r001_dic: '1234567890',
    r003_nace: '62010 - Počítačové programovanie',
    r004_priezvisko: 'Opálená',
    r005_meno: 'Alexandra',
    meno_priezvisko: 'Jana Nováková',
    r006_titul: 'Ing.',
    r006_titul_za: 'PhD.',
    r007_ulica: 'Mierova',
    r008_cislo: '4',
    r009_psc: '82105',
    r010_obec: 'Bratislava',
    r011_stat: 'Slovensko',
    r031_priezvisko_a_meno: 'Partner Meno',
    r031_rodne_cislo: '9609226286',
    r034_priezvisko_a_meno: 'Jana Nováková',
    r034_rodne_cislo: '960922/ 6286',
    iban: 'SK1234567890',
    email: 'test@example.com',
    children: [
      {
        id: 1,
        priezviskoMeno: 'Dieťa Meno',
        rodneCislo: '185717/4924',
        wholeYear: true,
        monthFrom: '0',
        monthTo: '11',
      },
    ],
    dve_percenta_rodicA: {
      meno: 'Ján',
      priezvisko: 'Novák',
      rodneCislo: '625412 / 2512',
    },
    dve_percenta_rodicB: {
      meno: 'Mária',
      priezvisko: 'Nováková',
      rodneCislo: '665412 / 2517',
    },
  }

  const result = anonymizeTaxForm(input)

  it.each(PII_FIELDS)('anonymizes %s', (field) => {
    expect(result[field]).toBe('anon')
  })

  it('anonymizes child rodneCislo and priezviskoMeno', () => {
    expect(result.children[0].rodneCislo).toBe('anon')
    expect(result.children[0].priezviskoMeno).toBe('anon')
  })

  it('anonymizes dve_percenta_rodicA', () => {
    expect(result.dve_percenta_rodicA).toEqual({
      meno: 'anon',
      priezvisko: 'anon',
      rodneCislo: 'anon',
    })
  })

  it('anonymizes dve_percenta_rodicB', () => {
    expect(result.dve_percenta_rodicB).toEqual({
      meno: 'anon',
      priezvisko: 'anon',
      rodneCislo: 'anon',
    })
  })

  it('preserves non-PII fields', () => {
    expect(result.hasChildren).toBe(input.hasChildren)
    expect(result.prijem_zo_zivnosti).toBe(input.prijem_zo_zivnosti)
  })
})

describe('anonymize', () => {
  describe('#annoymizeChild', () => {
    const scenarios = [
      {
        input: {
          id: 1,
          priezviskoMeno: '',
          rodneCislo: '901006 / 6472',

          wholeYear: false,
          monthFrom: '0',
          monthTo: '11',
        },
        month: 10,
        year: 1990,
      },
      {
        input: {
          id: 1,
          priezviskoMeno: '',
          rodneCislo: '050426 / 9744',

          wholeYear: false,
          monthFrom: '0',
          monthTo: '11',
        },
        month: 4,
        year: 2005,
      },
      {
        input: {
          id: 1,
          priezviskoMeno: '',
          rodneCislo: '705426 / 0169',

          wholeYear: false,
          monthFrom: '0',
          monthTo: '11',
        },
        month: 4,
        year: 1970,
      },
      {
        input: {
          id: 1,
          priezviskoMeno: '',
          rodneCislo: '185717 / 4924',

          wholeYear: false,
          monthFrom: '0',
          monthTo: '11',
        },
        month: 7,
        year: 2018,
      },
      {
        input: {
          id: 1,
          priezviskoMeno: '',
          rodneCislo: '646118 / 6369',

          wholeYear: false,
          monthFrom: '0',
          monthTo: '11',
        },
        month: 11,
        year: 1964,
      },
    ]

    scenarios.forEach(({ input, month, year }) => {
      it(`From personalID ${input.rodneCislo} get month ${month} and year ${year}`, () => {
        const anonym = anoymizeChild(input)
        expect(anonym.mesiacNarodenia).toBe(month)
        expect(anonym.rokNarodenia).toBe(year)
        expect(anonym.rodneCislo).toBe('anon')
      })
    })
  })
})
