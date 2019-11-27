import { Application } from "./store/models";
import { OpenData } from "./store/window/models";
import { capitalize } from "./utils";

export type StartData = {
  name: string;
  startWindowName: string;
  application: Application;
  openData?: OpenData;
};

export const paintStartData: StartData = {
  name: "Paint",
  startWindowName: "Untilted - Paint",
  application: "paint",
  openData: {
    content: undefined,
    path: undefined
  }
};

export const filesystemStartData: StartData = {
  name: "Computer",
  startWindowName: "Computer",
  application: "filesystem"
};

export const notepadStartData: StartData = {
  name: "Notepad",
  startWindowName: "Untilted - Notepad",
  application: "notepad",
  openData: {
    content: "",
    path: undefined
  }
};

export function getBasicStartData(app: Application): StartData {
  const capitalizedApp = capitalize(app);
  return {
    name: capitalizedApp,
    startWindowName: capitalizedApp,
    application: app
  };
}
