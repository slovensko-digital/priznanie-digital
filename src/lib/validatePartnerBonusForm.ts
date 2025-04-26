import { PartnerUserInput } from '../types/PageUserInputs'
import { parseInputNumber } from './utils'
import { PARTNER_MAX_ODPOCET } from './calculation'

export const validatePartnerBonusForm = (
  values: PartnerUserInput,
  step = null,
): boolean => {
  const step0 = true // first step is not validated

  const step1 = values.partner_spolocna_domacnost === true

  const step2 =
    values.partner_podmienky &&
    Object.keys(values.partner_podmienky)
      .map((key) => values.partner_podmienky[key][0])
      .includes("on")

  const step3 =
    values.r032_partner_vlastne_prijmy !== '' &&
    parseInputNumber(values.r032_partner_vlastne_prijmy) < PARTNER_MAX_ODPOCET

  const step4 = true

  const steps = [step0, step1, step2, step3, step4]

  if (step !== null) {
    return steps[step - 1] // return value for given step
  }

  return steps.every((value) => value === true) // validate for all steps
}
