import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { with2percentInput } from './with2percentInput'

export const with3percentOtherInput: E2eTestUserInput = {
  ...with2percentInput,
  dve_percenta_podporujem: 'ano-inu',
  r142_ico: '50158635',
  r142_obchMeno: 'Slovensko.Digital',
  splnam3per: true,
}
