export const sortObjectKeys = (object: object) => {
  const ordered = {}
  Object.keys(object)
    .sort()
    .forEach((key) => {
      ordered[key] = object[key]
    })
  return ordered
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

/** TODO HACK IMPORTANT to workaround old eform we need to set date before
original deadline. When the new eform is released and before going public we
need to set the current date
*/
export const setDate = <T>(input: T, date: Date = new Date(2020, 2, 31)) => {
  return {
    ...input,
    datum: formatDate(date),
  }
}

export const formatCurrency = (value: number): string => {
  const findPlaceForThousandsDivider = /\B(?=(\d{3})+(?!\d))/g
  return `${(value || 0)
    .toFixed(2)
    .replace(findPlaceForThousandsDivider, ' ')
    .replace('.', ',')} EUR`
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

export const formatIco = (newValue: string, previousValue = '') => {
  const formattedNewValue = newValue.replace(/\D/g, '')
  // when deleting space using backspace, delete both space and the number before it
  if (`${newValue} ` === previousValue) {
    return newValue.slice(0, -1)
  } else if (formattedNewValue.length < 5) {
    // add one space after first 2 digits
    return formattedNewValue.replace(/^(\d{2})/, '$1 ')
  } else {
    // add one space after next 3
    return formattedNewValue.replace(/^(\d{2})\s*(\d{3})/, '$1 $2 ')
  }
}

export const formatRodneCislo = (value: string, withSlash = true) =>
  value
    .replace(/\D/g, '')
    .replace(/^(\d{6})(\d{4})$/, withSlash ? '$1 / $2' : '$1$2')

export const translit = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
