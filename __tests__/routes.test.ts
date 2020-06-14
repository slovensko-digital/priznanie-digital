import { validateRoute } from '../src/lib/routes'

describe('routes', () => {
  describe('#validateRoute', () => {
    const replace = jest.fn()

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should redirect from route when form is not filled out', () => {
      validateRoute({ route: '/partner', replace } as any, {} as any)
      expect(replace).toHaveBeenCalledWith('/')
    })

    it('should not redirect from route when form is filled out', () => {
      validateRoute(
        { route: '/partner', replace } as any,
        { employed: false } as any,
      )
      expect(replace).toHaveBeenCalledTimes(0)
    })
  })
})
