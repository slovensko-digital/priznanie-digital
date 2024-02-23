import { TAX_YEAR } from '../../src/lib/calculation'
import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { case202304Input } from './case202304Input'

export const uroky202304cInput: E2eTestUserInput = {
  ...case202304Input,
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: TAX_YEAR.toString(),
  uroky_zaciatok_urocenia_den: '21',
  uroky_zaciatok_urocenia_mesiac: '8',
  uroky_zaciatok_urocenia_rok: TAX_YEAR.toString(),
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: '2',
  r035_zaplatene_uroky: '987.65',
  percent2: '197,71'
}
