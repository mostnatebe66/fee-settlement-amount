export function todayDDMMYYYY() {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = String(now.getFullYear());
  return `${dd}${mm}${yyyy}`;
}

export function parseDateSafe(d) {
  const ts = Date.parse(d);
  return Number.isFinite(ts) ? ts : null;
}

export function toCents(x) {
  if (x == null || x === '') return 0;
  const n = Number(String(x).replace(/[$,\s]/g, ''));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

export function centsToDollars(c) {
  return (c / 100).toFixed(2);
}

export function rowsToCSV(rows) {
  const esc = (s) => {
    const str = s == null ? '' : String(s);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  return rows.map(cols => cols.map(esc).join(',')).join('\n') + '\n';
}
