import fs from 'fs'
import os from 'os'
import path from 'path'
import { createMocks } from 'node-mocks-http'

jest.mock('../src/lib/rollbar', () => ({
  RollbarInstance: { error: jest.fn() },
}))

import handler from '../src/pages/api/conversion'

const GCLID = 'Cj0KCQiA_test-GCLID_1234567890'

let tmpDir: string
let filePath: string

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'conversion-'))
  filePath = path.join(tmpDir, 'nested', 'conversion-import.csv')
  process.env.CONVERSION_IMPORT_FILEPATH = filePath
})

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true })
  delete process.env.CONVERSION_IMPORT_FILEPATH
})

const post = async (body: unknown) => {
  const { req, res } = createMocks({ method: 'POST', body })
  await handler(req, res)
  return res
}

describe('POST /api/conversion', () => {
  it('should create the CSV with Google Ads header and append a row', async () => {
    const res = await post({ gclid: GCLID, type: 'priznanie' })

    expect(res._getStatusCode()).toBe(204)
    const lines = fs.readFileSync(filePath, 'utf-8').trim().split('\n')
    expect(lines[0]).toBe('Parameters:TimeZone=Europe/Bratislava,,,,,,')
    expect(lines[1]).toBe(
      'Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency,Ad User Data,Ad Personalization',
    )
    expect(lines[2]).toMatch(
      new RegExp(
        `^${GCLID},priznanie,\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2},,,Granted,Denied$`,
      ),
    )
  })

  it('should append to an existing file without repeating the header', async () => {
    await post({ gclid: GCLID, type: 'priznanie' })
    await post({ gclid: GCLID, type: 'odklad' })

    const lines = fs.readFileSync(filePath, 'utf-8').trim().split('\n')
    expect(lines).toHaveLength(4)
    expect(lines[3]).toContain(`${GCLID},odklad,`)
  })

  it('should accept a JSON string body', async () => {
    const res = await post(JSON.stringify({ gclid: GCLID, type: 'odklad' }))

    expect(res._getStatusCode()).toBe(204)
  })

  it.each([
    [{ type: 'priznanie' }],
    [{ gclid: 'short', type: 'priznanie' }],
    [{ gclid: `${GCLID},injected`, type: 'priznanie' }],
    [{ gclid: GCLID, type: 'unknown' }],
    [{ gclid: GCLID, type: 'toString' }],
    ['not json'],
  ])('should reject invalid data %j', async (body) => {
    const res = await post(body)

    expect(res._getStatusCode()).toBe(400)
    expect(fs.existsSync(filePath)).toBe(false)
  })

  it('should reject other methods', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
  })

  it('should return 500 when the file path is not configured', async () => {
    delete process.env.CONVERSION_IMPORT_FILEPATH

    const res = await post({ gclid: GCLID, type: 'priznanie' })

    expect(res._getStatusCode()).toBe(500)
  })
})
