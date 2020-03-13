import { sortObjectKeys, formatCurrency, setDate } from '../src/lib/utils';
import { TaxFormUserInput } from '../src/types/TaxFormUserInput';

describe('utils', () => {
  describe('#sortObjectKeys', () => {
    it('should sort object by key', () => {
      expect(sortObjectKeys({ c: 1, '2': 2, b: 3, a: 4, '1': 5 })).toEqual({
        '1': 5,
        '2': 2,
        a: 4,
        b: 3,
        c: 1,
      });
    });
  });

  describe('#setDate', () => {
    it('should sort object by key', () => {
      const date = new Date(2018, 1, 3);
      expect(setDate({ children: true } as TaxFormUserInput, date)).toEqual({
        children: true,
        datum: date.toLocaleString('sk-sk'),
      });
    });
  });

  describe('#formatCurrency', () => {
    it('should format number', () => {
      expect(formatCurrency(1234.564)).toBe('1 234,56 EUR');
    });
  });
});
