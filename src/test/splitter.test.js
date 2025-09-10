import { splitFees } from '../services/splitter.js';
import { describe, it, expect } from '@jest/globals';

describe('splitter', () => {
  it('splits into 10/40/50 with remainder to client', () => {
    const rows = [
      { id: '1', name: 'X', claim_id: '111222333', fee_amount: '100.01', date: '2025-09-01' }
    ];
    const [header, data] = splitFees(rows);
    expect(header).toContain('firm_amount');
    expect(data[4]).toBe('100.01'); // fee_amount
    expect(data[5]).toBe('10.00');  // firm
    expect(data[6]).toBe('40.00');  // third
    expect(data[7]).toBe('50.01');  // client
  });
});
