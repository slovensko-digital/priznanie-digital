import App, { AppProps } from 'next/app'

import '../styles/global.css'
import 'navody-digital-frontend/govuk/all.scss'
import '../styles/libs.css'

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

const taxFormUserInputToTaxForm = (input: TaxFormUserInput): TaxForm => {
  return calculate(setDate(input))
}

interface MyAppProps extends AppProps {
  Component: Page<Partial<TaxFormUserInput>>
  isDebug: boolean
  isLive: boolean
  isPostponeLive: boolean
}

const MyApp = ({
  Component,
  isDebug,
  isLive,
  isPostponeLive,
  pageProps,
}: MyAppProps) => {
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
        isPostponeLive={isPostponeLive}
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
    publicRuntimeConfig: { isLive, isPostponeLive },
  } = getConfig()
  return {
    ...props,
    isDebug: checkCookie(
      'you-shall',
      'not-pass',
      context?.ctx?.req?.headers?.cookie,
    ),
    isLive,
    isPostponeLive,
  }
}

export default MyApp
