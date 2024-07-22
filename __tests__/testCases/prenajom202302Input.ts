import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { case202301Input } from './case202301Input'

export const prenajom202302Input: E2eTestUserInput = {
  ...case202301Input,
  rent: true,
  vyskaPrijmovZPrenajmu: '50500',
  vydavkyZPrenajmu: '3400',
  prenajomPrijemZPrilezitostnejCinnosti: false,
  expectNgoDonationValue: true,
  percent2: '161,47',
}
