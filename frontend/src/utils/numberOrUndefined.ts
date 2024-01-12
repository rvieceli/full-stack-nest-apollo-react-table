export function numberOrUndefined(str: string | null) {
  if (!str) return undefined;

  const num = Number(str);

  return isNaN(num) ? undefined : num;
}
