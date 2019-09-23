import { Application } from "../models";

export type WindowById = { [id: string]: Window };

export type Window = {
  id: string;
  name: string;
  application: Application;
  minimalized: boolean;
};
