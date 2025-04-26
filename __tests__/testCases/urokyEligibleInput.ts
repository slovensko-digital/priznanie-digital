import { UrokyUserInput } from "../../src/types/PageUserInputs";

type UrokyEligibleInput = Pick<
  UrokyUserInput,
  | "uroky_dalsi_uver_uplatnuje"
  | "uroky_splnam_vek_kriteria"
  | "uroky_splnam_prijem"
>;

export const urokyEligibleInput: UrokyEligibleInput = {
  uroky_dalsi_uver_uplatnuje: false,
  uroky_splnam_vek_kriteria: true,
  uroky_splnam_prijem: true,
};
