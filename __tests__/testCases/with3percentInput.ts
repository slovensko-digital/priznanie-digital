import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'
import { with2percentInput } from './with2percentInput'

export const with3percentInput: TaxFormUserInput = {
  splnam3per: true,
  ...with2percentInput,
}
