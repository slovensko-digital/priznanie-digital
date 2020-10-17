import { exectueTestcase } from './executeCase'

describe('Cases', () => {
  ;[
    'withPension',
    'withChildren',
    'with2percent',
    'with3percent',
    'withSpa',
    'withBonus',
  ].forEach(exectueTestcase)
})
