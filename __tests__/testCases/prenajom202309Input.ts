import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { case202301Input } from './case202301Input'

export const prenajom202309Input: E2eTestUserInput = {
  ...case202301Input,
  rent: true,
  vyskaPrijmovZPrenajmu: '417,38',
  vydavkyZPrenajmu: '1531,75',
  prenajomPrijemZPrilezitostnejCinnosti: true,
  vyskaOslobodenia: '450'
}
