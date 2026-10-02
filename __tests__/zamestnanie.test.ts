import Zamestnanie, { validate, validateItem } from '../src/pages/zamestnanie'
import { employmentUserInputInitialValues } from '../src/lib/initialValues'
import { ZamestnavatelInput } from '../src/types/TaxFormUserInput'
import { testValidation } from './utils/testValidation'
import { RenderedPage, renderPage } from './utils/renderPage'
import { case202510Input } from './testCases/case202510Input'

const validZamestnavatel = {
  id: 1,
  prijmy: '10000',
  socialnePoistne: '1000',
  zdravotnePoistne: '500',
  preddavkyNaDan: '800',
  danovyBonusNaDieta: '0',
}

describe('zamestnanie', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: { employed: undefined },
        expected: ['employed'],
      },
      {
        input: { employed: false },
        expected: [],
      },
      {
        input: { employed: true },
        expected: ['zamestnavatelia'],
      },
      {
        input: { employed: true, zamestnavatelia: [] },
        expected: ['zamestnavatelia'],
      },
      {
        input: { employed: true, zamestnavatelia: [validZamestnavatel] },
        expected: [],
      },
      {
        input: {
          employed: true,
          zamestnavatelia: [
            validZamestnavatel,
            { ...validZamestnavatel, id: 2 },
          ],
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
      const errors = validateItem(validZamestnavatel)
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

    const fillEmployer = async (
      index: number,
      values: Omit<ZamestnavatelInput, 'id'>,
    ) => {
      for (const field of fields) {
        await page.type(
          `zamestnavatelia[${index}].${field}-input`,
          values[field],
        )
      }
      await page.click('save-zamestnavatel')
    }

    const finish = async () => {
      await page.click('#addAnother-no')
      await page.click('next')
    }

    const heading = () => page.container.querySelector('h2.govuk-heading-m')

    it('sums two employers into uhrn* fields (comma and dot decimals)', async () => {
      page = await renderPage(Zamestnanie, {})
      await page.click('employed-input-yes')
      await page.click('add-zamestnavatel')
      await fillEmployer(0, {
        prijmy: '1000,50',
        socialnePoistne: '100.25',
        zdravotnePoistne: '50',
        preddavkyNaDan: '120,10',
        danovyBonusNaDieta: '0',
      })
      await page.click('#addAnother-yes')
      await fillEmployer(1, {
        prijmy: '2000.25',
        socialnePoistne: '200,75',
        zdravotnePoistne: '25,5',
        preddavkyNaDan: '80',
        danovyBonusNaDieta: '0',
      })
      expect(heading().textContent).toBe('Pridali ste 2 zamestnávateľov')
      await finish()

      const saved = page.lastSaved()
      expect(saved.zamestnavatelia).toHaveLength(2)
      expect(saved.uhrnPrijmovOdVsetkychZamestnavatelov).toBe('3000,75')
      expect(saved.uhrnPovinnehoPoistnehoNaSocialnePoistenie).toBe('301,00')
      expect(saved.uhrnPovinnehoPoistnehoNaZdravotnePoistenie).toBe('75,50')
      expect(saved.uhrnPreddavkovNaDan).toBe('200,10')
      // all items 0 -> '0,00'
      expect(saved.udajeODanovomBonuseNaDieta).toBe('0,00')
      expect(page.push).toHaveBeenCalledWith('/next')
    })

    it('requires answer to "add another" before submitting', async () => {
      page = await renderPage(Zamestnanie, {})
      await page.click('employed-input-yes')
      await page.click('add-zamestnavatel')
      await fillEmployer(0, {
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

    it('does not save invalid employer and shows item errors', async () => {
      page = await renderPage(Zamestnanie, {})
      await page.click('employed-input-yes')
      await page.click('add-zamestnavatel')
      await page.type('zamestnavatelia[0].prijmy-input', 'abc')
      await page.click('save-zamestnavatel')
      expect(page.get('save-zamestnavatel')).not.toBeNull()
      expect(page.container.textContent).toContain(
        'Zadajte sumu vo formáte 123,45',
      )
    })

    it('cancelling an edit restores the original employer values', async () => {
      page = await renderPage(Zamestnanie, {})
      await page.click('employed-input-yes')
      await page.click('add-zamestnavatel')
      await fillEmployer(0, {
        prijmy: '100',
        socialnePoistne: '10',
        zdravotnePoistne: '5',
        preddavkyNaDan: '1',
        danovyBonusNaDieta: '0',
      })
      await page.click('edit-zamestnavatel-0')
      await page.type('zamestnavatelia[0].prijmy-input', 'abc')
      await page.click('cancel-zamestnavatel')
      await finish()
      const saved = page.lastSaved()
      expect(saved.zamestnavatelia[0].prijmy).toBe('100')
      expect(saved.uhrnPrijmovOdVsetkychZamestnavatelov).toBe('100,00')
    })

    it('clears the "add at least one" error when adding a employer', async () => {
      page = await renderPage(Zamestnanie, {})
      await page.click('employed-input-yes')
      await page.click('next')
      expect(page.container.textContent).toContain(
        'Pridajte aspoň jedného zamestnávateľa',
      )
      await page.click('add-zamestnavatel')
      expect(page.container.textContent).not.toContain(
        'Pridajte aspoň jedného zamestnávateľa',
      )
    })

    it('does not submit an incomplete migrated item', async () => {
      page = await renderPage(Zamestnanie, {
        employed: true,
        uhrnPrijmovOdVsetkychZamestnavatelov: '100',
      })
      await finish()
      expect(page.setTaxFormUserInput).not.toHaveBeenCalled()
      expect(page.container.textContent).toContain(
        'Doplňte údaje: Zamestnávateľ 1',
      )
    })

    it('migrates old data even when only insurance fields are filled', async () => {
      page = await renderPage(Zamestnanie, {
        employed: true,
        uhrnPrijmovOdVsetkychZamestnavatelov: '',
        uhrnPovinnehoPoistnehoNaSocialnePoistenie: '50',
      })
      expect(page.get('edit-zamestnavatel-0')).not.toBeNull()
      await page.click('edit-zamestnavatel-0')
      expect(
        (
          page.get(
            'zamestnavatelia[0].socialnePoistne-input',
          ) as HTMLInputElement
        ).value,
      ).toBe('50')
    })

    it('cancelling a new employer removes it from the list', async () => {
      page = await renderPage(Zamestnanie, {})
      await page.click('employed-input-yes')
      await page.click('add-zamestnavatel')
      await page.click('cancel-zamestnavatel')
      expect(page.get('edit-zamestnavatel-0')).toBeNull()
      expect(page.get('add-zamestnavatel')).not.toBeNull()
    })

    it('migrates old single-value data into one list item without duplicating on re-submit', async () => {
      const oldData = {
        employed: true,
        uhrnPrijmovOdVsetkychZamestnavatelov: '4000',
        uhrnPovinnehoPoistnehoNaSocialnePoistenie: '700,5',
        uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '300',
        uhrnPreddavkovNaDan: '0',
        udajeODanovomBonuseNaDieta: '0',
      }
      page = await renderPage(Zamestnanie, oldData)
      expect(heading().textContent).toBe('Pridali ste 1 zamestnávateľa')
      expect(page.get('edit-zamestnavatel-0')).not.toBeNull()
      expect(page.get('edit-zamestnavatel-1')).toBeNull()

      // migrated values are visible in the edit form
      await page.click('edit-zamestnavatel-0')
      const value = (field: string) =>
        (page.get(`zamestnavatelia[0].${field}-input`) as HTMLInputElement)
          .value
      expect(value('prijmy')).toBe('4000')
      expect(value('socialnePoistne')).toBe('700,5')
      expect(value('zdravotnePoistne')).toBe('300')
      expect(value('preddavkyNaDan')).toBe('0')
      await page.click('cancel-zamestnavatel')
      // cancelling edit of existing (migrated) item keeps it
      expect(page.get('edit-zamestnavatel-0')).not.toBeNull()

      await finish()
      const saved = page.lastSaved()
      expect(saved.zamestnavatelia).toHaveLength(1)
      expect(saved.uhrnPrijmovOdVsetkychZamestnavatelov).toBe('4000,00')
      expect(saved.uhrnPovinnehoPoistnehoNaSocialnePoistenie).toBe('700,50')
      expect(saved.uhrnPovinnehoPoistnehoNaZdravotnePoistenie).toBe('300,00')
      // zero fields sum to '0,00'
      expect(saved.uhrnPreddavkovNaDan).toBe('0,00')
      expect(saved.udajeODanovomBonuseNaDieta).toBe('0,00')
      page.unmount()

      // revisit the page with the saved data and submit again
      page = await renderPage(Zamestnanie, { ...oldData, ...saved })
      expect(heading().textContent).toBe('Pridali ste 1 zamestnávateľa')
      expect(page.get('edit-zamestnavatel-1')).toBeNull()
      await finish()
      const resaved = page.lastSaved()
      expect(resaved.zamestnavatelia).toHaveLength(1)
      expect(resaved.uhrnPrijmovOdVsetkychZamestnavatelov).toBe('4000,00')
      expect(resaved.uhrnPovinnehoPoistnehoNaSocialnePoistenie).toBe('700,50')
    })

    const twoEmployers = {
      employed: true,
      zamestnavatelia: [
        { ...validZamestnavatel, id: 100, nazov: 'Firma A' },
        {
          id: 101,
          nazov: '',
          prijmy: '2500,40',
          socialnePoistne: '250',
          zdravotnePoistne: '125',
          preddavkyNaDan: '200',
          danovyBonusNaDieta: '50',
        },
      ],
      // stale totals, must be recomputed on submit
      uhrnPrijmovOdVsetkychZamestnavatelov: '12500,40',
      uhrnPovinnehoPoistnehoNaSocialnePoistenie: '1250',
      uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '625',
      uhrnPreddavkovNaDan: '1000',
      udajeODanovomBonuseNaDieta: '50',
    }

    it('shows list with names and fallback labels', async () => {
      page = await renderPage(Zamestnanie, twoEmployers)
      const keys = Array.from(
        page.container.querySelectorAll('.govuk-summary-list__key'),
      ).map((el) => el.firstChild?.textContent)
      expect(keys).toEqual(['Firma A', 'Zamestnávateľ 2'])
      const hints = Array.from(
        page.container.querySelectorAll('.govuk-summary-list__key .govuk-hint'),
      ).map((el) => el.textContent)
      expect(hints).toHaveLength(2)
      hints.forEach((h) => expect(h).toMatch(/^Príjmy: .+EUR$/))
    })

    it('removing an employer updates the sums', async () => {
      page = await renderPage(Zamestnanie, twoEmployers)
      await page.click('remove-zamestnavatel-0')
      expect(heading().textContent).toBe('Pridali ste 1 zamestnávateľa')
      await finish()
      const saved = page.lastSaved()
      expect(saved.zamestnavatelia).toHaveLength(1)
      expect(saved.zamestnavatelia[0].id).toBe(101)
      expect(saved.uhrnPrijmovOdVsetkychZamestnavatelov).toBe('2500,40')
      expect(saved.uhrnPovinnehoPoistnehoNaSocialnePoistenie).toBe('250,00')
      expect(saved.uhrnPovinnehoPoistnehoNaZdravotnePoistenie).toBe('125,00')
      expect(saved.uhrnPreddavkovNaDan).toBe('200,00')
      expect(saved.udajeODanovomBonuseNaDieta).toBe('50,00')
    })

    it('removing all employers blocks submit', async () => {
      page = await renderPage(Zamestnanie, twoEmployers)
      await page.click('remove-zamestnavatel-1')
      await page.click('remove-zamestnavatel-0')
      expect(page.get('add-zamestnavatel')).not.toBeNull()
      await page.click('next')
      expect(page.setTaxFormUserInput).not.toHaveBeenCalled()
      expect(page.container.textContent).toContain(
        'Pridajte aspoň jedného zamestnávateľa',
      )
    })

    it('answering "no" clears employers and totals', async () => {
      page = await renderPage(Zamestnanie, twoEmployers)
      await page.click('employed-input-no')
      expect(page.get('edit-zamestnavatel-0')).toBeNull()
      await page.click('next')
      expect(page.lastSaved()).toEqual({
        ...employmentUserInputInitialValues,
        employed: false,
      })
      expect(page.lastSaved().zamestnavatelia).toEqual([])
    })

    it('toggling "no" and back to "yes" keeps the list until submitted', async () => {
      page = await renderPage(Zamestnanie, twoEmployers)
      await page.click('employed-input-no')
      await page.click('employed-input-yes')
      expect(page.get('edit-zamestnavatel-0')).not.toBeNull()
      expect(page.get('edit-zamestnavatel-1')).not.toBeNull()
      await finish()
      expect(page.lastSaved().uhrnPrijmovOdVsetkychZamestnavatelov).toBe(
        '12500,40',
      )
    })

    it('sums of e2e case202510 items match its uhrn* values', async () => {
      page = await renderPage(Zamestnanie, {
        employed: true,
        zamestnavatelia: case202510Input.zamestnavatelia,
      })
      await finish()
      const saved = page.lastSaved()
      expect(saved.uhrnPrijmovOdVsetkychZamestnavatelov).toBe(
        case202510Input.uhrnPrijmovOdVsetkychZamestnavatelov,
      )
      expect(saved.uhrnPovinnehoPoistnehoNaSocialnePoistenie).toBe(
        case202510Input.uhrnPovinnehoPoistnehoNaSocialnePoistenie,
      )
      expect(saved.uhrnPovinnehoPoistnehoNaZdravotnePoistenie).toBe(
        case202510Input.uhrnPovinnehoPoistnehoNaZdravotnePoistenie,
      )
      expect(saved.uhrnPreddavkovNaDan).toBe(
        case202510Input.uhrnPreddavkovNaDan,
      )
    })
  })
})
