import {
  getOrderedRoutes,
  getRoutes,
  validateRoute,
  homeRoute,
} from '../src/lib/routes'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { TaxForm } from '../src/types/TaxForm'

describe('routes', () => {
  describe('#getOrderedRoutes', () => {
    it('shoudl return routes without children and without iban', () => {
      expect(getOrderedRoutes({} as TaxForm)).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/partner',
        '/dochodok',
        '/kupele',
        '/dve-percenta',
        '/osobne-udaje',
        '/suhrn',
        '/vysledky',
        '/stiahnut',
      ])
    })

    it('shoudl return routes with children and without iban', () => {
      expect(
        getOrderedRoutes({ eligibleForChildrenBonus: true } as TaxForm),
      ).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/partner',
        '/deti',
        '/dochodok',
        '/kupele',
        '/dve-percenta',
        '/osobne-udaje',
        '/suhrn',
        '/vysledky',
        '/stiahnut',
      ])
    })

    it('shoudl return routes with children and with iban', () => {
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
        '/kupele',
        '/dve-percenta',
        '/osobne-udaje',
        '/suhrn',
        '/iban',
        '/vysledky',
        '/stiahnut',
      ])
    })

    it('shoudl return routes without children and with iban', () => {
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
        '/kupele',
        '/dve-percenta',
        '/osobne-udaje',
        '/suhrn',
        '/iban',
        '/vysledky',
        '/stiahnut',
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
      )
      expect(replace).toHaveBeenCalledWith(homeRoute)
    })

    it('should not redirect from route when form is filled out', () => {
      validateRoute(
        { route: '/partner', replace } as any,
        {} as TaxForm,
        { employed: false } as TaxFormUserInput,
      )
      expect(replace).toHaveBeenCalledTimes(0)
    })
  })
})
