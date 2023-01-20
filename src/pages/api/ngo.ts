import { NextApiRequest, NextApiResponse } from 'next'
import { AutoFormSubject } from '../../types/api'
import Fuse from 'fuse.js'
import ngos from '../../../public/ngos.json'

const maxCacheAgeInMinutes = 15

type CachedData = Partial<AutoFormSubject>

interface Cache {
  data: Fuse<CachedData>
  time: number
}

let cache: Cache = {
  data: null,
  time: null,
}

const formatNgoData = (rawArray: string[][]): CachedData[] => {
  // ["ICO_org","nazov_org","mesto_sidla_org" ],
  return rawArray.map(([cin, name, municipality]) => {
    return {
      cin,
      name,
      municipality,
    }
  })
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
    const rawArray = ngos
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
