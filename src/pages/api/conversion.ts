import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import { RollbarInstance } from '../../lib/rollbar'
import { ConversionType, isValidClickId } from '../../lib/conversion'

// Must match the conversion action names configured in Google Ads
const CONVERSION_NAMES: Record<ConversionType, string> = {
  priznanie: 'priznanie',
  odklad: 'odklad',
}

const TIME_ZONE = 'Europe/Bratislava'

const CSV_HEADER = [
  `Parameters:TimeZone=${TIME_ZONE},,,,,,`,
  'Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency,Ad User Data,Ad Personalization',
].join('\n')

// Google Ads expects "yyyy-MM-dd HH:mm:ss" in the time zone from the header
const formatConversionTime = (date: Date): string =>
  new Intl.DateTimeFormat('sv-SE', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)

const ensureFileWithHeader = (filePath: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  try {
    fs.writeFileSync(filePath, `${CSV_HEADER}\n`, { flag: 'wx' })
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error
    }
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body
  const { gclid, type } = body || {}

  if (!isValidClickId(gclid) || !Object.hasOwn(CONVERSION_NAMES, type)) {
    return res.status(400).json({ error: 'Invalid conversion data' })
  }

  const filePath = process.env.CONVERSION_IMPORT_FILEPATH
  if (!filePath) {
    RollbarInstance.error('CONVERSION_IMPORT_FILEPATH env variable is not set')
    return res
      .status(500)
      .json({ error: 'Conversion import file path is not configured' })
  }

  // Users only get here after granting ad measurement consent, which covers
  // sending their data to Google Ads but not ad personalization
  const row = [
    gclid,
    CONVERSION_NAMES[type as ConversionType],
    formatConversionTime(new Date()),
    '',
    '',
    'Granted',
    'Denied',
  ].join(',')

  try {
    ensureFileWithHeader(filePath)
    fs.appendFileSync(filePath, `${row}\n`)
    res.status(204).end()
  } catch (error) {
    RollbarInstance.error(
      `Failed to write conversion import file at ${filePath}`,
      error,
    )
    res.status(500).json({ error: 'Failed to record conversion' })
  }
}

const safeParse = (value: string) => {
  try {
    return JSON.parse(value)
  } catch (_error) {
    return null
  }
}
