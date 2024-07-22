import { TAX_YEAR } from '../../src/lib/calculation'
import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { case202301Input } from './case202301Input'
import { urokyEligibleInput } from './urokyEligibleInput'

export const uroky202306Input: E2eTestUserInput = {
  ...case202301Input,
  ...urokyEligibleInput,
  t1r10_prijmy: '43351.93',
  partner_bonus_na_deti: false,
  r035_uplatnuje_uroky: true,
  uroky_rok_uzatvorenia: TAX_YEAR.toString(),
  uroky_zaciatok_urocenia_den: '21',
  uroky_zaciatok_urocenia_mesiac: '8',
  uroky_zaciatok_urocenia_rok: TAX_YEAR.toString(),
  uroky_dalsi_dlznik: true,
  uroky_pocet_dlznikov: '2',
  r035_zaplatene_uroky: '347.77',
  expectNgoDonationValue: true,
  percent2: '4,40',
}
