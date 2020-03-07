// export enum Routes {
//   '/index',
//   '/prijmy-a-vydavky',
//   '/zamestnanie',
//   '/partner',
//   '/deti',
//   '/osobne-udaje',
//   '/vysledky',
// }

type Route =
  | '/'
  | '/prijmy-a-vydavky'
  | '/zamestnanie'
  | '/partner'
  | '/deti'
  | '/dochodok'
  | '/osobne-udaje'
  | '/vysledky';

const routesOrder: ReadonlyArray<Route> = [
  '/',
  '/prijmy-a-vydavky',
  '/zamestnanie',
  '/partner',
  '/deti',
  '/dochodok',
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
