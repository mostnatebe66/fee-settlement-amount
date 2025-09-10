# settlement-fee-splitter

Deduplicate rows by `claim_id`, split `fee_amount` into:
- **firm_amount** (10%)
- **third_party_amount** (40%)
- **client_amount** (50%)

Outputs a file named `settlementAmountsDDMMYYYY.csv` into `data/output/`.

## Input format

CSV with headers:
- `fee_amount` can include `$` and commas.  
- If multiple rows share a `claim_id`, the row with the **latest `date`** is kept.  
  - If dates are invalid/tied, the **later row in the file** is kept.

## Quick start

```bash
npm install
node src/index.js data/input.csv
# or
npm start
