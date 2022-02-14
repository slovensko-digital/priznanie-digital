import { AppProps } from 'next/app'

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
  initialPostponeUserInput,
  initTaxFormUserInputValues,
} from '../lib/initialValues'
import { setDate } from '../lib/utils'
import { PostponeUserInput } from '../types/PostponeUserInput'
import {
  getPostponeRoutes,
  getRoutes,
  PostponeRoute,
  Route,
  validateRoute,
} from '../lib/routes'
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
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const [taxForm, setTaxForm] = useState<TaxForm>(
    taxFormUserInputToTaxForm(initTaxFormUserInputValues),
  )
  const [taxFormUserInput, setTaxFormUserInput] = useState<TaxFormUserInput>(
    initTaxFormUserInputValues,
  )
  const [postponeUserInput, setPostponeUserInput] = useState<PostponeUserInput>(
    initialPostponeUserInput,
  )

  const updateTaxFormUserInput = (values: Partial<TaxFormUserInput>): void => {
    setTaxFormUserInput((prevUserInput) => {
      const newUserInput: TaxFormUserInput = { ...prevUserInput, ...values }
      setTaxForm(taxFormUserInputToTaxForm(newUserInput))
      return newUserInput
    })
  }

  const router = useRouter()

  if (router.events) {
    router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0)
    })
  }

  const { previousRoute, nextRoute } = getRoutes(
    router.pathname as Route,
    taxForm,
  )

  const {
    previousRoute: previousPostponeRoute,
    nextRoute: nextPostponeRoute,
  } = getPostponeRoutes(router.pathname as PostponeRoute)

  useEffect(() => {
    const next = nextRoute()
    if (next) {
      router.prefetch(next)
    }
    validateRoute(router, taxForm, taxFormUserInput, postponeUserInput)
  }, [router, nextRoute, taxForm, taxFormUserInput, postponeUserInput])

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
        setPostponeUserInput={setPostponeUserInput}
        router={router}
        previousRoute={previousRoute()}
        nextRoute={nextRoute()}
        previousPostponeRoute={previousPostponeRoute}
        nextPostponeRoute={nextPostponeRoute}
        {...pageProps}
      />
    </Layout>
  )
}

export default MyApp
