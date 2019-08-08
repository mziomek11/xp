declare module "MyTypes" {
  import { StateType } from "typesafe-actions";

  export type Store = StateType<typeof import("./index").default>;
  export type RootState = StateType<typeof import("./root-reducer").default>;
}
