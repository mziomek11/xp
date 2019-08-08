export type WindowById = { [id: string]: Window };

export type Window = {
  id: string;
  name: string;
  width: number;
  height: number;
  left: number;
  top: number;
};