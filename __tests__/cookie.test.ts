import { checkCookie } from '../src/plugins/app/app/checkCookie'

describe('cookie', () => {
  describe('#checkCookie', () => {
    beforeAll(() => {
      global['document'] = {
        cookie: '',
      } as any
    })

    afterAll(() => {
      delete global['document']
    })

    it('should return true if cookie has expected value', () => {
      document.cookie = 'foo=bar;'
      expect(checkCookie('foo', 'bar')).toBe(true)
    })

    it('should return false if cookie has different value', () => {
      document.cookie = 'foo=barbar;'
      expect(checkCookie('foo', 'bar')).toBe(false)
    })

    it('should return false if cookie does not exist', () => {
      document.cookie = 'foobar=bar;'
      expect(checkCookie('foo', 'bar')).toBe(false)
    })

    it('should return false sever-side (if document is undefined)', () => {
      global['document'] = undefined
      expect(checkCookie('foo', 'bar')).toBe(false)
    })

    it('should return value from passed string', () => {
      global['document'] = undefined
      expect(checkCookie('foo', 'bar', 'foo=bar')).toBe(true)
    })
  })
})
