import { dedupeByClaimId } from '../services/dedupe.js';
import { splitFees } from '../services/splitter.js';
import { rowsToCSV } from '../utils/helpers.js';
import { describe, it, expect } from '@jest/globals';

describe('pipeline integration', () => {
  it('produces expected CSV output', () => {
    const input = [
      { id: '1', name: 'Alice', claim_id: '123456789', fee_amount: '1000.00', date: '2025-09-01' },
      { id: '2', name: 'Alice', claim_id: '123456789', fee_amount: '1000.00', date: '2025-09-05' },
      { id: '3', name: 'Bob',   claim_id: '987654321', fee_amount: '500.50',  date: '2025-08-30' }
    ];
    const deduped = dedupeByClaimId(input);
    const table = splitFees(deduped);
    const csv = rowsToCSV(table);

    expect(csv).toContain('id,name,claim_id,date,fee_amount,firm_amount,third_party_amount,client_amount');
    expect(csv).toContain('2,Alice,123456789,2025-09-05,1000.00,100.00,400.00,500.00');
    expect(csv).toContain('3,Bob,987654321,2025-08-30,500.50,50.05,200.20,250.25');
  });
});
