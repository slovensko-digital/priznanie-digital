import React, { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import Fuse from 'fuse.js'
import { getNace } from '../lib/api'
import styles from './Nace.module.css'
import { AutoCompleteInput } from '../plugins/_components/form/AutoCompleteInput'

const options = {
  shouldSort: true,
  includeScore: true,
  threshold: 0.4,
  location: 30,
  distance: 100,
  minMatchCharLength: 2,
  keys: ['code', 'label', 'translit'],
}

function useFuse<T>(data: T[]): Fuse<T> {
  const fuseRef = useRef(new Fuse(data, options))

  useEffect(() => {
    fuseRef.current = new Fuse(data, options)
  }, [data])

  return fuseRef.current
}

interface Nace {
  code: string
  label: string
}

const formatNace = (nace: Fuse.FuseResult<Nace>) => ({
  id: nace?.item?.code,
  value: `${nace?.item?.code} - ${nace?.item?.label}`,
})

export const Nace: React.FC = () => {
  const [naceData, setNaceData] = useState<Nace[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const fuse = useFuse(naceData)

  const fetchData = async () => {
    setIsLoading(true)
    const result: Nace[] = await getNace()
    setNaceData(result)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const searchNace = (value) => {
    const searchResult = fuse.search(value)
    return searchResult.length === 0
      ? naceData.map((item) => ({ item, score: 1, refIndex: 0 }))
      : searchResult
  }

  return (
    <div
      className={classnames([
        'govuk-form-group',
        isLoading ? [styles.autocompleteFieldLoading] : '',
        styles.relative,
        styles.autocompleteField,
      ])}
    >
      <AutoCompleteInput
        name="r003_nace"
        label="NACE"
        minLength={0}
        fetchData={async (value) => {
          const data = searchNace(value) as Fuse.FuseResult<Nace>[]
          return data.map((nace) => formatNace(nace))
        }}
      />
    </div>
  )
}
