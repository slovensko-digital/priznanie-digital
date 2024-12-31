import { UrokyUserInput } from '../types/PageUserInputs'
import { TAX_YEAR, UROKY_POCET_ROKOV } from './calculation'

export const validateUrokyBonusForm = (
  values: UrokyUserInput,
  step = null,
): boolean => {
  const step0 = true // first step is not validated

  const step1 = values.uroky_dalsi_uver_uplatnuje === false

  const rok_uzatvorenia = Number.parseInt(
    values.uroky_zmluva_rok_uzatvorenia,
    10,
  )
  // const mesiac_uzatvorenia = Number.parseInt(
  //   values.uroky_zmluva_mesiac_uzatvorenia,
  //   10,
  // )
  // const den_uzatvorenia = Number.parseInt(
  //   values.uroky_zmluva_den_uzatvorenia,
  //   10,
  // )

  const den_urocenia = Number.parseInt(values.uroky_zaciatok_urocenia_den, 10)
  const mesiac_urocenia = Number.parseInt(
    values.uroky_zaciatok_urocenia_mesiac,
    10,
  )
  const rok_urocenia = Number.parseInt(values.uroky_zaciatok_urocenia_rok, 10)

  const zaciatok_urocenia = new Date(
    rok_urocenia,
    mesiac_urocenia - 1,
    den_urocenia,
  )
  // const datum_uzatvorenia = new Date(
  //   rok_uzatvorenia,
  //   mesiac_uzatvorenia - 1,
  //   den_uzatvorenia,
  // )
  const limit_zaciatku = new Date(TAX_YEAR - UROKY_POCET_ROKOV, 0, 1)

  const step2 =
    zaciatok_urocenia >= limit_zaciatku &&
    rok_uzatvorenia >= TAX_YEAR - UROKY_POCET_ROKOV
  // datum_uzatvorenia <= zaciatok_urocenia // TODO: add error message

  const step3 = true

  const step4 = values.uroky_splnam_vek_kriteria === true

  const step5 = values.uroky_splnam_prijem === true

  const steps = [step0, step1, step2, step3, step4, step5]

  if (step !== null) {
    return steps[step - 1] // return value for given step
  }

  return steps.every((value) => value === true) // validate for all steps
}
