import { TAX_YEAR } from '../../src/lib/calculation'
import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { case202302Input } from './case202302Input'
import { urokyEligibleInput } from './urokyEligibleInput'

export const uroky202308Input: E2eTestUserInput = {
  ...case202302Input,
  ...urokyEligibleInput,
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: (TAX_YEAR - 3).toString(),
  uroky_zaciatok_urocenia_den: '21',
  uroky_zaciatok_urocenia_mesiac: '8',
  uroky_zaciatok_urocenia_rok: (TAX_YEAR - 3).toString(),
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: '2',
  r035_zaplatene_uroky: '387.05',
}
