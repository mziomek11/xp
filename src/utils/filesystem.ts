import { File, FileTree } from "../store/filesystem/models";

export function objectPropFromPath(
  obj: any,
  path: string[]
): [File[], string[]] {
  let currObj = obj;
  let currPath: string[] = [];

  for (let i = 0; i < path.length; i++) {
    const file = path[i];
    if (!currObj[file]) return [createFileArray(currObj), currPath];
    const content = currObj[file].content;
    if (typeof content === "object") {
      currObj = currObj[file].content;
      currPath.push(file);
    } else return [createFileArray(currObj), currPath];
  }

  const fileArray = createFileArray(currObj);

  return [fileArray, currPath];
}

function createFileArray(obj: FileTree) {
  const fileArray: File[] = Array.from(Object.keys(obj), name => {
    if (obj[name].type === "folder" || obj[name].type === "disk") {
      return { name, type: obj[name].type, content: obj[name].content };
    }
    return obj[name];
  });

  return fileArray;
}

export function pathArrayToString(path: string[]): string {
  if (path.length === 0) return "Computer";
  return path.reduce((prev, curr) => prev + `\\` + curr);
}
