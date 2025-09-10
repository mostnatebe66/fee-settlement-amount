import { toCents, centsToDollars } from '../utils/helpers.js';

export function splitFees(rows) {
  const outHeader = [
    'id',
    'name',
    'claim_id',
    'date',
    'fee_amount',
    'firm_amount',
    'third_party_amount',
    'client_amount',
  ];

  const outRows = [outHeader];

  for (const row of rows) {
    const feeCents = toCents(row.fee_amount);
    const firm = Math.floor(feeCents * 0.10);
    const third = Math.floor(feeCents * 0.40);
    let client = feeCents - firm - third; // absorb rounding remainder

    if (client < 0) client = 0;

    outRows.push([
      row.id,
      row.name,
      row.claim_id,
      row.date,
      centsToDollars(feeCents),
      centsToDollars(firm),
      centsToDollars(third),
      centsToDollars(client),
    ]);
  }

  return outRows;
}
