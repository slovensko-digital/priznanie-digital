import App, { AppProps } from 'next/app'

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
import { Plausible } from '../components/Plausible'
import Head from 'next/head'
import { checkCookie } from '../lib/cookie'
import getConfig from 'next/config'

/* eslint-disable no-template-curly-in-string */
setLocale({
  mixed: {
    default: 'Hodnota nie je správna',
    required: 'Toto pole musí byť vyplnené',
  },
  number: {
    min: 'Môže mať hodnotu najmenej ${min}',
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
  isDebug: boolean
  isLive: boolean
}

const MyApp = ({ Component, isDebug, isLive, pageProps }: MyAppProps) => {
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

  const { previousRoute: previousPostponeRoute, nextRoute: nextPostponeRoute } =
    getPostponeRoutes(router.pathname as PostponeRoute)

  useEffect(() => {
    const next = nextRoute()
    if (next) {
      router.prefetch(next)
    }
    validateRoute(router, taxForm, taxFormUserInput, postponeUserInput, isDebug)
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
      <Head>
        <title>Elektronické daňové priznanie</title>
      </Head>
      <Plausible />
      <Component
        isDebug={isDebug}
        isLive={isLive}
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

// disable automatic static optimization to enable server-side rendering for all pages
// this will make sure public runtime config is loaded from env vars during run time, not build time
// https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
MyApp.getInitialProps = (context) => {
  const props = App.getInitialProps(context)
  const {
    publicRuntimeConfig: { isLive },
  } = getConfig()
  return {
    ...props,
    isDebug: checkCookie(
      'you-shall',
      'not-pass',
      context?.ctx?.req?.headers?.cookie,
    ),
    isLive
  }
}

export default MyApp
