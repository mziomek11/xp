export function deepCopy<T>(objToCopy: T) {
  return JSON.parse(JSON.stringify(objToCopy));
}
