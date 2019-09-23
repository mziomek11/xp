import { FileTree } from "./models";

const initFileTree: FileTree = {
  "Local Disk (C:)": {
    name: "Local Disk (C:)",
    type: "disk",
    content: {
      "Documents and settings": {
        name: "Documents and settings",
        type: "folder",
        content: {}
      },
      "Program files": {
        name: "Program files",
        type: "folder",
        content: {
          "Common files": {
            name: "Common files",
            type: "folder",
            content: {}
          }
        }
      },
      WINDOWS: {
        name: "WINDOWS",
        type: "folder",
        content: {
          "IMPORTANT DONT DELETE": {
            name: "IMPORTANT DONT DELETE",
            type: "folder",
            content: {}
          }
        }
      }
    }
  }
};

export default initFileTree;
