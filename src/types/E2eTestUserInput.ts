import { TaxFormUserInput } from './TaxFormUserInput'

export interface E2eTestUserInput extends TaxFormUserInput {
  uroky_nesplna_datumy?: boolean
  expectNgoDonationValue?: boolean
  percent2?: string
  percent3?: string
}
