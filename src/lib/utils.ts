import { rodnecislo } from 'rodnecislo'
import IBAN from 'iban'
import Decimal from 'decimal.js'
import base64 from 'base64-js'
import { MAX_CHILD_AGE_BONUS, monthToKeyValue, TAX_YEAR } from './calculation'

export const sortObjectKeys = (object: object) => {
  const ordered = {}
  for (const key of Object.keys(object).sort()) {
    ordered[key] = object[key]
  }
  return ordered
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export const setDate = <T>(input: T, date: Date = null) => {
  if (date === null) {
    const now = new Date()
    date = now.getFullYear() === TAX_YEAR ? new Date(TAX_YEAR + 1, 0, 1) : now
  }
  return {
    ...input,
    datum: formatDate(date),
  }
}

export const getStreetNumber = ({
  reg_number,
  building_number,
}: {
  reg_number: number
  building_number: string
}): string => {
  if (reg_number !== null && building_number !== null) {
    return `${reg_number}/${building_number}`
  }
  if (reg_number === null && building_number !== null) {
    return building_number
  }
  if (reg_number !== null && building_number === null) {
    return `${reg_number}`
  }
  return null
}

export const formatCurrency = (value: number): string => {
  const findPlaceForThousandsDivider = /\B(?=(\d{3})+(?!\d))/g
  const roundNumber = decimalToString(new Decimal(value || 0))
  const formattedNumber = roundNumber
    .replace(findPlaceForThousandsDivider, '\u00A0')
    .replace('.', ',')
  return `${formattedNumber} EUR`
}

export const numberInputRegexp = '^[0-9]+([,\\.][0-9]{1,2})?$'

export const formatPsc = (newValue: string, previousValue = '') => {
  const formattedNewValue = newValue.replace(/\D/g, '')
  // when deleting space using backspace, delete both space and the number before it
  if (`${newValue} ` === previousValue) {
    return formattedNewValue.slice(0, -1)
  }

  // add space after first 3 digits
  return formattedNewValue.replace(/^(\d{3})/, '$1 ')
}

export const translit = (value: string) => {
  return value.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
}

export const formatRodneCislo = (newValue: string, previousValue = '') => {
  const formattedNewValue = newValue.replace(/\D/g, '')
  return `${newValue} ` === previousValue
    ? newValue.slice(0, -3)
    : formattedNewValue.replace(/^(\d{6})/, '$1 / ')
}

export const validateRodneCislo = (value: string): boolean => {
  return (
    /^\d{6} \/ \d{3,4}$/.test(value) &&
    rodnecislo(value.replace(' / ', '')).isValid()
  )
}

export const maxChildAgeBonusMonth = (
  rodneCislo: string,
  month: string,
): boolean => {
  return (
    getRodneCisloAgeAtYearAndMonth(
      rodneCislo.replace(' / ', ''),
      TAX_YEAR,
      monthToKeyValue(month).value,
    ) < MAX_CHILD_AGE_BONUS
  )
}
export const minChildAgeBonusMonth = (
  rodneCislo: string,
  month: string,
): boolean => {
  return (
    getRodneCisloAgeAtYearAndMonth(
      rodneCislo.replace(' / ', ''),
      TAX_YEAR,
      monthToKeyValue(month).value,
    ) >= 0
  )
}

export const getBirthMonth = (value: string): number => {
  return rodnecislo(value.replace(' / ', '')).month()
}

// logic from https://github.com/kub1x/rodnecislo
export const getRodneCisloAgeAtYearAndMonth = (
  rodneCislo: string,
  year: number,
  month: number,
): number => {
  const rc = rodnecislo(rodneCislo)

  const date = new Date(year, month, 1)
  const dateYear = date.getFullYear()
  const dateMonth = date.getMonth()
  // const dateDay = date.getDate()

  var age = dateYear - rc.year()

  if (dateMonth > rc.month()) {
    return age
  }

  if (dateMonth == rc.month() && dateYear == rc.year()) {
    return 0
  }

  if (dateMonth <= rc.month()) {
    return age - 1 // if birthday is on this month, return age - 1
  }

  return age
}

export const formatIban = (newValue: string, previousValue = '') => {
  const prefix = newValue.trim().slice(0, 2)
  const number = newValue.trim().slice(2).replace(/\D/g, '')
  const formattedNewValue = `${prefix}${number}`
  return `${newValue} ` === previousValue
    ? newValue.slice(0, -2)
    : IBAN.printFormat(formattedNewValue)
}

export const validateIbanFormat = (value: string): boolean => {
  return IBAN.isValid(value.replace(/\s/g, ''))
}

export const validateIbanCountry = (value: string): boolean => {
  return /^sk/i.test(value.trim())
}

export interface ParsedName {
  first: string
  last: string
  title: string
}

export const round = (decimal: Decimal): Decimal => {
  return decimal.toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
}

export function parseInputNumber(input: string): number {
  const cleanedInput = !input || input === '' ? '0' : input.replace(',', '.')
  return Number(cleanedInput)
}

export const parseStreetAndNumber = (streetAndNumber) => {
  const parsedStreet = streetAndNumber
    .trim()
    .match(/^(.*)\s([\d+/]+[A-Za-z]?)$/)

  const street = parsedStreet ? parsedStreet[1] : streetAndNumber.trim()
  const number = parsedStreet ? parsedStreet[2] : ''

  return [street, number]
}

export const percentage = (base: Decimal, percent: number) => {
  return round(base.div(100).times(percent))
}

const mapHelper = (arr, callback): any => {
  const res = []
  let kValue
  let mappedValue

  for (let k = 0, len = arr.length; k < len; k++) {
    if (typeof arr === 'string' && !!arr.charAt(k)) {
      kValue = arr.charAt(k)
      mappedValue = callback(kValue, k, arr)
      res[k] = mappedValue
    } else if (typeof arr !== 'string' && k in arr) {
      kValue = arr[k]
      mappedValue = callback(kValue, k, arr)
      res[k] = mappedValue
    }
  }
  return res
}

export const encodeUnicodeCharacters = (input: string): string => {
  return encodeURIComponent(input).replace(/%([\dA-F]{2})/g, (_, char) =>
    String.fromCharCode(Number('0x' + char)),
  )
}

export const toBase64 = (value: string): string => {
  return base64.fromByteArray(
    mapHelper(encodeUnicodeCharacters(value), (char) => char.charCodeAt(0)),
  )
}

export const boolToString = (bool: boolean) => {
  return bool ? '1' : '0'
}

export const decimalToString = (decimal: Decimal) => {
  return decimal.toFixed(2)
}
