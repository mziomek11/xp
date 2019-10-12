import { action } from "typesafe-actions";

import store from "../";
import * as FileSystemAction from "./constants";
import { FileTree, File, Content } from "./models";
import { deepCopy } from "../../utils";
import { objectPropFromPath } from "../../utils/filesystem";

export const createFolder = (path: string[]) => {
  const fileTree = getFileTreeCopy();
  const [possibleFiles, possiblePath] = objectPropFromPath(fileTree, path);

  if (path.length !== possiblePath.length) {
    return action(FileSystemAction.CREATE_FAILED);
  }

  const folderName = getNewFolderName(possibleFiles);
  const folderData: File = { type: "folder", name: folderName, content: {} };
  const targetFolder = getTargetFolder(fileTree, possiblePath);

  targetFolder[folderName] = folderData;

  return action(FileSystemAction.CREATE, { files: fileTree });
};

const getNewFolderName = (files: File[]): string => {
  const namesInFolder = Array.from(files, file => file.name);
  let newFolderName = "New folder";

  if (namesInFolder.indexOf(newFolderName) > -1) {
    let nthFolderName = 2;
    while (true) {
      const testFolderName = `${newFolderName} (${nthFolderName})`;
      if (namesInFolder.indexOf(testFolderName) === -1) {
        return testFolderName;
      }
      nthFolderName++;
    }
  }

  return newFolderName;
};

export const create = (path: string[], data: File) => {
  const fileTree = getFileTreeCopy();
  const [possibleFiles, possiblePath] = objectPropFromPath(fileTree, path);

  if (path.length !== possiblePath.length) {
    return action(FileSystemAction.CREATE_FAILED);
  }

  for (let i = 0; i < possibleFiles.length; i++) {
    if (possibleFiles[i].name === data.name) {
      return action(FileSystemAction.CREATE_FAILED);
    }
  }

  const targetFolder = getTargetFolder(fileTree, possiblePath);
  targetFolder[data.name] = data;

  return action(FileSystemAction.CREATE, { files: fileTree });
};

export const updateContent = (
  path: string[],
  fileName: string,
  content: Content
) => {
  const fileTree = getFileTreeCopy();
  const [, possiblePath] = objectPropFromPath(fileTree, path);
  const targetFolder = getTargetFolder(fileTree, possiblePath);

  if (path.length !== possiblePath.length) {
    return action(FileSystemAction.UPDATE_FAILED);
  }

  const fileToUpdate = targetFolder[fileName];

  if (!fileToUpdate) {
    return action(FileSystemAction.UPDATE_FAILED);
  }

  fileToUpdate.content = content;

  return action(FileSystemAction.UPDATE, { files: fileTree });
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
