import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { case202304Input } from './case202304Input'

export const prenajom202305Input: E2eTestUserInput = {
  ...case202304Input,
  rent: true,
  vyskaPrijmovZPrenajmu: '6984',
  vydavkyZPrenajmu: '7356',
  prenajomPrijemZPrilezitostnejCinnosti: false,
  expectNgoDonationValue: true,
  percent2: '201,04',
}
