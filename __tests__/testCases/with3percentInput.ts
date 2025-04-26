import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { with2percentInput } from './with2percentInput'

export const with3percentInput: E2eTestUserInput = {
  ...with2percentInput,
  splnam3per: true,
}
