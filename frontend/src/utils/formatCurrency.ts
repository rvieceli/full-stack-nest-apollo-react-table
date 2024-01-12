export const formatCurrencyWithoutSymbol = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'EUR',
}).format;
