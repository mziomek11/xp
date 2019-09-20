import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import * as FileSystemAction from "./constants";
import { FileTree } from "./models";

type FileSystemAction = ActionType<typeof actions>;
export type FileSystemState = Readonly<{
  copiedFiles: FileTree;
  files: FileTree;
  isFocusingRect: boolean;
}>;

const initState: FileSystemState = {
  copiedFiles: {},
  files: {
    "Local Disk (C:)": {
      type: "disk",
      name: "Local Disk (C:)",
      content: {
        Example1: {
          type: "folder",
          name: "Example1",
          content: {
            xx: {
              type: "folder",
              name: "xx",
              content: {}
            },
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: {
              type: "folder",
              name:
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
              content: {}
            },
            "asdasdasd asdasdasdas dasdasdasd asdasdasdasd asdasdasd asdasdasd": {
              type: "folder",
              name:
                "asdasdasd asdasdasdas dasdasdasd asdasdasdasd asdasdasd asdasdasd",
              content: {}
            },
            "paapapapap pappa app": {
              type: "folder",
              name: "paapapapap pappa app",
              content: {}
            },
            "short text": {
              type: "folder",
              name: "short text",
              content: {}
            }
          }
        },
        Example2: {
          type: "folder",
          name: "Example2",
          content: {}
        },
        Example3: {
          type: "folder",
          name: "Example3",
          content: {}
        }
      }
    }
  },
  isFocusingRect: false
};

export default combineReducers<FileSystemState, FileSystemAction>({
  files: (state = initState.files, action) => {
    switch (action.type) {
      case FileSystemAction.CUT:
      case FileSystemAction.PASTE:
      case FileSystemAction.REMOVE:
      case FileSystemAction.CREATE:
      case FileSystemAction.RENAME:
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
  },
  isFocusingRect: (state = initState.isFocusingRect, action) => {
    switch (action.type) {
      case FileSystemAction.SET_FOCUSING_RECT:
        return action.payload.isFocusingRect;
      default:
        return state;
    }
  }
});
