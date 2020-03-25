import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useField } from 'formik';
import styles from './FullNameAutoCompleteInput.module.css';
import { Input } from './FormComponents';
import { getAutoformByPersonName } from '../lib/api';
import { AutoformResponseBody } from '../types/api';

export interface FullNameAutoCompleteInput {
  handlePersonAutoform: (person: AutoformResponseBody) => void;
}
export const FullNameAutoCompleteInput = ({
  handlePersonAutoform,
}: FullNameAutoCompleteInput) => {
  const [autoformPersons, setAutoFormPersons] = useState<
    AutoformResponseBody[]
  >([]);
  const autocompleteList = useRef(null);
  const [isLoadingAutoform, setIsLoadingAutoform] = useState<boolean>(false);
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const [
    autocompleteDebounceTimeout,
    setAutocompleteDebounceTimeout,
  ] = useState<number>(null);
  const [autocompleteBlurTimeout, setAutocompleteBlurTimeout] = useState<
    number
  >(null);
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number>(-1);
  const [field] = useField('meno_priezvisko');

  const handleAutoform = async (name: string) => {
    if (name.length > 2) {
      setIsLoadingAutoform(true);
      const personsData = await getAutoformByPersonName(name);
      if (personsData) {
        setAutoFormPersons(personsData);
      }
      setIsLoadingAutoform(false);
    }
  };

  const debounceAutoform = (name: string) => {
    clearTimeout(autocompleteDebounceTimeout);
    const timeout = window.setTimeout(() => {
      handleAutoform(name);
    }, 500);
    setAutocompleteDebounceTimeout(timeout);
  };

  const handleAutocompleteInputFocus = async () => {
    clearTimeout(autocompleteBlurTimeout);
    await setShowAutocomplete(true);
    handleScroll();
  };

  const handleAutocompleteInputBlur = (event) => {
    const timeout = window.setTimeout(() => {
      setShowAutocomplete(false);
    }, 250);
    setAutocompleteBlurTimeout(timeout);
    field.onBlur(event);
  };

  const getNextNavigationIndex = () => {
    return selectedPersonIndex === autoformPersons.length - 1
      ? 0
      : selectedPersonIndex + 1;
  };

  const getPreviousNavigationIndex = () => {
    return selectedPersonIndex === 0
      ? autoformPersons.length - 1
      : selectedPersonIndex - 1;
  };

  const handleScroll = () => {
    if (autocompleteList.current) {
      const focusedElement: HTMLElement = document.querySelector(
        '.autocomplete__option--focused',
      );
      const top = focusedElement && focusedElement.offsetTop;

      const scrollDown = top - 260;
      const scrollUp = top - 40;

      if (autocompleteList.current.scrollTop < scrollDown) {
        autocompleteList.current.scrollTop = scrollDown;
      } else if (autocompleteList.current.scrollTop > scrollUp) {
        autocompleteList.current.scrollTop = scrollUp;
      }
    }
  };

  const handleArrowNavigation = async (event) => {
    if (
      !showAutocomplete &&
      (event.key === 'ArrowDown' || event.key === 'ArrowUp')
    ) {
      await setShowAutocomplete(true);
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      await setSelectedPersonIndex(getNextNavigationIndex());
      handleScroll();
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      await setSelectedPersonIndex(getPreviousNavigationIndex());
      handleScroll();
      event.preventDefault();
    } else if (event.key === 'Escape') {
      setShowAutocomplete(false);
      event.preventDefault();
    } else if (event.key === 'Enter' && selectedPersonIndex > -1) {
      handlePersonAutoform(autoformPersons[selectedPersonIndex]);
      setShowAutocomplete(false);
      event.preventDefault();
    }
  };

  return (
    <>
      <div className={styles.autocompleteFieldWrapper}>
        <Input
          {...field}
          name="meno_priezvisko"
          type="text"
          label="Meno a priezvisko"
          width="auto"
          autoComplete="12iubu312b3"
          className={isLoadingAutoform ? styles.autocompleteFieldLoading : ''}
          onChange={(event) => {
            field.onChange(event);
            debounceAutoform(event.currentTarget.value);
          }}
          onClick={handleAutocompleteInputFocus}
          onFocus={handleAutocompleteInputFocus}
          onBlur={handleAutocompleteInputBlur}
          onKeyDown={handleArrowNavigation}
        />
      </div>
      {showAutocomplete && autoformPersons.length > 0 && (
        <div className={styles.autocompleteWrapper}>
          <ul
            className="govuk-list govuk-list--number autocomplete__menu"
            style={{ position: 'absolute', zIndex: 100 }}
            ref={autocompleteList}
          >
            {autoformPersons.map((person, index) => (
              <li
                key={person.id}
                className={classNames('autocomplete__option', {
                  'autocomplete__option--focused':
                    selectedPersonIndex === index,
                })}
                onClick={() => {
                  handlePersonAutoform(person);
                  setSelectedPersonIndex(-1);
                }}
                onMouseOver={() => {
                  setSelectedPersonIndex(index);
                }}
                onFocus={() => {
                  setSelectedPersonIndex(index);
                }}
              >
                {person.name} : {person.formatted_address}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.autocompleteFieldSpacer} />
    </>
  );
};
