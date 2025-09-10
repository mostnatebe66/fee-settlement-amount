import { parseDateSafe } from '../utils/helpers.js';
import { isValidClaimId } from '../utils/validate.js';

export function dedupeByClaimId(rows) {
  const required = ['id', 'name', 'claim_id', 'fee_amount', 'date'];
  const missing = required.filter(h => !(h in (rows[0] || {})));
  if (missing.length) {
    throw new Error(`Missing required headers: ${missing.join(', ')}`);
  }

  const byClaim = new Map();

  rows.forEach((row, idx) => {
    const claimId = row.claim_id;

    if (!isValidClaimId(claimId)) {
      throw new Error(
        `Invalid claim_id "${claimId}" at row ${idx + 2}. Must be a 9-digit number.`
      );
    }

    const ts = parseDateSafe(row.date);
    const prev = byClaim.get(claimId);

    if (!prev) {
      byClaim.set(claimId, { row, ts, pos: idx });
      return;
    }

    const prevValid = prev.ts !== null;
    const currValid = ts !== null;
    let replace = false;

    if (prevValid && currValid) {
        replace = ts > prev.ts;}      
    else if (!prevValid && currValid){ 
        replace = true;             
    }
    else if (!prevValid && !currValid) {
        replace = idx > prev.pos;
    }

    if (replace) {
        byClaim.set(claimId, { row, ts, pos: idx })
    };
  });

  return Array.from(byClaim.values()).map(v => v.row);
}
