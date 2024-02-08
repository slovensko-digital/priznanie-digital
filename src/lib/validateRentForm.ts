import { RentUserInput } from '../types/PageUserInputs'
//import { parseInputNumber } from './utils'

export const validateRentForm = (
  values: RentUserInput,
  step = null,
): boolean => {
  const step1 = true // first step is not validated

  const step2 = true

  const step3 = true

  const step4 = true

  const step5 = true

  const step6 = true

  const steps = [step1, step2, step3, step4, step5, step6]

  if (step !== null) {
    return steps[step - 1] // return value for given step
  }

  return steps.every((value) => value === true) // validate for all steps
}
