import folder from "./assets/icons/folder.png";
import folderFocused from "./assets/icons/folder-focused.png";

import disk from "./assets/icons/disk.png";
import diskFocused from "./assets/icons/disk-focused.png";

import notepad from "./assets/icons/notepad.png";
import notepadFocused from "./assets/icons/notepad-focused.png";

import text from "./assets/icons/text.png";
import textFocused from "./assets/icons/text-focused.png";

import computer from "./assets/icons/computer.png";

import { Application } from "./store/models";

export type FileIcon = "folder" | "disk" | "text";

export type Icon = FileIcon | Application;

export const getIcon = (type: Icon, focused: boolean = false): string => {
  if (focused) return getFocusedIcon(type);
  else return getNormalIcon(type);
};

const getNormalIcon = (type: Icon): string => {
  switch (type) {
    case "folder":
      return folder;
    case "disk":
      return disk;
    case "notepad":
      return notepad;
    case "filesystem":
      return computer;
    case "text":
      return text;
    default:
      throw Error("This icon does not exists");
  }
};

const getFocusedIcon = (type: Icon): string => {
  switch (type) {
    case "folder":
      return folderFocused;
    case "disk":
      return diskFocused;
    case "text":
      return textFocused;
    case "filesystem":
      return computer;
    case "notepad":
      return notepadFocused;
    default:
      throw Error("This icon does not exists");
  }
};
