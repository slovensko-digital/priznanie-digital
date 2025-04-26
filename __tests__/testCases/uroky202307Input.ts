import { TAX_YEAR, UROKY_POCET_ROKOV } from "../../src/lib/calculation";
import { E2eTestUserInput } from "../../src/types/E2eTestUserInput";
import { case202301Input } from "./case202301Input";
import { urokyEligibleInput } from "./urokyEligibleInput";

export const uroky202307Input: E2eTestUserInput = {
  ...case202301Input,
  ...urokyEligibleInput,
  partner_bonus_na_deti: false,
  r035_uplatnuje_uroky: true,
  uroky_zmluva_rok_uzatvorenia: `${TAX_YEAR - UROKY_POCET_ROKOV}`,
  uroky_zmluva_mesiac_uzatvorenia: "3",
  uroky_zmluva_den_uzatvorenia: "1",
  uroky_zaciatok_urocenia_den: "26",
  uroky_zaciatok_urocenia_mesiac: "5",
  uroky_zaciatok_urocenia_rok: `${TAX_YEAR - UROKY_POCET_ROKOV}`,
  uroky_dalsi_dlznik: false,
  r035_zaplatene_uroky: "698",
};
