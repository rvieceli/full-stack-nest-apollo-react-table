export function isTupleOfNumbers(
  value: unknown,
): value is [number | undefined, number | undefined] {
  if (!Array.isArray(value)) return false;

  if (value.length !== 2) return false;

  if (value !== undefined && typeof value[0] !== 'number') return false;

  if (value !== undefined && typeof value[1] !== 'number') return false;

  return true;
}
