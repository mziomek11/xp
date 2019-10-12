import { Application } from "../models";
import { Content } from "../filesystem/models";

export type WindowById = { [id: string]: Window };

export type Window = {
  id: string;
  name: string;
  application: Application;
  icon: string;
  minimalized: boolean;
  openData?: OpenData;
};

export type OpenData = {
  path: string[] | undefined;
  content?: Content;
};
