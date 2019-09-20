import folder from "./assets/icons/folder.png";
import folderFocused from "./assets/icons/folder-focused.png";

import disk from "./assets/icons/disk.png";
import diskFocused from "./assets/icons/disk-focused.png";

import computer from "./assets/icons/computer.png";

import { FileType } from "./store/filesystem/models";

export const getIcon = (type: FileType, focused: boolean = false): string => {
  if (focused) return getFocusedIcon(type);
  else return getNormalIcon(type);
};

const getNormalIcon = (type: FileType): string => {
  switch (type) {
    case "folder":
      return folder;
    case "disk":
      return disk;
    default:
      return computer;
  }
};

const getFocusedIcon = (type: FileType): string => {
  switch (type) {
    case "folder":
      return folderFocused;
    case "disk":
      return diskFocused;
    default:
      return computer;
  }
};
