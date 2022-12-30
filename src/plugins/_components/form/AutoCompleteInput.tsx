import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import { useField } from 'formik'
import styles from './AutoCompleteInput.module.css'
import { Input } from './FormComponents'
import { UserInput } from '../../../types/UserInput'

export interface AutoCompleteData extends Record<string, any> {
  id: number | string
  value: string
}

export interface AutoCompleteInputProps {
  name: keyof UserInput
  label: string
  fetchData: (value: string) => Promise<AutoCompleteData[]>
  onSelect?: (data: AutoCompleteData) => void
  minLength?: number
}
export const AutoCompleteInput = ({
  name,
  label,
  onSelect,
  fetchData,
  minLength = 2,
}: AutoCompleteInputProps) => {
  const [autocompleteData, setAutocompleteData] = useState([])
  const autocompleteList = useRef(null)
  const [isLoadingAutoform, setIsLoadingAutoform] = useState<boolean>(false)
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)
  const [autocompleteDebounceTimeout, setAutocompleteDebounceTimeout] =
    useState<number>(null)
  const [autocompleteBlurTimeout, setAutocompleteBlurTimeout] =
    useState<number>(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1)
  const field = useField(name)[0]
  const fieldHelpers = useField(name)[2]

  const onAutocompleteItemSelect = (item) => {
    fieldHelpers.setValue(item.value)
    onSelect && onSelect(item)
  }

  const handleUserInput = async (value: string) => {
    if (value.length >= minLength) {
      setIsLoadingAutoform(true)
      const data = await fetchData(value)
      if (data) {
        setAutocompleteData(data)
      }
      setIsLoadingAutoform(false)
    }
  }

  const debounceUserInput = (value: string) => {
    clearTimeout(autocompleteDebounceTimeout)
    const timeout = window.setTimeout(() => {
      handleUserInput(value)
    }, 500)
    setAutocompleteDebounceTimeout(timeout)
  }

  const handleAutocompleteInputFocus = async ({ currentTarget: { value } }) => {
    clearTimeout(autocompleteBlurTimeout)
    await setShowAutocomplete(true)
    handleScroll()

    if (autocompleteData.length === 0) {
      handleUserInput(value)
    }
  }

  const handleAutocompleteInputBlur = (event) => {
    const timeout = window.setTimeout(() => {
      setShowAutocomplete(false)
    }, 250)
    setAutocompleteBlurTimeout(timeout)
    field.onBlur(event)
  }

  const getNextNavigationIndex = () => {
    return selectedItemIndex === autocompleteData.length - 1
      ? 0
      : selectedItemIndex + 1
  }

  const getPreviousNavigationIndex = () => {
    return selectedItemIndex === 0
      ? autocompleteData.length - 1
      : selectedItemIndex - 1
  }

  const handleScroll = () => {
    if (autocompleteList.current) {
      const focusedElement: HTMLElement = document.querySelector(
        '.autocomplete__option--focused',
      )
      const top = focusedElement && focusedElement.offsetTop

      const scrollDown = top - 260
      const scrollUp = top - 40

      if (autocompleteList.current.scrollTop < scrollDown) {
        autocompleteList.current.scrollTop = scrollDown
      } else if (autocompleteList.current.scrollTop > scrollUp) {
        autocompleteList.current.scrollTop = scrollUp
      }
    }
  }

  const handleArrowNavigation = async (event) => {
    if (
      !showAutocomplete &&
      (event.key === 'ArrowDown' || event.key === 'ArrowUp')
    ) {
      await setShowAutocomplete(true)
      event.preventDefault()
    } else if (event.key === 'ArrowDown') {
      await setSelectedItemIndex(getNextNavigationIndex())
      handleScroll()
      event.preventDefault()
    } else if (event.key === 'ArrowUp') {
      await setSelectedItemIndex(getPreviousNavigationIndex())
      handleScroll()
      event.preventDefault()
    } else if (event.key === 'Escape') {
      setShowAutocomplete(false)
      event.preventDefault()
    } else if (event.key === 'Enter' && selectedItemIndex > -1) {
      onAutocompleteItemSelect(autocompleteData[selectedItemIndex])
      setShowAutocomplete(false)
      event.preventDefault()
    }
  }

  return (
    <>
      <div className={styles.autocompleteFieldWrapper}>
        <Input
          {...field}
          name={name}
          type="text"
          label={label}
          width="auto"
          autoComplete="off"
          className={isLoadingAutoform ? styles.autocompleteFieldLoading : ''}
          onChange={({ currentTarget: { value } }) => {
            fieldHelpers.setValue(value)
            debounceUserInput(value)
          }}
          onClick={handleAutocompleteInputFocus}
          onFocus={handleAutocompleteInputFocus}
          onBlur={handleAutocompleteInputBlur}
          onKeyDown={handleArrowNavigation}
        />
      </div>
      {showAutocomplete && autocompleteData.length > 0 && (
        <div className={styles.autocompleteWrapper}>
          <ul
            className="govuk-list govuk-list--number autocomplete__menu"
            style={{ position: 'absolute', zIndex: 100 }}
            ref={autocompleteList}
          >
            {autocompleteData.map((item, index) => (
              <li
                key={item.id}
                className={classNames('autocomplete__option', {
                  'autocomplete__option--focused': selectedItemIndex === index,
                })}
                onClick={() => {
                  onAutocompleteItemSelect(item)
                  setSelectedItemIndex(-1)
                }}
                onMouseOver={() => {
                  setSelectedItemIndex(index)
                }}
                onFocus={() => {
                  setSelectedItemIndex(index)
                }}
              >
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.autocompleteFieldSpacer} />
    </>
  )
}
