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
