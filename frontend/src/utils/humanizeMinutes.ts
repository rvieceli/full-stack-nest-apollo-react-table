export function humanizeMinutes(minutes: number) {
  const min = Math.floor(minutes / 60);
  const seconds = (minutes % 60).toString().padStart(2, '0');

  return `${min}:${seconds}`;
}
