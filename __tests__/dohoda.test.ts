import Dohoda, { validate, validateItem } from '../src/pages/dohoda'
import { dohodaUserInputInitialValues } from '../src/lib/initialValues'
import { DohodaItemInput } from '../src/types/TaxFormUserInput'
import { testValidation } from './utils/testValidation'
import { RenderedPage, renderPage } from './utils/renderPage'
import { case202510Input } from './testCases/case202510Input'

const validDohoda = {
  id: 1,
  prijmy: '5000',
  socialnePoistne: '500',
  zdravotnePoistne: '250',
  preddavkyNaDan: '400',
  danovyBonusNaDieta: '0',
}

describe('dohoda', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { dohoda: undefined },
        expected: ['dohoda'],
      },
      {
        input: { dohoda: false },
        expected: [],
      },
      {
        input: { dohoda: true },
        expected: ['dohody'],
      },
      {
        input: { dohoda: true, dohody: [] },
        expected: ['dohody'],
      },
      {
        input: { dohoda: true, dohody: [validDohoda] },
        expected: [],
      },
      {
        input: {
          dohoda: true,
          dohody: [validDohoda, { ...validDohoda, id: 2 }],
        },
        expected: [],
      },
    ])
  })

  describe('#validateItem', () => {
    it('returns errors for all empty fields', () => {
      const errors = validateItem({
        id: 1,
        prijmy: '',
        socialnePoistne: '',
        zdravotnePoistne: '',
        preddavkyNaDan: '',
        danovyBonusNaDieta: '',
      })
      expect(Object.keys(errors)).toEqual(
        expect.arrayContaining([
          'prijmy',
          'socialnePoistne',
          'zdravotnePoistne',
          'preddavkyNaDan',
          'danovyBonusNaDieta',
        ]),
      )
    })

    it('returns format errors for invalid values', () => {
      const errors = validateItem({
        id: 1,
        prijmy: 'a',
        socialnePoistne: '-1',
        zdravotnePoistne: '-1',
        preddavkyNaDan: '-1',
        danovyBonusNaDieta: 'a',
      })
      expect(Object.keys(errors)).toEqual(
        expect.arrayContaining([
          'prijmy',
          'socialnePoistne',
          'zdravotnePoistne',
          'preddavkyNaDan',
          'danovyBonusNaDieta',
        ]),
      )
    })

    it('returns no errors for valid item', () => {
      const errors = validateItem(validDohoda)
      expect(errors).toEqual({})
    })
  })

  describe('page (add to list)', () => {
    let page: RenderedPage
    afterEach(() => page?.unmount())

    const fields = [
      'prijmy',
      'socialnePoistne',
      'zdravotnePoistne',
      'preddavkyNaDan',
      'danovyBonusNaDieta',
    ] as const

    const fillDohoda = async (
      index: number,
      values: Omit<DohodaItemInput, 'id'>,
    ) => {
      for (const field of fields) {
        await page.type(`dohody[${index}].${field}-input`, values[field])
      }
      await page.click('save-dohoda')
    }

    const finish = async () => {
      await page.click('#addAnotherDohoda-no')
      await page.click('next')
    }

    const heading = () => page.container.querySelector('h2.govuk-heading-m')

    it('sums two dohody into uhrn* fields (comma and dot decimals)', async () => {
      page = await renderPage(Dohoda, {})
      await page.click('dohoda-input-yes')
      await page.click('add-dohoda')
      await fillDohoda(0, {
        prijmy: '500,50',
        socialnePoistne: '50.25',
        zdravotnePoistne: '20',
        preddavkyNaDan: '40,10',
        danovyBonusNaDieta: '0',
      })
      await page.click('#addAnotherDohoda-yes')
      await fillDohoda(1, {
        prijmy: '1000.25',
        socialnePoistne: '100,75',
        zdravotnePoistne: '10,5',
        preddavkyNaDan: '60',
        danovyBonusNaDieta: '15,5',
      })
      // count only; Slovak plural form for 2-4 should be "dohody" (see dohoda.tsx)
      expect(heading().textContent).toBe('Pridali ste 2 dohody')
      await finish()

      const saved = page.lastSaved()
      expect(saved.dohody).toHaveLength(2)
      expect(saved.uhrnPrijmovZoVsetkychDohod).toBe('1500,75')
      expect(saved.uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody).toBe(
        '151,00',
      )
      expect(saved.uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody).toBe(
        '30,50',
      )
      expect(saved.uhrnPreddavkovNaDanDohody).toBe('100,10')
      expect(saved.udajeODanovomBonuseNaDietaDohody).toBe('15,50')
      expect(page.push).toHaveBeenCalledWith('/next')
    })

    it('requires answer to "add another" before submitting', async () => {
      page = await renderPage(Dohoda, {})
      await page.click('dohoda-input-yes')
      await page.click('add-dohoda')
      await fillDohoda(0, {
        prijmy: '10',
        socialnePoistne: '1',
        zdravotnePoistne: '1',
        preddavkyNaDan: '1',
        danovyBonusNaDieta: '0',
      })
      await page.click('next')
      expect(page.container.textContent).toContain('Vyznačte odpoveď')
      expect(page.setTaxFormUserInput).not.toHaveBeenCalled()
    })

    it('does not save invalid dohoda and shows item errors', async () => {
      page = await renderPage(Dohoda, {})
      await page.click('dohoda-input-yes')
      await page.click('add-dohoda')
      await page.type('dohody[0].prijmy-input', '-1')
      await page.click('save-dohoda')
      expect(page.get('save-dohoda')).not.toBeNull()
      expect(page.container.textContent).toContain(
        'Zadajte sumu vo formáte 123,45',
      )
    })

    it('cancelling an edit restores the original dohoda values', async () => {
      page = await renderPage(Dohoda, {})
      await page.click('dohoda-input-yes')
      await page.click('add-dohoda')
      await fillDohoda(0, {
        prijmy: '100',
        socialnePoistne: '10',
        zdravotnePoistne: '5',
        preddavkyNaDan: '1',
        danovyBonusNaDieta: '0',
      })
      await page.click('edit-dohoda-0')
      await page.type('dohody[0].prijmy-input', 'abc')
      await page.click('cancel-dohoda')
      await finish()
      const saved = page.lastSaved()
      expect(saved.dohody[0].prijmy).toBe('100')
      expect(saved.uhrnPrijmovZoVsetkychDohod).toBe('100,00')
    })

    it('clears the "add at least one" error when adding a dohoda', async () => {
      page = await renderPage(Dohoda, {})
      await page.click('dohoda-input-yes')
      await page.click('next')
      expect(page.container.textContent).toContain(
        'Pridajte aspoň jednu dohodu',
      )
      await page.click('add-dohoda')
      expect(page.container.textContent).not.toContain(
        'Pridajte aspoň jednu dohodu',
      )
    })

    it('does not submit an incomplete migrated item', async () => {
      page = await renderPage(Dohoda, {
        dohoda: true,
        uhrnPrijmovZoVsetkychDohod: '100',
      })
      await finish()
      expect(page.setTaxFormUserInput).not.toHaveBeenCalled()
      expect(page.container.textContent).toContain('Doplňte údaje: Dohoda 1')
    })

    it('migrates old data even when only insurance fields are filled', async () => {
      page = await renderPage(Dohoda, {
        dohoda: true,
        uhrnPrijmovZoVsetkychDohod: '',
        uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody: '50',
      })
      expect(page.get('edit-dohoda-0')).not.toBeNull()
      await page.click('edit-dohoda-0')
      expect(
        (page.get('dohody[0].socialnePoistne-input') as HTMLInputElement).value,
      ).toBe('50')
    })

    it('cancelling a new dohoda removes it from the list', async () => {
      page = await renderPage(Dohoda, {})
      await page.click('dohoda-input-yes')
      await page.click('add-dohoda')
      await page.click('cancel-dohoda')
      expect(page.get('edit-dohoda-0')).toBeNull()
      expect(page.get('add-dohoda')).not.toBeNull()
    })

    it('migrates old single-value data into one list item without duplicating on re-submit', async () => {
      const oldData = {
        dohoda: true,
        uhrnPrijmovZoVsetkychDohod: '1200',
        uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody: '100,5',
        uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody: '50',
        uhrnPreddavkovNaDanDohody: '0',
        udajeODanovomBonuseNaDietaDohody: '0',
      }
      page = await renderPage(Dohoda, oldData)
      expect(heading().textContent).toBe('Pridali ste 1 dohodu')
      expect(page.get('edit-dohoda-0')).not.toBeNull()
      expect(page.get('edit-dohoda-1')).toBeNull()

      await page.click('edit-dohoda-0')
      const value = (field: string) =>
        (page.get(`dohody[0].${field}-input`) as HTMLInputElement).value
      expect(value('prijmy')).toBe('1200')
      expect(value('socialnePoistne')).toBe('100,5')
      expect(value('zdravotnePoistne')).toBe('50')
      expect(value('preddavkyNaDan')).toBe('0')
      await page.click('cancel-dohoda')
      expect(page.get('edit-dohoda-0')).not.toBeNull()

      await finish()
      const saved = page.lastSaved()
      expect(saved.dohody).toHaveLength(1)
      expect(saved.uhrnPrijmovZoVsetkychDohod).toBe('1200,00')
      expect(saved.uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody).toBe(
        '100,50',
      )
      expect(saved.uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody).toBe(
        '50,00',
      )
      expect(saved.uhrnPreddavkovNaDanDohody).toBe('0,00')
      expect(saved.udajeODanovomBonuseNaDietaDohody).toBe('0,00')
      page.unmount()

      page = await renderPage(Dohoda, { ...oldData, ...saved })
      expect(heading().textContent).toBe('Pridali ste 1 dohodu')
      expect(page.get('edit-dohoda-1')).toBeNull()
      await finish()
      const resaved = page.lastSaved()
      expect(resaved.dohody).toHaveLength(1)
      expect(resaved.uhrnPrijmovZoVsetkychDohod).toBe('1200,00')
    })

    const twoDohody = {
      dohoda: true,
      dohody: [
        { ...validDohoda, id: 100, nazov: 'DoVP ABC' },
        {
          id: 101,
          nazov: '',
          prijmy: '700,30',
          socialnePoistne: '70',
          zdravotnePoistne: '35',
          preddavkyNaDan: '60',
          danovyBonusNaDieta: '0',
        },
      ],
      uhrnPrijmovZoVsetkychDohod: '5700,30',
      uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody: '570',
      uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody: '285',
      uhrnPreddavkovNaDanDohody: '460',
      udajeODanovomBonuseNaDietaDohody: '',
    }

    it('shows list with names and fallback labels', async () => {
      page = await renderPage(Dohoda, twoDohody)
      const keys = Array.from(
        page.container.querySelectorAll('.govuk-summary-list__key'),
      ).map((el) => el.firstChild?.textContent)
      expect(keys).toEqual(['DoVP ABC', 'Dohoda 2'])
      const hints = Array.from(
        page.container.querySelectorAll('.govuk-summary-list__key .govuk-hint'),
      ).map((el) => el.textContent)
      expect(hints).toHaveLength(2)
      hints.forEach((h) => expect(h).toMatch(/^Príjmy: .+EUR$/))
    })

    it('removing a dohoda updates the sums', async () => {
      page = await renderPage(Dohoda, twoDohody)
      await page.click('remove-dohoda-0')
      expect(heading().textContent).toBe('Pridali ste 1 dohodu')
      await finish()
      const saved = page.lastSaved()
      expect(saved.dohody).toHaveLength(1)
      expect(saved.dohody[0].id).toBe(101)
      expect(saved.uhrnPrijmovZoVsetkychDohod).toBe('700,30')
      expect(saved.uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody).toBe(
        '70,00',
      )
      expect(saved.uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody).toBe(
        '35,00',
      )
      expect(saved.uhrnPreddavkovNaDanDohody).toBe('60,00')
      expect(saved.udajeODanovomBonuseNaDietaDohody).toBe('0,00')
    })

    it('removing all dohody blocks submit', async () => {
      page = await renderPage(Dohoda, twoDohody)
      await page.click('remove-dohoda-1')
      await page.click('remove-dohoda-0')
      expect(page.get('add-dohoda')).not.toBeNull()
      await page.click('next')
      expect(page.setTaxFormUserInput).not.toHaveBeenCalled()
      expect(page.container.textContent).toContain(
        'Pridajte aspoň jednu dohodu',
      )
    })

    it('answering "no" clears dohody and totals', async () => {
      page = await renderPage(Dohoda, twoDohody)
      await page.click('dohoda-input-no')
      expect(page.get('edit-dohoda-0')).toBeNull()
      await page.click('next')
      expect(page.lastSaved()).toEqual({
        ...dohodaUserInputInitialValues,
        dohoda: false,
      })
      expect(page.lastSaved().dohody).toEqual([])
    })

    it('toggling "no" and back to "yes" keeps the list until submitted', async () => {
      page = await renderPage(Dohoda, twoDohody)
      await page.click('dohoda-input-no')
      await page.click('dohoda-input-yes')
      expect(page.get('edit-dohoda-0')).not.toBeNull()
      expect(page.get('edit-dohoda-1')).not.toBeNull()
      await finish()
      expect(page.lastSaved().uhrnPrijmovZoVsetkychDohod).toBe('5700,30')
    })

    it('sums of e2e case202510 items match its uhrn* values', async () => {
      page = await renderPage(Dohoda, {
        dohoda: true,
        dohody: case202510Input.dohody,
      })
      await finish()
      const saved = page.lastSaved()
      expect(saved.uhrnPrijmovZoVsetkychDohod).toBe(
        case202510Input.uhrnPrijmovZoVsetkychDohod,
      )
      expect(saved.uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody).toBe(
        case202510Input.uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody,
      )
      expect(saved.uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody).toBe(
        case202510Input.uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody,
      )
      expect(saved.uhrnPreddavkovNaDanDohody).toBe(
        case202510Input.uhrnPreddavkovNaDanDohody,
      )
    })
  })
})
