import { E2eTestUserInput } from '../../src/plugins/_shared/testing/E2eTestUserInput'
import { with2percentInput } from './with2percentInput'

export const with3percentInput: E2eTestUserInput = {
  splnam3per: true,
  ...with2percentInput,
}
