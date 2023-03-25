import {
  getOrderedRoutes,
  getRoutes,
  validateRoute,
  homeRoute,
} from '../src/lib/routes'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { TaxForm } from '../src/types/TaxForm'
import { PostponeUserInput } from '../src/types/PostponeUserInput'

describe('routes', () => {
  describe('#getOrderedRoutes', () => {
    it('should return routes without children, without two-percent, without iban', () => {
      expect(getOrderedRoutes({} as TaxForm)).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/partner',
        '/dochodok',
        '/osobne-udaje',
        '/suhrn',
        '/vysledky',
        '/pokracovat',
      ])
    })

    it('should return routes without children, with two-percent, without iban', () => {
      expect(
        getOrderedRoutes({} as TaxForm),
      ).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/partner',
        '/dochodok',
        '/dve-percenta',
        '/osobne-udaje',
        '/suhrn',
        '/vysledky',
        '/pokracovat',
      ])
    })

    it('should return routes with children, without two-percent, without iban', () => {
      expect(
        getOrderedRoutes({ eligibleForChildrenBonus: true } as TaxForm),
      ).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/partner',
        '/deti',
        '/dochodok',
        '/osobne-udaje',
        '/suhrn',
        '/vysledky',
        '/pokracovat',
      ])
    })

    it('should return routes with children, with iban, without two-percent', () => {
      expect(
        getOrderedRoutes({
          eligibleForChildrenBonus: true,
          mozeZiadatVyplatitDanovyBonus: true,
        } as TaxForm),
      ).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/partner',
        '/deti',
        '/dochodok',
        '/osobne-udaje',
        '/suhrn',
        '/iban',
        '/vysledky',
        '/pokracovat',
      ])
    })

    it('should return routes without children, with iban, without two-percent', () => {
      expect(
        getOrderedRoutes({
          mozeZiadatVyplatitDanovyBonus: true,
        } as TaxForm),
      ).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/partner',
        '/dochodok',
        '/osobne-udaje',
        '/suhrn',
        '/iban',
        '/vysledky',
        '/pokracovat',
      ])
    })

    it('should return routes without children, with iban, with two-percent', () => {
      expect(
        getOrderedRoutes({
          mozeZiadatVyplatitDanovyBonus: true,
        } as TaxForm),
      ).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/partner',
        '/dochodok',
        '/dve-percenta',
        '/osobne-udaje',
        '/suhrn',
        '/iban',
        '/vysledky',
        '/pokracovat',
      ])
    })
  })

  describe('#getRoutes', () => {
    describe('nextRoute', () => {
      describe('for route /partner', () => {
        it('should be correct when not eligible for children bonus', () => {
          const { nextRoute } = getRoutes('/partner', {} as TaxForm)
          expect(nextRoute()).toBe('/dochodok')
        })

        it('should be correct when eligible for children bonus', () => {
          const { nextRoute } = getRoutes('/partner', {
            eligibleForChildrenBonus: true,
          } as TaxForm)
          expect(nextRoute()).toBe('/deti')
        })
      })

      describe('for route /suhrn', () => {
        it('should be correct when not eligible for refund', () => {
          const { nextRoute } = getRoutes('/suhrn', {} as TaxForm)
          expect(nextRoute()).toBe('/vysledky')
        })

        it('should be correct when eligible for refund', () => {
          const { nextRoute } = getRoutes('/suhrn', {
            mozeZiadatVyplatitDanovyBonus: true,
          } as TaxForm)
          expect(nextRoute()).toBe('/iban')
        })
      })
    })

    describe('previousRoute', () => {
      describe('for route /dochodok', () => {
        it('should be correct when not eligible for children bonus', () => {
          const { previousRoute } = getRoutes('/dochodok', {} as TaxForm)
          expect(previousRoute()).toBe('/partner')
        })

        it('should be correct when eligible for children bonus', () => {
          const { previousRoute } = getRoutes('/dochodok', {
            eligibleForChildrenBonus: true,
          } as TaxForm)
          expect(previousRoute()).toBe('/deti')
        })
      })

      describe('for route /vysledky', () => {
        it('should be correct when not eligible for refund', () => {
          const { previousRoute } = getRoutes('/vysledky', {} as TaxForm)
          expect(previousRoute()).toBe('/suhrn')
        })

        it('should be correct when eligible for refund', () => {
          const { previousRoute } = getRoutes('/vysledky', {
            mozeZiadatVyplatitDanovyBonus: true,
          } as TaxForm)
          expect(previousRoute()).toBe('/iban')
        })
      })
    })
  })

  describe('#validateRoute', () => {
    const replace = jest.fn()

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should redirect from route when form is not filled out', () => {
      validateRoute(
        { route: '/partner', replace } as any,
        {} as TaxForm,
        {} as TaxFormUserInput,
        {} as PostponeUserInput,
      )
      expect(replace).toHaveBeenCalledWith(homeRoute)
    })

    it('should redirect from route when form is empty', () => {
      validateRoute(
        { route: '/odklad/suhrn', replace } as any,
        {} as TaxForm,
        {} as TaxFormUserInput,
        { priezvisko: '' } as PostponeUserInput,
      )
      expect(replace).toHaveBeenCalledWith(homeRoute)
    })

    it('should not redirect from route when form is filled out', () => {
      validateRoute(
        { route: '/partner', replace } as any,
        {} as TaxForm,
        { employed: false } as TaxFormUserInput,
        {} as PostponeUserInput,
      )
      expect(replace).toHaveBeenCalledTimes(0)
    })

    it('should not redirect from route when postpone form is filled out', () => {
      validateRoute(
        { route: '/odklad/osobne-udaje', replace } as any,
        {} as TaxForm,
        {} as TaxFormUserInput,
        { prijmy_zo_zahranicia: false } as PostponeUserInput,
      )
      expect(replace).toHaveBeenCalledTimes(0)
    })
  })
})
