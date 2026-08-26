export function isPrecursor(entry: { year: number; era: string }) {
  if (entry.year > 0 && entry.year < 1866) return true;
  return /ballad opera|operetta/i.test(entry.era);
}

export function catalogScopeLabel(entry: { year: number; era: string }) {
  return isPrecursor(entry)
    ? "Precursor to American musical theatre"
    : "Broadway / American musical theatre";
}
