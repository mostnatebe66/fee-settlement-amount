import fs from 'fs';
import { parse } from 'csv-parse';

export async function parseCsvFile(filePath) {
  const stream = fs.createReadStream(filePath, 'utf8');
  return new Promise((resolve, reject) => {
    const rows = [];
    stream
      .pipe(parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
        relax_column_count_more: true,
        relax_column_count_less: true,
        relax_quotes: true
      }))
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', reject);
  });
}
