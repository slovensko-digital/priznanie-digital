import { E2eTestUserInput } from "../../src/types/E2eTestUserInput";
import { case202301Input } from "./case202301Input";

export const prenajom202307Input: E2eTestUserInput = {
  ...case202301Input,
  rent: true,
  vyskaPrijmovZPrenajmu: "50500",
  vydavkyZPrenajmu: "3400",
  prenajomPrijemZPrilezitostnejCinnosti: true,
  vyskaOslobodenia: "0",
  expectNgoDonationValue: true,
  percent2: "157,01",
};
