import { action } from "typesafe-actions";

import store from "../";
import * as FileSystemAction from "./constants";
import { FileTree, FileType, File } from "./models";
import { deepCopy } from "../../utils";
import { objectPropFromPath } from "../../utils/filesystem";

export const setFocusingRect = (value: boolean) => {
  return action(FileSystemAction.SET_FOCUSING_RECT, { isFocusingRect: value });
};

export const create = (path: string[], type: FileType) => {
  const fileTree = getFileTreeCopy();
  const [possibleFiles, possiblePath] = objectPropFromPath(fileTree, path);

  if (path.length !== possiblePath.length) {
    return action(FileSystemAction.CREATE_FAILED);
  }

  const newFileName = getNewFileName(possibleFiles, type);
  const newFileData = getFileData(newFileName, type);
  const targetFolder = getTargetFolder(fileTree, possiblePath);

  targetFolder[newFileName] = newFileData;

  return action(FileSystemAction.CREATE, { files: fileTree });
};

const getNewFileName = (files: File[], type: FileType): string => {
  const namesInFolder = Array.from(files, file => file.name);
  let newFileName = getStartFileName(type);

  if (namesInFolder.indexOf(newFileName) > -1) {
    let nthFolderName = 2;
    while (true) {
      const testFolderName = `${newFileName} (${nthFolderName})`;
      if (namesInFolder.indexOf(testFolderName) === -1) {
        return testFolderName;
      }
      nthFolderName++;
    }
  }

  return newFileName;
};

const getStartFileName = (type: FileType): string => {
  switch (type) {
    case "folder":
      return "New folder";
    case "text":
      throw Error("Not implemented");
    case "disk":
      throw Error("Can not create new disk");
    default:
      throw Error("Unknow file type");
  }
};

const getFileData = (name: string, type: FileType): File => {
  let content;

  switch (type) {
    case "folder":
      content = {};
      break;
    case "text":
      content = "";
      break;
    default:
      throw Error("Unknown file type");
  }

  return { type, name, content };
};

export const remove = (path: string[], files: string[]) => {
  const fileTree = getFileTreeCopy();
  const [, possiblePath] = objectPropFromPath(fileTree, path);

  if (path.length !== possiblePath.length) {
    return action(FileSystemAction.REMOVE_FAILED);
  }

  const targetFolder = getTargetFolder(fileTree, possiblePath);
  files.forEach(file => delete targetFolder[file]);

  return action(FileSystemAction.REMOVE, { files: fileTree });
};

export const copy = (path: string[], copiedFileNames: string[]) => {
  const fileTree = getFileTreeCopy();
  const folderFiles = getTargetFolder(fileTree, path);
  const filesToCopy: FileTree = {};
  Object.keys(folderFiles).forEach(fileName => {
    if (copiedFileNames.indexOf(fileName) >= 0) {
      filesToCopy[fileName] = folderFiles[fileName];
    }
  });

  return action(FileSystemAction.COPY, { copiedFiles: filesToCopy });
};

export const cut = (path: string[], copiedFileNames: string[]) => {
  const fileTree = getFileTreeCopy();
  const folderFiles = getTargetFolder(fileTree, path);
  const filesToCopy: FileTree = {};
  Object.keys(folderFiles).forEach(fileName => {
    if (copiedFileNames.indexOf(fileName) >= 0) {
      filesToCopy[fileName] = folderFiles[fileName];
      delete folderFiles[fileName];
    }
  });

  return action(FileSystemAction.CUT, {
    files: fileTree,
    copiedFiles: filesToCopy
  });
};

export const paste = (path: string[]) => {
  const copiedFiles = deepCopy<FileTree>(
    store.getState().fileSystem.copiedFiles
  );
  const fileTree = getFileTreeCopy();
  const targetFolder = getTargetFolder(fileTree, path);
  const targetFolderFiles = deepCopy<FileTree>(targetFolder);

  Object.keys(targetFolderFiles).forEach(key => delete targetFolder[key]);

  Object.keys(targetFolderFiles).forEach(
    key => (targetFolder[key] = targetFolderFiles[key])
  );

  Object.keys(copiedFiles).forEach(
    key => (targetFolder[key] = copiedFiles[key])
  );

  return action(FileSystemAction.PASTE, { files: fileTree });
};

export const rename = (path: string[], oldName: string, newName: string) => {
  const fileTree = getFileTreeCopy();
  const targetFolder = getTargetFolder(fileTree, path);

  if (oldName === newName) {
    return action(FileSystemAction.RENAME_FAILED);
  }

  if (Object.keys(targetFolder).indexOf(newName) >= 0 || newName === "") {
    return action(FileSystemAction.RENAME_FAILED);
  }

  const fileCopy = deepCopy<File>(targetFolder[oldName]);
  const newFileData: File = { ...fileCopy, name: newName };

  delete targetFolder[oldName];
  targetFolder[newName] = newFileData;

  return action(FileSystemAction.RENAME, { files: fileTree });
};

const getFileTreeCopy = (): FileTree => {
  const fileTree = store.getState().fileSystem.files;
  const fileTreeCopy = deepCopy<FileTree>(fileTree);

  return fileTreeCopy;
};

const getTargetFolder = (tree: FileTree, path: string[]): FileTree => {
  let targetFolder = tree as any;
  path.forEach(folder => (targetFolder = targetFolder[folder].content));

  return targetFolder;
};
