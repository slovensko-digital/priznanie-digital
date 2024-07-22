import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { withEmploymentInput } from './withEmploymentInput'

export const employmentWrongChildBonusInput: E2eTestUserInput = {
  ...withEmploymentInput,
  udajeODanovomBonuseNaDieta: '3000',
}
