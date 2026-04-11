export function parseJSON(value: string): unknown {
  return JSON.parse(value);
}

export function prettyPrintJSON(value: string): string {
  const parsed = JSON.parse(value);
  return JSON.stringify(parsed, null, 2);
}

export function minifyJSON(value: string): string {
  const parsed = JSON.parse(value);
  return JSON.stringify(parsed);
}