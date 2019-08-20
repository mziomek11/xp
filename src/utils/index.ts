export function deepCopy<T>(objToCopy: T) {
  return JSON.parse(JSON.stringify(objToCopy));
}

export function capitalize(s: string): string {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
