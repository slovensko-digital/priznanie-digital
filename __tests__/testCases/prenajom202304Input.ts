import { E2eTestUserInput } from "../../src/types/E2eTestUserInput";
import { case202303Input } from "./case202303Input";

export const prenajom202304Input: E2eTestUserInput = {
  ...case202303Input,
  rent: true,
  vyskaPrijmovZPrenajmu: "9350",
  vydavkyZPrenajmu: "5687",
  prenajomPrijemZPrilezitostnejCinnosti: false,
  expectNgoDonationValue: true,
  percent2: "4,82",
  dohoda: false,
};
