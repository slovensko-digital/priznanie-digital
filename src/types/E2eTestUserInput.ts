import { TaxFormUserInput } from './TaxFormUserInput'

export interface E2eTestUserInput extends TaxFormUserInput {
  expectNgoDonationValue?: boolean
  percent2?: string
  percent3?: string
}
