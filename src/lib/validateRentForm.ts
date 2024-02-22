import { RentUserInput } from '../types/PageUserInputs'
import { parseInputNumber } from './utils'

//import { parseInputNumber } from './utils'

export const validateRentForm = (
  values: RentUserInput,
  step = null,
): boolean => {
  const step1 = true // first step is not validated

  const step2 = parseInputNumber(values.vyskaPrijmovZPrenajmu) > 0

  const step3 = values.prijemZPrenajmuOslobodenieDane === true

  const step4 = parseInputNumber(values.vyskaOslobodenia) < 500

  const step5 = parseInputNumber(values.vydavkyZPrenajmu) >= 0

  const step6 = values.rent_uctovnictvo_danova_evidencia === true || values.rent_uctovnictvo_jednoduche === true || values.rent_uctovnictvo_podvojne === true

  const steps = [step1, step2, step3, step4, step5, step6]

  if (step !== null) {
    return steps[step - 1] // return value for given step
  }

  return steps.every((value) => value === true) // validate for all steps
}
