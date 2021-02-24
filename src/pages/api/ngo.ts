import { NextApiRequest, NextApiResponse } from 'next'
import { AutoformResponseBody } from '../../types/api'
import Fuse from 'fuse.js'

const dataUrl =
  'https://pfseform.financnasprava.sk/Formulare/eFormVzor/DP/form.451.prijimatelia_2020.html'
const maxCacheAgeInMinutes = 15

type CachedData = Partial<AutoformResponseBody>

interface Cache {
  data: Fuse<CachedData>
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

const formatNgoData = (rawArray: string[][]): CachedData[] => {
  return rawArray.map(
    (
      [pravnaForma, name, cin, streetAndNumber, municipality, postal_code],
      id,
    ) => {
      const parsedStreet = streetAndNumber
        .trim()
        .match(/^(.*)\s([\d+/]+[A-Za-z]?)$/)

      return {
        id,
        cin,
        name,
        street: parsedStreet ? parsedStreet[1] : streetAndNumber,
        street_number: parsedStreet ? parsedStreet[2] : '',
        formatted_address: `${streetAndNumber}, ${postal_code} ${municipality}`,
        postal_code,
        municipality,
        legal_form: pravnaForma,
      }
    },
  )
}

const fuseOptions = {
  shouldSort: true,
  includeScore: true,
  threshold: 0.4,
  location: 30,
  distance: 100,
  minMatchCharLength: 2,
  keys: ['name', 'municipality'],
}

const getNgoData = async (): Promise<Fuse<CachedData>> => {
  const cacheExpireTime = Date.now() - maxCacheAgeInMinutes * 60 * 1000

  if (!cache.time || cache.time < cacheExpireTime) {
    const response = await fetch(dataUrl)
    const rawArray = parseDataFromHtml(await response.text())
    const data = formatNgoData(rawArray)
    cache = {
      data: new Fuse(data, fuseOptions),
      time: Date.now(),
    }
  }

  return cache.data
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const name = decodeURIComponent(`${req.query.name}`)

  let data: Fuse<CachedData>
  try {
    data = await getNgoData()
  } catch (error) {
    console.log(error)
    res.statusCode = 500
    return res.json({ error: 'unable to fetch data from financnasprava.sk' })
  }

  const filtered = data
    .search(name)
    .map(({ item }) => item)
    .slice(0, 20)

  res.statusCode = 200
  res.json(filtered)
}
