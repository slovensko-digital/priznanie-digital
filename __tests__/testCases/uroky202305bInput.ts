import { TAX_YEAR, UROKY_POCET_ROKOV } from '../../src/lib/calculation'
import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { case202305Input } from './case202305Input'
import { urokyEligibleInput } from './urokyEligibleInput'

export const uroky202305bInput: E2eTestUserInput = {
  ...case202305Input,
  ...urokyEligibleInput,
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: (TAX_YEAR - UROKY_POCET_ROKOV).toString(),
  uroky_zaciatok_urocenia_den: '21',
  uroky_zaciatok_urocenia_mesiac: '8',
  uroky_zaciatok_urocenia_rok: (TAX_YEAR - UROKY_POCET_ROKOV).toString(),
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: '2',
  r035_zaplatene_uroky: '987.65',
}
