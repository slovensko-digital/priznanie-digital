import { TaxFormUserInput } from '../../taxform/TaxFormUserInput'
import { PostponeUserInput } from '../../pages/_types/PostponeUserInput'

export interface FeedbackFormInput {
  whatWereYouDoing: string
  whatWentWrong: string
  email: string
  saving?: string
}

export type UserInput = TaxFormUserInput & PostponeUserInput & FeedbackFormInput
