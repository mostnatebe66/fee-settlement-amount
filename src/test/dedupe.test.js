import { dedupeByClaimId } from '../services/dedupe.js';
import { describe, it, expect } from '@jest/globals';

describe('dedupeByClaimId', () => {
  const rows = [
    { id: '1', name: 'Alice', claim_id: '123456789', fee_amount: '100', date: '2025-09-01' },
    { id: '2', name: 'Alice', claim_id: '123456789', fee_amount: '100', date: '2025-09-05' },
    { id: '3', name: 'Bob',   claim_id: '987654321', fee_amount: '50',  date: '2025-08-30' }
  ];

  it('keeps the latest date per claim_id', () => {
    const out = dedupeByClaimId(rows);
    expect(out.length).toBe(2);
    const alice = out.find(r => r.claim_id === '123456789');
    expect(alice.id).toBe('2');
  });

  it('throws on invalid claim_id', () => {
    const bad = [{ ...rows[0], claim_id: 'ABC' }];
    expect(() => dedupeByClaimId(bad)).toThrow(/Invalid claim_id/);
  });
});
