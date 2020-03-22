import { validate } from '../src/pages/osobne-udaje';
import { testValidation } from './utils/testValidation';

describe('osobne-udaje', () => {
  describe('#validate', () => {
    testValidation(validate, [
      {
        input: {
          r001_dic: '',
          meno_priezvisko: '',
          r007_ulica: '',
          r008_cislo: '',
          psc: '',
          r010_obec: '',
          r011_stat: '',
        },
        expected: [
          'r001_dic',
          'meno_priezvisko',
          'r007_ulica',
          'r008_cislo',
          'psc',
          'r010_obec',
          'r011_stat',
        ],
      },
      {
        input: {
          r001_dic: 'foo',
          meno_priezvisko: 'Johnny Bravo',
          r007_ulica: 'Hollywood Blvd',
          r008_cislo: '9',
          psc: 'foo',
          r010_obec: 'Los Angeles',
          r011_stat: 'California',
        },
        expected: ['r001_dic', 'psc'],
      },
      {
        input: {
          r001_dic: '123123123',
          meno_priezvisko: 'Johnny Bravo',
          r007_ulica: 'Hollywood Blvd',
          r008_cislo: '9',
          psc: '841 04',
          r010_obec: 'Los Angeles',
          r011_stat: 'California',
        },
        expected: [],
      },
    ]);
  });
});
