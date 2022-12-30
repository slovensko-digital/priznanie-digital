import { NextPage } from 'next'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { TaxForm } from '../types/TaxForm'
import { PostponeUserInput } from '../types/PostponeUserInput'
import { Route } from '../../../lib/routes'
import { Router } from 'next/router'

export interface PageProps<UserInput> {
  taxForm: TaxForm
  taxFormUserInput: TaxFormUserInput
  setTaxFormUserInput: (values: UserInput) => void
  postponeUserInput: PostponeUserInput
  setPostponeUserInput: (values: UserInput) => void
  router: Router
  previousRoute: Route
  nextRoute: Route
  isDebug: boolean
}

export type Page<UserInput> = NextPage<PageProps<UserInput>>
