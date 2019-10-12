import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import * as FileSystemAction from "./constants";
import initFiles from "./files";
import { FileTree } from "./models";

type FileSystemAction = ActionType<typeof actions>;
export type FileSystemState = Readonly<{
  copiedFiles: FileTree;
  files: FileTree;
}>;

const initState: FileSystemState = {
  copiedFiles: {},
  files: initFiles
};

export default combineReducers<FileSystemState, FileSystemAction>({
  files: (state = initState.files, action) => {
    switch (action.type) {
      case FileSystemAction.CUT:
      case FileSystemAction.PASTE:
      case FileSystemAction.REMOVE:
      case FileSystemAction.CREATE:
      case FileSystemAction.RENAME:
      case FileSystemAction.UPDATE:
        return action.payload.files;
      default:
        return state;
    }
  },
  copiedFiles: (state = initState.copiedFiles, action) => {
    switch (action.type) {
      case FileSystemAction.CUT:
      case FileSystemAction.COPY:
        return action.payload.copiedFiles;
      default:
        return state;
    }
  }
});
