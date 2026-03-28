import {
  getOrderedRoutes,
  getRoutes,
  validateRoute,
  homeRoute,
} from '../src/lib/routes'
import { TaxFormUserInput } from '../src/types/TaxFormUserInput'
import { TaxForm } from '../src/types/TaxForm'
import { PostponeUserInput } from '../src/types/PostponeUserInput'
import { NextRouter } from 'next/router'

describe('routes', () => {
  describe('#getOrderedRoutes', () => {
    it('should return routes without children, without iban', () => {
      expect(getOrderedRoutes({} as TaxForm)).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/dohoda',
        '/partner',
        '/deti',
        '/dochodok',
        '/prenajom',
        '/uroky',
        '/dve-percenta-rodicom',
        '/dve-percenta',
        '/osobne-udaje',
        '/suhrn',
        '/vysledky',
        '/pokracovat',
      ])
    })

    it('should return routes with children, without iban', () => {
      expect(getOrderedRoutes({} as TaxForm)).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/dohoda',
        '/partner',
        '/deti',
        '/dochodok',
        '/prenajom',
        '/uroky',
        '/dve-percenta-rodicom',
        '/dve-percenta',
        '/osobne-udaje',
        '/suhrn',
        '/vysledky',
        '/pokracovat',
      ])
    })

    it('should return routes with children, with iban', () => {
      expect(
        getOrderedRoutes({
          mozeZiadatVratitPreplatkyBonusyUroky: true,
        } as TaxForm),
      ).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/dohoda',
        '/partner',
        '/deti',
        '/dochodok',
        '/prenajom',
        '/uroky',
        '/dve-percenta-rodicom',
        '/dve-percenta',
        '/osobne-udaje',
        '/suhrn',
        '/iban',
        '/vysledky',
        '/pokracovat',
      ])
    })

    it('should return routes without children, with iban', () => {
      expect(
        getOrderedRoutes({
          mozeZiadatVratitPreplatkyBonusyUroky: true,
        } as TaxForm),
      ).toStrictEqual([
        homeRoute,
        '/prijmy-a-vydavky',
        '/zamestnanie',
        '/dohoda',
        '/partner',
        '/deti',
        '/dochodok',
        '/prenajom',
        '/uroky',
        '/dve-percenta-rodicom',
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
        it('should be correct when eligible for children bonus', () => {
          const { nextRoute } = getRoutes('/partner', {} as TaxForm)
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
            mozeZiadatVratitPreplatkyBonusyUroky: true,
          } as TaxForm)
          expect(nextRoute()).toBe('/iban')
        })
      })
    })

    describe('previousRoute', () => {
      describe('for route /dochodok', () => {
        it('should be correct when eligible for children bonus', () => {
          const { previousRoute } = getRoutes('/dochodok', {} as TaxForm)
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
            mozeZiadatVratitPreplatkyBonusyUroky: true,
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
        { route: '/partner', replace } as unknown as NextRouter,
        {} as TaxForm,
        {} as TaxFormUserInput,
        {} as PostponeUserInput,
      )
      expect(replace).toHaveBeenCalledWith(homeRoute)
    })

    it('should redirect from route when form is empty', () => {
      validateRoute(
        { route: '/odklad/suhrn', replace } as unknown as NextRouter,
        {} as TaxForm,
        {} as TaxFormUserInput,
        { priezvisko: '' } as PostponeUserInput,
      )
      expect(replace).toHaveBeenCalledWith(homeRoute)
    })

    it('should not redirect from route when form is filled out', () => {
      validateRoute(
        { route: '/dohoda', replace } as unknown as NextRouter,
        {} as TaxForm,
        { employed: false } as TaxFormUserInput,
        {} as PostponeUserInput,
      )
      expect(replace).toHaveBeenCalledTimes(0)
    })

    it('should not redirect from route when postpone form is filled out', () => {
      validateRoute(
        { route: '/odklad/osobne-udaje', replace } as unknown as NextRouter,
        {} as TaxForm,
        {} as TaxFormUserInput,
        { prijmy_zo_zahranicia: false } as PostponeUserInput,
      )
      expect(replace).toHaveBeenCalledTimes(0)
    })

    describe('isLive guard', () => {
      it('should redirect form pages to home when isLive=false', () => {
        validateRoute(
          { route: '/prijmy-a-vydavky', replace } as unknown as NextRouter,
          {} as TaxForm,
          { prijem_zo_zivnosti: true } as TaxFormUserInput,
          {} as PostponeUserInput,
          false,
          false,
        )
        expect(replace).toHaveBeenCalledWith(homeRoute)
      })

      it('should redirect all form pages when isLive=false', () => {
        const formRoutes = [
          '/prijmy-a-vydavky',
          '/zamestnanie',
          '/partner',
          '/deti',
          '/dochodok',
          '/prenajom',
          '/osobne-udaje',
          '/suhrn',
          '/vysledky',
        ]
        for (const route of formRoutes) {
          replace.mockClear()
          validateRoute(
            { route, replace } as unknown as NextRouter,
            {} as TaxForm,
            {} as TaxFormUserInput,
            {} as PostponeUserInput,
            false,
            false,
          )
          expect(replace).toHaveBeenCalledWith(homeRoute)
        }
      })

      it('should not redirect home page when isLive=false', () => {
        validateRoute(
          { route: '/', replace } as unknown as NextRouter,
          {} as TaxForm,
          {} as TaxFormUserInput,
          {} as PostponeUserInput,
          false,
          false,
        )
        expect(replace).toHaveBeenCalledTimes(0)
      })

      it('should not redirect odklad pages when isLive=false but isPostponeLive=true', () => {
        validateRoute(
          { route: '/odklad/prijmy-zo-zahranicia', replace } as unknown as NextRouter,
          {} as TaxForm,
          {} as TaxFormUserInput,
          {} as PostponeUserInput,
          false,
          false,
          true,
        )
        expect(replace).toHaveBeenCalledTimes(0)
      })

      it('should not redirect when isDebug=true even if isLive=false', () => {
        validateRoute(
          { route: '/prijmy-a-vydavky', replace } as unknown as NextRouter,
          {} as TaxForm,
          {} as TaxFormUserInput,
          {} as PostponeUserInput,
          true,
          false,
        )
        expect(replace).toHaveBeenCalledTimes(0)
      })
    })

    describe('isPostponeLive guard', () => {
      it('should redirect odklad pages to home when isPostponeLive=false', () => {
        validateRoute(
          { route: '/odklad/prijmy-zo-zahranicia', replace } as unknown as NextRouter,
          {} as TaxForm,
          {} as TaxFormUserInput,
          {} as PostponeUserInput,
          false,
          true,
          false,
        )
        expect(replace).toHaveBeenCalledWith(homeRoute)
      })

      it('should redirect all odklad pages when isPostponeLive=false', () => {
        const odkladRoutes = [
          '/odklad/prijmy-zo-zahranicia',
          '/odklad/osobne-udaje',
          '/odklad/suhrn',
          '/odklad/pokracovat',
        ]
        for (const route of odkladRoutes) {
          replace.mockClear()
          validateRoute(
            { route, replace } as unknown as NextRouter,
            {} as TaxForm,
            {} as TaxFormUserInput,
            {} as PostponeUserInput,
            false,
            true,
            false,
          )
          expect(replace).toHaveBeenCalledWith(homeRoute)
        }
      })

      it('should not redirect form pages when isPostponeLive=false but isLive=true', () => {
        validateRoute(
          { route: '/prijmy-a-vydavky', replace } as unknown as NextRouter,
          {} as TaxForm,
          { prijem_zo_zivnosti: true } as TaxFormUserInput,
          {} as PostponeUserInput,
          false,
          true,
          false,
        )
        expect(replace).toHaveBeenCalledTimes(0)
      })

      it('should not redirect when isDebug=true even if isPostponeLive=false', () => {
        validateRoute(
          { route: '/odklad/prijmy-zo-zahranicia', replace } as unknown as NextRouter,
          {} as TaxForm,
          {} as TaxFormUserInput,
          {} as PostponeUserInput,
          true,
          true,
          false,
        )
        expect(replace).toHaveBeenCalledTimes(0)
      })
    })

    describe('both flags false', () => {
      it('should redirect form pages when both isLive and isPostponeLive are false', () => {
        validateRoute(
          { route: '/prijmy-a-vydavky', replace } as unknown as NextRouter,
          {} as TaxForm,
          {} as TaxFormUserInput,
          {} as PostponeUserInput,
          false,
          false,
          false,
        )
        expect(replace).toHaveBeenCalledWith(homeRoute)
      })

      it('should redirect odklad pages when both isLive and isPostponeLive are false', () => {
        validateRoute(
          { route: '/odklad/prijmy-zo-zahranicia', replace } as unknown as NextRouter,
          {} as TaxForm,
          {} as TaxFormUserInput,
          {} as PostponeUserInput,
          false,
          false,
          false,
        )
        expect(replace).toHaveBeenCalledWith(homeRoute)
      })
    })
  })
})
