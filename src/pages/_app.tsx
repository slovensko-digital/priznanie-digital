import { AppProps, AppContext } from 'next/app'
import nextCookies from 'next-cookies'

/* eslint-disable import/no-unassigned-import */
import '../styles/global.css'
import '../styles/navody-digital-0.1.8.min.css'
import '../styles/libs.css'
/* eslint-enable import/no-unassigned-import */

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { setLocale } from 'yup'
import { calculate } from '../lib/calculation'
import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { TaxForm } from '../types/TaxForm'
import Layout from '../components/Layout'
import {
  getInitialTaxFormInputValues,
  getInitialPostponeUserInput,
} from '../lib/initialValues'
import { setDate, setCookie } from '../lib/utils'
import { PostponeUserInput } from '../types/PostponeUserInput'
import { getRoutes, Route, validateRoute } from '../lib/routes'
import { Page } from '../components/Page'

/* eslint-disable no-template-curly-in-string */
setLocale({
  mixed: {
    default: 'Hodnota nie je správna',
    required: 'Toto pole musí byť vyplnené',
  },
  number: {
    min: 'Môže mať hodnotu najmenej  ${min}',
    max: 'Môže mať hodnotu najviac ${max}',
  },
  string: {
    min: 'Musí mať aspoň ${min} znakov',
    max: 'Môže mať maximálne ${max} znakov',
    length: 'Musí mať presne ${length} znakov',
  },
})
/* eslint-enable no-template-curly-in-string */

const taxFormUserInputToTaxForm = (input: TaxFormUserInput): TaxForm => {
  return calculate(setDate(input))
}

interface MyAppProps extends AppProps {
  Component: Page<Partial<TaxFormUserInput>>
  taxFormUserInputFromCookie: TaxFormUserInput | null
  postponeUserInputFromCookie: PostponeUserInput | null
}

const MyApp = ({
  Component,
  pageProps,
  taxFormUserInputFromCookie,
  postponeUserInputFromCookie,
}: MyAppProps) => {
  const [taxForm, setTaxForm] = useState<TaxForm>(
    taxFormUserInputToTaxForm(
      getInitialTaxFormInputValues(taxFormUserInputFromCookie),
    ),
  )
  const [taxFormUserInput, setTaxFormUserInput] = useState<TaxFormUserInput>(
    getInitialTaxFormInputValues(taxFormUserInputFromCookie),
  )
  const [postponeUserInput, setPostponeUserInput] = useState<PostponeUserInput>(
    getInitialPostponeUserInput(postponeUserInputFromCookie),
  )

  const updateTaxFormUserInput = (values: Partial<TaxFormUserInput>): void => {
    setTaxFormUserInput((prevUserInput) => {
      const newUserInput: TaxFormUserInput = { ...prevUserInput, ...values }
      setTaxForm(taxFormUserInputToTaxForm(newUserInput))
      setCookie('taxFormUserInput', JSON.stringify(newUserInput))
      return newUserInput
    })
  }

  const updatePostponeUserInput = (values: PostponeUserInput) => {
    setCookie('postponeUserInput', JSON.stringify(values))
    return setPostponeUserInput(values)
  }

  const router = useRouter()

  const { previousRoute, nextRoute } = getRoutes(
    router.pathname as Route,
    taxForm,
  )

  useEffect(() => {
    const next = nextRoute()
    if (next) {
      router.prefetch(next)
    }
    validateRoute(router, taxForm, taxFormUserInput)
  }, [router, nextRoute, taxForm, taxFormUserInput])

  useEffect(() => {
    const input = document.querySelector('main input, main select') as
      | HTMLInputElement
      | HTMLSelectElement
      | null
    const anchor = document.querySelector(
      'select, main a',
    ) as HTMLAnchorElement | null

    ;(input || anchor)?.focus()
  }, [router])

  const headline = /^\/odklad\//.test(router.pathname)
    ? 'Odklad daňového priznania'
    : 'Daňové priznanie pre živnostníkov s paušálnymi výdavkami (DPFO typ B)'

  return (
    <Layout
      headline={headline}
      taxFormUserInput={taxFormUserInput}
      postponeUserInput={postponeUserInput}
    >
      <Component
        taxForm={taxForm}
        taxFormUserInput={taxFormUserInput}
        setTaxFormUserInput={updateTaxFormUserInput}
        postponeUserInput={postponeUserInput}
        setPostponeUserInput={updatePostponeUserInput}
        router={router}
        previousRoute={previousRoute()}
        nextRoute={nextRoute()}
        {...pageProps}
      />
    </Layout>
  )
}

MyApp.getInitialProps = ({ ctx }: AppContext) => {
  const { taxFormUserInput, postponeUserInput } = nextCookies(ctx)
  return {
    taxFormUserInputFromCookie: taxFormUserInput,
    postponeUserInputFromCookie: postponeUserInput,
  }
}

export default MyApp
