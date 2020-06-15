import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { NextRouter } from 'next/dist/next-server/lib/router/router'

export type Route =
  | '/'
  | '/prijmy-a-vydavky'
  | '/zamestnanie'
  | '/partner'
  | '/deti'
  | '/dochodok'
  | '/hypoteka'
  | '/kupele'
  | '/dve-percenta'
  | '/osobne-udaje'
  | '/suhrn'
  | '/vysledky'
  | '/stiahnut'

const routesOrder: ReadonlyArray<Route> = [
  '/',
  '/prijmy-a-vydavky',
  '/zamestnanie',
  '/partner',
  '/deti',
  '/dochodok',
  // '/hypoteka',
  '/kupele',
  '/dve-percenta',
  '/osobne-udaje',
  '/suhrn',
  '/vysledky',
  '/stiahnut',
]

export const getRoutes = (currentRoute: Route) => {
  const currentRouteIndex = routesOrder.indexOf(currentRoute)
  return {
    currentRoute,
    nextRoute: () =>
      typeof window !== 'undefined' && window.location.search.includes('edit')
        ? '/suhrn'
        : routesOrder[currentRouteIndex + 1],
    previousRoute: () =>
      typeof window !== 'undefined' && window.location.search.includes('edit')
        ? '/suhrn'
        : routesOrder[currentRouteIndex + -1],
  }
}

export type PostponeRoute =
  | '/'
  | '/odklad/prijmy-zo-zahranicia'
  | '/odklad/osobne-udaje'
  | '/odklad/suhrn'
  | '/odklad/stiahnut'

const postponeRoutesOrder: ReadonlyArray<PostponeRoute> = [
  '/',
  '/odklad/prijmy-zo-zahranicia',
  '/odklad/osobne-udaje',
  '/odklad/suhrn',
  '/odklad/stiahnut',
]

export const getPostponeRoutes = (currentRoute: PostponeRoute) => {
  const currentRouteIndex = postponeRoutesOrder.indexOf(currentRoute)
  return {
    currentRoute,
    nextRoute: postponeRoutesOrder[currentRouteIndex + 1],
    previousRoute: postponeRoutesOrder[currentRouteIndex + -1],
  }
}

export const validateRoute = (
  router: NextRouter,
  taxFormUserInput: TaxFormUserInput,
) => {
  if (!document.cookie.match(/you-shall=not-pass/)) {
    const requirements = {
      '/zamestnanie': 't1r10_prijmy',
      '/partner': 'employed',
      '/deti': 'r032_uplatnujem_na_partnera',
      '/dochodok': 'hasChildren',
      // TODO reanable with mortgage feature
      // '/hypoteka': 'platil_prispevky_na_dochodok',
      // '/kupele': 'r037_uplatnuje_uroky',
      '/kupele': 'platil_prispevky_na_dochodok',
      '/dve-percenta': 'kupele',
      '/osobne-udaje': 'XIIoddiel_uplatnujem2percenta',
      '/suhrn': 'meno_priezvisko',
      '/vysledky': 'meno_priezvisko',
      '/stiahnut': 'meno_priezvisko',
    }

    const value = taxFormUserInput[requirements[router.route]]

    if (value === undefined || value === '') {
      router.replace('/')
    }
  }
}
