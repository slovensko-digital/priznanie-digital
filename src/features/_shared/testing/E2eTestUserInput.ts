import { TaxFormUserInput } from '../taxform/TaxFormUserInput'

export interface E2eTestUserInput extends TaxFormUserInput {
  expectNgoDonationPage?: boolean
}
