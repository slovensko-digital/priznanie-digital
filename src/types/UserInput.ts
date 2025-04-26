import { TaxFormUserInput } from "./TaxFormUserInput";
import { PostponeUserInput } from "./PostponeUserInput";

export interface FeedbackFormInput {
  whatWereYouDoing: string;
  whatWentWrong: string;
  email: string;
  saving?: string;
}

export type UserInput = TaxFormUserInput &
  PostponeUserInput &
  FeedbackFormInput;
