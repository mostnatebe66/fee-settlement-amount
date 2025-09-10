import { toCents, centsToDollars, todayDDMMYYYY, parseDateSafe } from '../utils/helpers.js';
import { isValidClaimId } from '../utils/validate.js';
import { describe, it, expect } from '@jest/globals';

describe('money utils', () => {
  it('toCents parses numbers and strings', () => {
    expect(toCents(1000)).toBe(100000);
    expect(toCents('1000')).toBe(100000);
    expect(toCents('$1,234.56')).toBe(123456);
  });

  it('toCents handles empty/null', () => {
    expect(toCents('')).toBe(0);
    expect(toCents(null)).toBe(0);
  });

  it('centsToDollars formats correctly', () => {
    expect(centsToDollars(123)).toBe('1.23');
    expect(centsToDollars(123456)).toBe('1234.56');
  });
});

describe('date utils', () => {
  it('todayDDMMYYYY returns DDMMYYYY', () => {
    expect(todayDDMMYYYY()).toMatch(/^\d{8}$/);
  });

  it('parseDateSafe returns epoch ms or null', () => {
    expect(typeof parseDateSafe('2025-09-05')).toBe('number');
    expect(parseDateSafe('bad-date')).toBeNull();
  });
});

describe('validate utils', () => {
  it('accepts 9-digit numbers', () => {
    expect(isValidClaimId('123456789')).toBe(true);
    expect(isValidClaimId(123456789)).toBe(true);
  });

  it('rejects invalid ids', () => {
    expect(isValidClaimId('123')).toBe(false);
    expect(isValidClaimId('1234567890')).toBe(false);
    expect(isValidClaimId('ABC123456')).toBe(false);
  });
});