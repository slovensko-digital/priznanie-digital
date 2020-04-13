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
  '/hypoteka',
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
