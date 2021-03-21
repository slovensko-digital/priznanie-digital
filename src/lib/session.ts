import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { PostponeUserInput } from '../types/PostponeUserInput'

const isSessionStorageSupported = () => {
  return (
    typeof window !== 'undefined' &&
    typeof window.sessionStorage !== 'undefined'
  )
}

const saveSession = (key: string, data: any): void => {
  if (!isSessionStorageSupported()) {
    return
  }
  window.sessionStorage.setItem(key, JSON.stringify(data))
}

export const preserveTaxFormUserInput = (data: TaxFormUserInput) => {
  saveSession('taxFormUserInput', data)
}

export const preservePostponeUserInput = (data: PostponeUserInput) => {
  saveSession('postponeUserInput', data)
}

const getSession = (key: string): any => {
  if (!isSessionStorageSupported()) {
    return undefined
  }
  const data = window.sessionStorage.getItem(key)
  console.log(JSON.parse(data))
  return data && JSON.parse(data)
}

export const getPreservedTaxFormUserInput = (): TaxFormUserInput => {
  return getSession('taxFormUserInput')
}

export const getPreservedPostponemUserInput = (): PostponeUserInput => {
  return getSession('postponeUserInput')
}
