export function capitalize(value?: string) {
  if (typeof value === 'string' && value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  return '';
}
