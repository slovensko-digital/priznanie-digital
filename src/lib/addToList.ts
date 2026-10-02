import Decimal from 'decimal.js'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { formatCurrency, numberInputRegexp, parseInputNumber } from './utils'

/** Item of an "add to a list" page (one employer, one dohoda, ...) */
export interface ListItem {
  id: number
  nazov?: string
}

/** Amount field of a list item, summed into a single uhrn* field of the tax form */
export interface AmountField<Item extends ListItem> {
  name: keyof Omit<Item, 'id' | 'nazov'> & string
  total: keyof TaxFormUserInput
  label: string
  hint?: string
  requiredMessage: string
}

export const sumItems = <Item extends ListItem>(
  items: Item[],
  field: AmountField<Item>['name'],
): string =>
  items
    .reduce((acc, item) => {
      const value = parseInputNumber(item[field] as string)
      return Number.isNaN(value) ? acc : acc.plus(value)
    }, new Decimal(0))
    .toFixed(2)
    .replace('.', ',')

/** Totals of all amount fields, keyed by the uhrn* field they are stored in */
export const totalsFromItems = <Item extends ListItem>(
  items: Item[],
  fields: AmountField<Item>[],
): Partial<TaxFormUserInput> =>
  Object.fromEntries(
    fields.map((field) => [field.total, sumItems(items, field.name)]),
  )

/**
 * Data saved before the list existed (only uhrn* totals) is turned into
 * a single list item, so the user can see and edit it.
 */
export const itemFromTotals = <Item extends ListItem>(
  input: Partial<TaxFormUserInput>,
  fields: AmountField<Item>[],
  makeEmpty: () => Item,
): Item | null => {
  if (!fields.some((field) => input[field.total])) {
    return null
  }
  return fields.reduce(
    (item, field) => ({ ...item, [field.name]: input[field.total] ?? '' }),
    makeEmpty(),
  )
}

export const validateListItem = <Item extends ListItem>(
  item: Item,
  fields: AmountField<Item>[],
): Partial<Record<AmountField<Item>['name'], string>> =>
  Object.fromEntries(
    fields.flatMap((field) => {
      const value = item[field.name] as string
      if (!value) return [[field.name, field.requiredMessage]]
      if (!value.match(numberInputRegexp))
        return [[field.name, 'Zadajte sumu vo formáte 123,45']]
      return []
    }),
  ) as Partial<Record<AmountField<Item>['name'], string>>

export const itemLabel = (
  item: ListItem | undefined,
  index: number,
  fallback: string,
) => item?.nazov?.trim() || `${fallback} ${index + 1}`

/** Short overview of an item shown in the list under its name */
export const incomeItemSummary = (item: ListItem & { prijmy: string }) =>
  `Príjmy: ${formatCurrency(parseInputNumber(item.prijmy) || 0)}`
