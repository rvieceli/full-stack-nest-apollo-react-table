import { capitalize } from './capitalize';

export function camelCase(str: string, separator = '_') {
  const [camel, ...rest] = str.split(separator);
  return `${camel}${rest.map(capitalize).join('')}`;
}
