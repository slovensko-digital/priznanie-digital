import {
  configure,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import Zamestnanie, * as zamestnanie from '../src/pages/zamestnanie'
import Dohoda, * as dohoda from '../src/pages/dohoda'
import {
  employmentUserInputInitialValues,
  dohodaUserInputInitialValues,
} from '../src/lib/initialValues'
import {
  DOHODA_TOTALS,
  ZAMESTNANIE_TOTALS,
  itemFromTotals,
  sumItems,
  totalsFromItems,
  validateItem,
} from '../src/lib/potvrdenia'
import { PotvrdenieInput } from '../src/types/TaxFormUserInput'
import { testValidation } from './utils/testValidation'

configure({ testIdAttribute: 'data-test' })

const item = (values: Partial<PotvrdenieInput> = {}): PotvrdenieInput => ({
  id: 1,
  nazov: '',
  prijmy: '1000',
  socialnePoistne: '100',
  zdravotnePoistne: '50',
  preddavkyNaDan: '80',
  danovyBonusNaDieta: '0',
  ...values,
})

const totals = ZAMESTNANIE_TOTALS

describe('potvrdenia', () => {
  it('#sumItems sums comma and dot decimals without float errors', () => {
    const items = [item({ prijmy: '0,1' }), item({ prijmy: '0.2' })]
    expect(sumItems(items, 'prijmy')).toBe('0,30')
    expect(sumItems([item({ prijmy: 'abc' })], 'prijmy')).toBe('0,00')
    expect(sumItems([], 'prijmy')).toBe('0,00')
  })

  it('#totalsFromItems stores sums in uhrn* fields', () => {
    expect(totalsFromItems([item(), item({ prijmy: '0,50' })], totals)).toEqual(
      {
        uhrnPrijmovOdVsetkychZamestnavatelov: '1000,50',
        uhrnPovinnehoPoistnehoNaSocialnePoistenie: '200,00',
        uhrnPovinnehoPoistnehoNaZdravotnePoistenie: '100,00',
        uhrnPreddavkovNaDan: '160,00',
        udajeODanovomBonuseNaDieta: '0,00',
      },
    )
  })

  it('#itemFromTotals turns old uhrn* data into one item', () => {
    const empty = item({ prijmy: '', socialnePoistne: '' })
    expect(itemFromTotals({}, totals, empty)).toBeNull()
    expect(
      itemFromTotals(
        { uhrnPovinnehoPoistnehoNaSocialnePoistenie: '50' },
        totals,
        empty,
      ),
    ).toMatchObject({ prijmy: '', socialnePoistne: '50' })
  })

  it('#validateItem reports missing and malformed amounts', () => {
    const messages = {
      prijmy: 'chýba',
      socialnePoistne: 'chýba',
      zdravotnePoistne: 'chýba',
      preddavkyNaDan: 'chýba',
      danovyBonusNaDieta: 'chýba',
    }
    expect(
      validateItem(item({ prijmy: '', socialnePoistne: 'abc' }), messages),
    ).toEqual({
      prijmy: 'chýba',
      socialnePoistne: 'Zadajte sumu vo formáte 123,45',
    })
    expect(validateItem(item(), messages)).toEqual({})
  })
})

describe.each([
  {
    name: 'zamestnanie',
    Page: Zamestnanie,
    validate: zamestnanie.validate,
    flag: 'employed',
    list: 'zamestnavatelia',
    testId: 'zamestnavatel',
    addAnother: 'addAnother',
    totals: ZAMESTNANIE_TOTALS,
    atLeastOne: 'Pridajte aspoň jedného zamestnávateľa',
    headings: ['1 zamestnávateľa', '2 zamestnávateľov', '5 zamestnávateľov'],
    emptyValues: employmentUserInputInitialValues,
  },
  {
    name: 'dohoda',
    Page: Dohoda,
    validate: dohoda.validate,
    flag: 'dohoda',
    list: 'dohody',
    testId: 'dohoda',
    addAnother: 'addAnotherDohoda',
    totals: DOHODA_TOTALS,
    atLeastOne: 'Pridajte aspoň jednu dohodu',
    headings: ['1 dohodu', '2 dohody', '5 dohôd'],
    emptyValues: dohodaUserInputInitialValues,
  },
])(
  '$name page',
  ({
    name,
    Page,
    validate,
    flag,
    list,
    testId,
    addAnother,
    totals: pageTotals,
    atLeastOne,
    headings,
    emptyValues,
  }) => {
    describe('#validate', () => {
      testValidation(validate, [
        { input: { [flag]: undefined }, expected: [flag] },
        { input: { [flag]: false }, expected: [] },
        { input: { [flag]: true }, expected: [list] },
        { input: { [flag]: true, [list]: [item()] }, expected: [] },
        {
          input: { [flag]: true, [list]: [item({ prijmy: '' })] },
          expected: [list],
        },
      ])
    })

    const setup = (taxFormUserInput = {}) => {
      const setTaxFormUserInput = jest.fn()
      const push = jest.fn()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const props: any = {
        taxFormUserInput,
        setTaxFormUserInput,
        router: { push },
        previousRoute: '/',
        nextRoute: '/next',
      }
      render(<Page {...props} />)
      return { setTaxFormUserInput, push }
    }

    const click = (testIdOrId: string) =>
      fireEvent.click(
        document.getElementById(testIdOrId) ?? screen.getByTestId(testIdOrId),
      )

    const fill = (index: number, values: Partial<PotvrdenieInput>) =>
      Object.entries(values)
        .filter(([field]) => field !== 'id')
        .forEach(([field, value]) =>
          fireEvent.change(
            screen.getByTestId(`${list}[${index}].${field}-input`),
            {
              target: { value },
            },
          ),
        )

    const finish = () => {
      click(`${addAnother}-no`)
      click('next')
    }

    it('adds two items and saves their totals', async () => {
      const { setTaxFormUserInput, push } = setup({ [flag]: true })
      click(`add-${testId}`)
      fill(0, { ...item({ prijmy: '1000,50' }), nazov: 'Firma A' })
      click(`save-${testId}`)
      click(`${addAnother}-yes`)
      fill(1, item({ prijmy: '2000.25' }))
      click(`save-${testId}`)
      expect(screen.getByText(/^Pridali ste 2 /)).toBeTruthy()
      const names = Array.from(
        document.querySelectorAll('.govuk-summary-list__key'),
      )
      expect(names.map((dt) => dt.firstChild?.textContent)).toEqual([
        'Firma A',
        `${name === 'dohoda' ? 'Dohoda' : 'Zamestnávateľ'} 2`,
      ])

      finish()
      await waitFor(() => expect(push).toHaveBeenCalledWith('/next'))
      const saved = setTaxFormUserInput.mock.calls[0][0]
      expect(saved[list]).toHaveLength(2)
      expect(saved).toMatchObject({
        [pageTotals.prijmy]: '3000,75',
        [pageTotals.socialnePoistne]: '200,00',
        [pageTotals.zdravotnePoistne]: '100,00',
        [pageTotals.preddavkyNaDan]: '160,00',
        [pageTotals.danovyBonusNaDieta]: '0,00',
      })
    })

    it('requires a complete item and an answer whether to add another', async () => {
      const { setTaxFormUserInput } = setup({ [flag]: true })
      click('next')
      expect(await screen.findByText(atLeastOne)).toBeTruthy()
      click(`add-${testId}`)
      expect(screen.queryByText(atLeastOne)).toBeNull()
      click(`save-${testId}`)
      expect(screen.getAllByTestId('error')).toHaveLength(5)

      fill(0, item())
      click(`save-${testId}`)
      click('next')
      expect(screen.getByText('Vyznačte odpoveď')).toBeTruthy()
      expect(setTaxFormUserInput).not.toHaveBeenCalled()
    })

    it.each([1, 2, 5])('shows heading for %i items', (count) => {
      setup({
        [flag]: true,
        [list]: Array.from({ length: count }, (_, id) => item({ id })),
      })
      expect(
        screen.getByText(`Pridali ste ${headings[[1, 2, 5].indexOf(count)]}`),
      ).toBeTruthy()
    })

    it('cancel restores an edited item and drops a new one', async () => {
      const { setTaxFormUserInput } = setup({
        [flag]: true,
        [list]: [item({ prijmy: '100' })],
      })
      click(`edit-${testId}-0`)
      fill(0, { prijmy: 'abc' })
      click(`cancel-${testId}`)
      click(`${addAnother}-yes`)
      click(`cancel-${testId}`)
      expect(screen.queryByTestId(`edit-${testId}-1`)).toBeNull()

      finish()
      await waitFor(() => expect(setTaxFormUserInput).toHaveBeenCalled())
      expect(setTaxFormUserInput.mock.calls[0][0][pageTotals.prijmy]).toBe(
        '100,00',
      )
    })

    it('removing an item updates totals', async () => {
      const { setTaxFormUserInput } = setup({
        [flag]: true,
        [list]: [item({ id: 1, prijmy: '1' }), item({ id: 2, prijmy: '2' })],
        [pageTotals.prijmy]: '999',
      })
      click(`remove-${testId}-0`)
      finish()
      await waitFor(() => expect(setTaxFormUserInput).toHaveBeenCalled())
      expect(setTaxFormUserInput.mock.calls[0][0][pageTotals.prijmy]).toBe(
        '2,00',
      )
    })

    it('answering no clears the list', async () => {
      const { setTaxFormUserInput } = setup({ [flag]: true, [list]: [item()] })
      click(`${flag}-input-no`)
      click('next')
      await waitFor(() =>
        expect(setTaxFormUserInput).toHaveBeenCalledWith({
          ...emptyValues,
          [flag]: false,
        }),
      )
    })

    it('migrates old totals into one item and blocks it until complete', async () => {
      const { setTaxFormUserInput } = setup({
        [flag]: true,
        [pageTotals.prijmy]: '100',
      })
      expect(screen.getByTestId(`edit-${testId}-0`)).toBeTruthy()
      expect(screen.queryByTestId(`edit-${testId}-1`)).toBeNull()
      finish()
      expect(await screen.findByText(/^Doplňte údaje: /)).toBeTruthy()
      expect(setTaxFormUserInput).not.toHaveBeenCalled()
    })
  },
)
