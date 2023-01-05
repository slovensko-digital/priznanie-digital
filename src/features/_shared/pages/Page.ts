import { NextPage } from 'next'
import { TaxFormUserInput } from '../taxform/TaxFormUserInput'
import { TaxForm } from '../taxform/TaxForm'
import { PostponeUserInput } from './_types/PostponeUserInput'
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
