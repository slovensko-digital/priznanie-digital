import fs from 'fs'
import os from 'os'
import path from 'path'
import { createMocks } from 'node-mocks-http'

jest.mock('../src/lib/rollbar', () => ({
  RollbarInstance: { error: jest.fn() },
}))

import handler from '../src/pages/api/conversion-import'

const VALID_USERNAME = 'testuser'
const VALID_PASSWORD = 'testpass'
const VALID_AUTH = `Basic ${Buffer.from(`${VALID_USERNAME}:${VALID_PASSWORD}`).toString('base64')}`

const TEST_CSV = [
  'Parameters:TimeZone=Europe/Bratislava,,,,,,',
  'Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency,Ad User Data,Ad Personalization',
  'TEST_GCLID,test-conversion,2026-01-01 12:00:00,,,Granted,Granted',
].join('\n')

let tmpFilePath: string

beforeAll(() => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'conversion-import-'))
  tmpFilePath = path.join(tmpDir, 'test-conversion-import.csv')
  fs.writeFileSync(tmpFilePath, TEST_CSV)

  process.env.CONVERSION_IMPORT_USERNAME = VALID_USERNAME
  process.env.CONVERSION_IMPORT_PASSWORD = VALID_PASSWORD
  process.env.CONVERSION_IMPORT_FILEPATH = tmpFilePath
})

afterAll(() => {
  fs.unlinkSync(tmpFilePath)
  fs.rmdirSync(path.dirname(tmpFilePath))

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

    it('should return 401 when authorization header is malformed', async () => {
      const malformed = `Basic ${Buffer.from('no-colon-here').toString('base64')}`
      const { req, res } = createMocks({
        method: 'GET',
        headers: { authorization: malformed },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(401)
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Malformed authorization header',
      })
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

    it('should handle passwords containing colons', async () => {
      const passwordWithColon = 'pass:word:with:colons'
      process.env.CONVERSION_IMPORT_PASSWORD = passwordWithColon
      const auth = `Basic ${Buffer.from(`${VALID_USERNAME}:${passwordWithColon}`).toString('base64')}`
      const { req, res } = createMocks({
        method: 'GET',
        headers: { authorization: auth },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(200)

      process.env.CONVERSION_IMPORT_PASSWORD = VALID_PASSWORD
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
      expect(res._getHeaders()['cache-control']).toBe('private, no-store')
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
      expect(data).toContain('TEST_GCLID')
    })

    it('should return 500 when CONVERSION_IMPORT_FILEPATH is not set', async () => {
      const savedPath = process.env.CONVERSION_IMPORT_FILEPATH
      delete process.env.CONVERSION_IMPORT_FILEPATH

      const { req, res } = createMocks({
        method: 'GET',
        headers: { authorization: VALID_AUTH },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(500)
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Conversion import file path is not configured',
      })

      process.env.CONVERSION_IMPORT_FILEPATH = savedPath
    })

    it('should return 500 when file does not exist', async () => {
      const savedPath = process.env.CONVERSION_IMPORT_FILEPATH
      process.env.CONVERSION_IMPORT_FILEPATH = '/nonexistent/file.csv'

      const { req, res } = createMocks({
        method: 'GET',
        headers: { authorization: VALID_AUTH },
      })

      await handler(req, res)

      expect(res._getStatusCode()).toBe(500)
      expect(JSON.parse(res._getData())).toEqual({
        error: 'Failed to read conversion import file',
      })

      process.env.CONVERSION_IMPORT_FILEPATH = savedPath
    })
  })
})
