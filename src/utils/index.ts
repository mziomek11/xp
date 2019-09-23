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

export function areArraysEqual<T>(arr1: T[], arr2: T[]) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

export function deepCopy<T>(a: any): T {
  if (("object" != typeof a || null === a) && !(a instanceof Function))
    return a;
  let b, d;
  const f = a.constructor;
  if (a[Symbol.iterator] instanceof Function) {
    const g = a.length;
    switch (((b = new f(g)), f)) {
      case Set:
        for (let h of a) b.add(deepCopy(h));
        break;
      case Map:
        for (let [h, j] of a) b.set(h, deepCopy(j));
    }
    for (let h of Object.keys(a)) b[h] = deepCopy(a[h]);
  } else if (((d = Object.getOwnPropertyNames(a)), f !== Object)) {
    switch (f) {
      case Function:
        let g = a.toString();
        b =
          null === / \[native code\] /.exec(g)
            ? new f((/^.*?{(.*)}/ as any).exec(g)[1])
            : a;
        break;
      case RegExp:
        b = new f(a.valueOf());
        break;
      case Date:
        b = new f(a);
        break;
      case ArrayBuffer:
        b = new f(new Int8Array(a).length);
        break;
      default:
        b = a;
    }
    for (let g of d) b.hasOwnProperty(g) || (b[g] = deepCopy(a[g]));
  } else {
    b = {};
    for (let g of d) (b as any)[g] = deepCopy(a[g]);
  }
  for (let g of Object.getOwnPropertySymbols(a)) b[g] = deepCopy(a[g]);
  return b;
}
