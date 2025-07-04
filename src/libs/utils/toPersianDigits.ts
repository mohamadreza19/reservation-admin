// utils/toPersianDigits.ts
export function toPersianDigits(str: string | number, separate = true): string {
  const transformed = String(str).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

  if (separate) return separateDigits(transformed);

  return transformed;
}

export function separateDigits(str: string, separator = ","): string {
  const chars = [...str];
  const result = [];

  for (let i = chars.length; i > 0; i -= 3) {
    const start = Math.max(i - 3, 0);
    result.unshift(chars.slice(start, i).join(""));
  }

  return result.join(separator);
}
