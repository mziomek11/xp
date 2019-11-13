import { FileTree } from "./models";

const initFileTree: FileTree = {
  "Local Disk (C:)": {
    name: "Local Disk (C:)",
    type: "disk",
    content: {
      image: {
        name: "image",
        type: "image",
        content: undefined
      },
      "Documents and settings": {
        name: "Documents and settings",
        type: "folder",
        content: {}
      },
      TEXTFILE: {
        name: "TEXTFILE",
        type: "text",
        content: "content text file"
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
            content: {
              PASSWORDS: {
                name: "PASSWORDS",
                type: "text",
                content: ":)"
              }
            }
          }
        }
      }
    }
  }
};

export default initFileTree;
