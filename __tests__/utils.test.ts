import {
  sortObjectKeys,
  formatCurrency,
  setDate,
  formatDate,
} from '../src/lib/utils';

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
    it('should set date property to object', () => {
      const date = new Date(2018, 1, 3);
      expect(setDate({ children: true }, date)).toEqual({
        children: true,
        datum: '03.02.2018',
      });
    });
  });
  describe('#formatDate', () => {
    it('should format date case 1', () => {
      const date = new Date(2018, 1, 3);
      expect(formatDate(date)).toBe('03.02.2018');
    });
    it('should format date case 2', () => {
      const date = new Date(2020, 10, 22);
      expect(formatDate(date)).toBe('22.11.2020');
    });
  });

  describe('#formatCurrency', () => {
    it('should format number', () => {
      expect(formatCurrency(1234.564)).toBe('1 234,56 EUR');
    });
  });
});
