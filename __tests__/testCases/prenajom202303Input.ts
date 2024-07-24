import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'
import { case202301Input } from './case202301Input'
import { case202302Input } from './case202302Input'

export const prenajom202303Input: E2eTestUserInput = {
  ...case202302Input,
  children: case202301Input.children,
  rent: true,
  vyskaPrijmovZPrenajmu: '8755',
  vydavkyZPrenajmu: '4325',
  prenajomPrijemZPrilezitostnejCinnosti: true,
  vyskaOslobodenia: '350',
}
