import { FileTree } from "../store/filesystem/models";

const initFileTree: FileTree = {
  "Local Disk (C:)": {
    name: "Local Disk (C:)",
    type: "disk",
    content: {
      "empty image": {
        name: "empty image",
        type: "image",
        content: undefined
      },
      "Documents and settings": {
        name: "Documents and settings",
        type: "folder",
        content: {
          User: {
            name: "User",
            type: "folder",
            content: {
              "My documents": {
                name: "My documents",
                type: "folder",
                content: {
                  "My pictures": {
                    name: "My pictures",
                    type: "folder",
                    content: {}
                  },
                  "My music": {
                    name: "My music",
                    type: "folder",
                    content: {}
                  }
                }
              }
            }
          }
        }
      },
      "text file": {
        name: "text file",
        type: "text",
        content: "some text inside text file"
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
                content: "qwerty123\nabcde321"
              }
            }
          }
        }
      }
    }
  }
};

export default initFileTree;
