import { PartnerUserInput } from '../../_shared/types/PageUserInputs'
import { parseInputNumber } from '../../_shared/utils/utils'
import { PARTNER_MAX_ODPOCET } from '../../_shared/calculation/calculation'

export const validatePartnerBonusForm = (
  values: PartnerUserInput,
  step = null,
): boolean => {
  const step1 = true // first step is not validated

  const step2 = values.partner_spolocna_domacnost === true

  const step3 = values.partner_bonus_uplatneny === false

  const step4 =
    values.partner_podmienky &&
    Object.keys(values.partner_podmienky)
      .map((key) => values.partner_podmienky[key])
      .some((value) => value === true)

  const step5 =
    values.r032_partner_vlastne_prijmy !== '' &&
    parseInputNumber(values.r032_partner_vlastne_prijmy) <= PARTNER_MAX_ODPOCET

  const steps = [step1, step2, step3, step4, step5]

  if (step !== null) {
    return steps[step - 1] // return value for given step
  }

  return steps.every((value) => value === true) // validate for all steps
}
