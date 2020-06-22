import { TaxFormUserInput } from '../types/TaxFormUserInput'
import { NextRouter } from 'next/dist/next-server/lib/router/router'
import { TaxForm } from '../types/TaxForm'

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
  | '/iban'
  | '/stiahnut'

export const getOrderedRoutes = (taxForm: TaxForm): ReadonlyArray<Route> => {
  const getChildRoute = (): Route[] => {
    return taxForm.eligibleForChildrenBonus ? ['/deti'] : []
  }
  const getIbanRoute = (): Route[] => {
    return taxForm.mozeZiadatVratitDanovyBonusAleboPreplatok ? ['/iban'] : []
  }

  return [
    '/',
    '/prijmy-a-vydavky',
    '/zamestnanie',
    '/partner',
    ...getChildRoute(),
    '/dochodok',
    '/kupele',
    '/dve-percenta',
    '/osobne-udaje',
    '/suhrn',
    '/vysledky',
    ...getIbanRoute(),
    '/stiahnut',
  ]
}

const isEditing = () =>
  typeof window !== 'undefined' && window.location.search.includes('edit')

export const getRoutes = (currentRoute: Route, taxForm: TaxForm) => {
  const orderedRoutes = getOrderedRoutes(taxForm)
  const currentRouteIndex = orderedRoutes.indexOf(currentRoute)
  return {
    currentRoute,
    nextRoute: () => {
      if (isEditing()) {
        return '/suhrn'
      } else if (currentRouteIndex < 0) {
        return '/'
      } else {
        return orderedRoutes[currentRouteIndex + 1]
      }
    },
    previousRoute: () => {
      if (isEditing()) {
        return '/suhrn'
      } else if (currentRouteIndex < 0) {
        return '/'
      } else {
        return orderedRoutes[currentRouteIndex - 1]
      }
    },
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
  taxForm: TaxForm,
  taxFormUserInput: TaxFormUserInput,
) => {
  if (!document.cookie.match(/you-shall=not-pass/)) {
    const requirements = {
      '/zamestnanie': 't1r10_prijmy',
      '/partner': 'employed',
      '/deti': 'r032_uplatnujem_na_partnera',
      '/dochodok': taxForm.eligibleForChildrenBonus
        ? 'hasChildren'
        : 'r032_uplatnujem_na_partnera',
      // TODO reanable with mortgage feature
      // '/hypoteka': 'platil_prispevky_na_dochodok',
      // '/kupele': 'r037_uplatnuje_uroky',
      '/kupele': 'platil_prispevky_na_dochodok',
      '/dve-percenta': 'kupele',
      '/osobne-udaje': 'XIIoddiel_uplatnujem2percenta',
      '/suhrn': 'r004_priezvisko',
      '/vysledky': 'r004_priezvisko',
      '/iban': 'r004_priezvisko',
      '/stiahnut': 'r004_priezvisko',
    }

    if (requirements[router.route]) {
      const value = taxFormUserInput[requirements[router.route]]

      if (value === undefined || value === '') {
        router.replace('/')
      }
    }
  }
}
