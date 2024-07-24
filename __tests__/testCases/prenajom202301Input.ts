import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { case202301Input } from './case202301Input'

export const prenajom202301Input: E2eTestUserInput = {
  ...case202301Input,
  rent: true,
  vyskaPrijmovZPrenajmu: '7500',
  vydavkyZPrenajmu: '3430',
  prenajomPrijemZPrilezitostnejCinnosti: true,
  vyskaOslobodenia: '167',
}
