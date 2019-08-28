export function deepCopy<T>(objToCopy: T) {
  return JSON.parse(JSON.stringify(objToCopy));
}

export function capitalize(s: string): string {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getClassName(
  baseClass: string,
  modifiers: { [modifirer: string]: boolean },
  defaultModifiers: string[] = []
) {
  let className = baseClass;

  defaultModifiers.forEach(modifier => {
    className += ` ${baseClass}--${modifier}`;
  });

  Object.keys(modifiers).forEach(modifier => {
    if (modifiers[modifier]) className += ` ${baseClass}--${modifier}`;
  });

  return className;
}
