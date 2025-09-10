import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { parseCsvFile } from './services/parser.js';
import { dedupeByClaimId } from './services/dedupe.js';
import { splitFees } from './services/splitter.js';
import { rowsToCSV, todayDDMMYYYY } from './utils/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.error('Usage: node src/index.js <path/to/input.csv>');
    process.exit(1);
  }

  const rows = await parseCsvFile(inputPath);
  if (!rows.length) {
    console.error('Empty CSV.');
    process.exit(1);
  }

  const deduped = dedupeByClaimId(rows);
  const csvRows = splitFees(deduped);

  const outDir = path.join(__dirname, '..', 'data', 'output');
  fs.mkdirSync(outDir, { recursive: true });

  const outName = `settlementAmounts${todayDDMMYYYY()}.csv`;
  const outPath = path.join(outDir, outName);

  fs.writeFileSync(outPath, rowsToCSV(csvRows), 'utf8');
  console.log(`Wrote ${outPath} with ${csvRows.length - 1} unique claim_id rows.`);
}

main().catch((err) => {
  console.error('Failed:', err?.message || err);
  process.exit(1);
});
