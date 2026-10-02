import {
  AmountField,
  incomeItemSummary,
  itemFromTotals,
  itemLabel,
  sumItems,
  totalsFromItems,
  validateListItem,
} from '../src/lib/addToList'

interface Item {
  id: number
  nazov?: string
  prijmy: string
  poistne: string
}

const fields: AmountField<Item>[] = [
  {
    name: 'prijmy',
    total: 'uhrnPrijmovOdVsetkychZamestnavatelov',
    label: 'Príjmy',
    requiredMessage: 'Zadajte príjmy',
  },
  {
    name: 'poistne',
    total: 'uhrnPovinnehoPoistnehoNaSocialnePoistenie',
    label: 'Poistné',
    requiredMessage: 'Zadajte poistné',
  },
]

const makeEmpty = (): Item => ({ id: 1, nazov: '', prijmy: '', poistne: '' })

describe('addToList', () => {
  describe('#sumItems', () => {
    it('sums comma and dot decimals without float errors', () => {
      const items = [
        { id: 1, prijmy: '0,1', poistne: '' },
        { id: 2, prijmy: '0.2', poistne: '' },
      ]
      expect(sumItems(items, 'prijmy')).toBe('0,30')
    })

    it('returns 0,00 for empty items and ignores invalid values', () => {
      expect(sumItems([], 'prijmy')).toBe('0,00')
      expect(sumItems([{ id: 1, prijmy: 'abc', poistne: '' }], 'prijmy')).toBe(
        '0,00',
      )
    })
  })

  it('#totalsFromItems maps sums to uhrn* fields', () => {
    const items = [
      { id: 1, prijmy: '1000,50', poistne: '100' },
      { id: 2, prijmy: '2000', poistne: '50,25' },
    ]
    expect(totalsFromItems(items, fields)).toEqual({
      uhrnPrijmovOdVsetkychZamestnavatelov: '3000,50',
      uhrnPovinnehoPoistnehoNaSocialnePoistenie: '150,25',
    })
  })

  describe('#itemFromTotals', () => {
    it('returns null when no total is filled', () => {
      expect(itemFromTotals({}, fields, makeEmpty)).toBeNull()
    })

    it('creates an item when any total is filled', () => {
      expect(
        itemFromTotals(
          { uhrnPovinnehoPoistnehoNaSocialnePoistenie: '50' },
          fields,
          makeEmpty,
        ),
      ).toEqual({ id: 1, nazov: '', prijmy: '', poistne: '50' })
    })
  })

  it('#validateListItem reports missing and malformed amounts', () => {
    expect(
      validateListItem({ id: 1, prijmy: '', poistne: 'abc' }, fields),
    ).toEqual({
      prijmy: 'Zadajte príjmy',
      poistne: 'Zadajte sumu vo formáte 123,45',
    })
    expect(
      validateListItem({ id: 1, prijmy: '10', poistne: '0' }, fields),
    ).toEqual({})
  })

  it('#itemLabel falls back to a numbered name', () => {
    expect(itemLabel({ id: 1, nazov: ' ABC ' }, 0, 'Dohoda')).toBe('ABC')
    expect(itemLabel({ id: 1, nazov: '' }, 1, 'Dohoda')).toBe('Dohoda 2')
  })

  it('#incomeItemSummary shows the income of an item', () => {
    expect(incomeItemSummary({ id: 1, prijmy: '1000,50' })).toBe(
      'Príjmy: 1\u00a0000,50\u00a0EUR',
    )
    expect(incomeItemSummary({ id: 1, prijmy: 'abc' })).toBe(
      'Príjmy: 0,00\u00a0EUR',
    )
  })
})
