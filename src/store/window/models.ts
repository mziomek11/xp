export type WindowById = { [id: string]: Window };

export type Window = {
  id: string;
  name: string;
  application: string;
  minimalized: boolean;
};
