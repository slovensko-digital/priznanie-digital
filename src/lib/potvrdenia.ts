import Decimal from 'decimal.js'
import { PotvrdenieInput, TaxFormUserInput } from '../types/TaxFormUserInput'
import { numberInputRegexp, parseInputNumber } from './utils'

/** Amounts of a "Potvrdenie o zdaniteľných príjmoch", each summed into an uhrn* field */
export const AMOUNT_FIELDS = [
  'prijmy',
  'socialnePoistne',
  'zdravotnePoistne',
  'preddavkyNaDan',
  'danovyBonusNaDieta',
] as const

export type AmountField = (typeof AMOUNT_FIELDS)[number]

/** uhrn* field of the tax form where the total of each amount is stored */
export type Totals = Record<AmountField, keyof TaxFormUserInput>

export const ZAMESTNANIE_TOTALS: Totals = {
  prijmy: 'uhrnPrijmovOdVsetkychZamestnavatelov',
  socialnePoistne: 'uhrnPovinnehoPoistnehoNaSocialnePoistenie',
  zdravotnePoistne: 'uhrnPovinnehoPoistnehoNaZdravotnePoistenie',
  preddavkyNaDan: 'uhrnPreddavkovNaDan',
  danovyBonusNaDieta: 'udajeODanovomBonuseNaDieta',
}

export const DOHODA_TOTALS: Totals = {
  prijmy: 'uhrnPrijmovZoVsetkychDohod',
  socialnePoistne: 'uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody',
  zdravotnePoistne: 'uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody',
  preddavkyNaDan: 'uhrnPreddavkovNaDanDohody',
  danovyBonusNaDieta: 'udajeODanovomBonuseNaDietaDohody',
}

export const sumItems = (items: PotvrdenieInput[], field: AmountField) =>
  items
    .reduce((acc, item) => {
      const value = parseInputNumber(item[field])
      return Number.isNaN(value) ? acc : acc.plus(value)
    }, new Decimal(0))
    .toFixed(2)
    .replace('.', ',')

export const totalsFromItems = (
  items: PotvrdenieInput[],
  totals: Totals,
): Partial<TaxFormUserInput> =>
  Object.fromEntries(
    AMOUNT_FIELDS.map((field) => [totals[field], sumItems(items, field)]),
  )

/** Data saved before the list existed (only uhrn* totals) becomes one item */
export const itemFromTotals = (
  input: Partial<TaxFormUserInput>,
  totals: Totals,
  emptyItem: PotvrdenieInput,
): PotvrdenieInput | null =>
  AMOUNT_FIELDS.some((field) => input[totals[field]])
    ? AMOUNT_FIELDS.reduce(
        (item, field) => ({
          ...item,
          [field]: (input[totals[field]] as string) ?? '',
        }),
        emptyItem,
      )
    : null

export const validateItem = (
  item: PotvrdenieInput,
  requiredMessages: Record<AmountField, string>,
) => {
  const errors: Partial<Record<AmountField, string>> = {}
  AMOUNT_FIELDS.forEach((field) => {
    if (!item[field]) errors[field] = requiredMessages[field]
    else if (!item[field].match(numberInputRegexp))
      errors[field] = 'Zadajte sumu vo formáte 123,45'
  })
  return errors
}

export const itemLabel = (
  item: PotvrdenieInput | undefined,
  index: number,
  fallback: string,
) => item?.nazov?.trim() || `${fallback} ${index + 1}`
