import { E2eTestUserInput } from "../../src/types/E2eTestUserInput";
import { case202305Input } from "./case202305Input";

export const prenajom202306Input: E2eTestUserInput = {
  ...case202305Input,
  rent: true,
  vyskaPrijmovZPrenajmu: "6984",
  vydavkyZPrenajmu: "1569",
  prenajomPrijemZPrilezitostnejCinnosti: true,
  vyskaOslobodenia: "350",
};
