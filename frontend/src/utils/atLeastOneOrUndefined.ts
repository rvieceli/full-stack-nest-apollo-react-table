export function atLeastOneOrUndefined(str?: string | null) {
  if (!str) return undefined;

  return str.trim().length > 0 ? str.trim() : undefined;
}
