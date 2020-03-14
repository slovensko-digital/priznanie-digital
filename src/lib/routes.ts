export type Route =
  | '/'
  | '/prijmy-a-vydavky'
  | '/zamestnanie'
  | '/partner'
  | '/deti'
  | '/dochodok'
  | '/hypoteka'
  | '/osobne-udaje'
  | '/vysledky';

const routesOrder: ReadonlyArray<Route> = [
  '/',
  '/prijmy-a-vydavky',
  '/zamestnanie',
  '/partner',
  '/deti',
  '/dochodok',
  '/hypoteka',
  '/osobne-udaje',
  '/vysledky',
];

export const getRoutes = (currentRoute: Route) => {
  const currentRouteIndex = routesOrder.indexOf(currentRoute);
  return {
    currentRoute,
    nextRoute: routesOrder[currentRouteIndex + 1],
    previousRoute: routesOrder[currentRouteIndex + -1],
  };
};

export type PostponeRoute =
  | '/'
  | '/odklad/prijmy-zo-zahranicia'
  | '/odklad/osobne-udaje'
  | '/odklad/suhrn'
  | '/odklad/stiahnut'
  | '/odklad/navod';

const postponeRoutesOrder: ReadonlyArray<PostponeRoute> = [
  '/',
  '/odklad/prijmy-zo-zahranicia',
  '/odklad/osobne-udaje',
  '/odklad/suhrn',
  '/odklad/stiahnut',
  '/odklad/navod',
];

export const getPostponeRoutes = (currentRoute: PostponeRoute) => {
  const currentRouteIndex = postponeRoutesOrder.indexOf(currentRoute);
  return {
    currentRoute,
    nextRoute: postponeRoutesOrder[currentRouteIndex + 1],
    previousRoute: postponeRoutesOrder[currentRouteIndex + -1],
  };
};
