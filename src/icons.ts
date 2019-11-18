import computer from "./assets/icons/computer.png";
import computerFocused from "./assets/icons/computer-focused.png";

import folder from "./assets/icons/folder.png";
import folderFocused from "./assets/icons/folder-focused.png";

import disk from "./assets/icons/disk.png";
import diskFocused from "./assets/icons/disk-focused.png";

import notepad from "./assets/icons/notepad.png";
import notepadFocused from "./assets/icons/notepad-focused.png";

import text from "./assets/icons/text.png";
import textFocused from "./assets/icons/text-focused.png";

import paint from "./assets/icons/paint.png";
import paintFocused from "./assets/icons/paint-focused.png";

import image from "./assets/icons/image.png";
import imageFocused from "./assets/icons/image-focused.png";

import minesweeper from "./assets/icons/minesweeper.png";
import minesweeperFocused from "./assets/icons/minesweeper-focused.png";

import cursorPaintFill from "./assets/paint/cursors/fill.png";
import cursorPaintAero from "./assets/paint/cursors/aero.png";
import cursorPaintPencil from "./assets/paint/cursors/pencil.png";
import cursorPaintPick from "./assets/paint/cursors/pick.png";
import cursorPaintZoom from "./assets/paint/cursors/zoom.png";

import { Application } from "./store/models";
import { Tool } from "./components/apps/paint/models";

export type FileIcon = "folder" | "disk" | "text" | "image";

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
    case "text":
      return text;
    case "filesystem":
      return computer;
    case "notepad":
      return notepad;
    case "paint":
      return paint;
    case "image":
      return image;
    case "minesweeper":
      return minesweeper;
    default:
      throw Error(`${type} icon does not exists`);
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
      return computerFocused;
    case "notepad":
      return notepadFocused;
    case "paint":
      return paintFocused;
    case "image":
      return imageFocused;
    case "minesweeper":
      return minesweeperFocused;
    default:
      throw Error(`${type} icon does not exists`);
  }
};

export const getPaintCursor = (tool: Tool): string => {
  switch (tool) {
    case "aero":
      return `url(${cursorPaintAero}) 0 16, auto `;
    case "fill":
      return `url(${cursorPaintFill}) 0 16, auto `;
    case "pencil":
      return `url(${cursorPaintPencil}) 0 16, auto `;
    case "pick":
      return `url(${cursorPaintPick}) 0 24, auto `;
    case "zoom":
      return `url(${cursorPaintZoom}), auto `;
    default:
      return "crosshair";
  }
};
