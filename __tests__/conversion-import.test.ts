import { createMocks } from 'node-mocks-http'
import handler from '../src/pages/api/conversion-import'

const VALID_USERNAME = 'testuser'
const VALID_PASSWORD = 'testpass'
const VALID_AUTH = `Basic ${Buffer.from(`${VALID_USERNAME}:${VALID_PASSWORD}`).toString('base64')}`

beforeAll(() => {
  process.env.CONVERSION_IMPORT_USERNAME = VALID_USERNAME
  process.env.CONVERSION_IMPORT_PASSWORD = VALID_PASSWORD
})

afterAll(() => {
  delete process.env.CONVERSION_IMPORT_USERNAME
  delete process.env.CONVERSION_IMPORT_PASSWORD
  delete process.env.CONVERSION_IMPORT_FILEPATH
})

describe('GET /api/conversion-import', () => {
  describe('authentication', () => {
    it('should return 401 when no authorization header is provided', async () => {
      const { req, res } = createMocks({ method: 'GET' })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(401)
      expect(res._getHeaders()['www-authenticate']).toBe(
        'Basic realm="Conversion Import"',
      )
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Authentication required',
      })
    })

    it('should return 401 when authorization header is not Basic', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        headers: { authorization: 'Bearer some-token' },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(401)
    })

    it('should return 403 when credentials are invalid', async () => {
      const invalidAuth = `Basic ${Buffer.from('wrong:creds').toString('base64')}`
      const { req, res } = createMocks({
        method: 'GET',
        headers: { authorization: invalidAuth },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(403)
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Invalid credentials',
      })
    })
  })

  describe('with valid credentials', () => {
    it('should return CSV with correct headers', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        headers: { authorization: VALID_AUTH },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(res._getHeaders()['content-type']).toBe('text/csv')
      expect(res._getHeaders()['content-disposition']).toBe(
        'inline; filename="conversion-import.csv"',
      )
    })

    it('should return the CSV file content', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        headers: { authorization: VALID_AUTH },
      })

      await handler(req, res)

      const data = res._getData()
      expect(data).toContain('Google Click ID')
      expect(data).toContain('Conversion Name')
      expect(data).toContain('Parameters:TimeZone=')
    })

    it('should use CONVERSION_IMPORT_FILEPATH when set', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        headers: { authorization: VALID_AUTH },
      })

      process.env.CONVERSION_IMPORT_FILEPATH = '/nonexistent/file.csv'

      await handler(req, res)

      expect(res._getStatusCode()).toBe(500)
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Failed to read conversion import file',
      })

      delete process.env.CONVERSION_IMPORT_FILEPATH
    })
  })
})
