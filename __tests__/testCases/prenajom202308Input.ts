import { E2eTestUserInput } from "../../src/types/E2eTestUserInput";
import { case202301Input } from "./case202301Input";

export const prenajom202308Input: E2eTestUserInput = {
  ...case202301Input,
  rent: true,
  vyskaPrijmovZPrenajmu: "5537,98",
  vydavkyZPrenajmu: "3431,75",
  prenajomPrijemZPrilezitostnejCinnosti: true,
  vyskaOslobodenia: "321,19",
};
