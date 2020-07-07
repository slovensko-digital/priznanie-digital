import { NextApiRequest, NextApiResponse } from 'next'
import { AutoformResponseBody } from '../../types/api'

const dataUrl =
  'https://pfseform.financnasprava.sk/Formulare/eFormVzor/DP/form.451.prijimatelia_2020.html'
const limit = 20
const maxCacheAgeInMinutes = 15

type CachedData = Partial<AutoformResponseBody>[]

interface Cache {
  data: CachedData
  time: number
}

let cache: Cache = {
  data: null,
  time: null,
}

const parseDataFromHtml = (rawHtml) => {
  const start = rawHtml.indexOf(
    '<script type="text/javascript" charset="UTF-8">',
  )
  const end = rawHtml.indexOf('</script>', start)
  const script = rawHtml.slice(start, end)
  const parsed = script.match(/var data = (.*]]);/)

  if (!parsed) {
    throw new Error('Error parsing data')
  }

  return JSON.parse(parsed[1])
}

const formatNgoData = (rawArray: string[][]): CachedData => {
  return rawArray.map(
    (
      [_pravnaForma, name, cin, streetAndNumber, municipality, postal_code],
      id,
    ) => {
      const parsedStreet = streetAndNumber.match(/^(.*)\s([\d+/]+)$/)

      return {
        id,
        cin,
        name,
        street: parsedStreet ? parsedStreet[1] : streetAndNumber,
        street_number: parsedStreet ? parsedStreet[2] : '',
        formatted_address: `${streetAndNumber}, ${postal_code} ${municipality}`,
        postal_code,
        municipality,
      }
    },
  )
}

const getNgoData = async (): Promise<CachedData> => {
  const cacheExpireTime = Date.now() - maxCacheAgeInMinutes * 60 * 1000

  if (!cache.time || cache.time < cacheExpireTime) {
    const response = await fetch(dataUrl)
    const rawArray = parseDataFromHtml(await response.text())
    const data = formatNgoData(rawArray)
    cache = {
      data,
      time: Date.now(),
    }
  }

  return cache.data
}

const filterNgoData = (data: CachedData, search: string) => {
  return data
    .filter((item) => item.name.match(new RegExp(search, 'i')))
    .slice(0, limit)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const name = encodeURI(`${req.query.name}`)

  let data: CachedData
  try {
    data = await getNgoData()
  } catch (error) {
    console.log(error)
    res.statusCode = 500
    return res.json({ error: 'unable to fetch data from financnasprava.sk' })
  }

  const filtered = filterNgoData(data, name)

  res.statusCode = 200
  res.json(filtered)
}
