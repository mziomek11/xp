declare module "ContextType" {
  export type WindowContextType = import("./components/window/Context").Context;
  export type MenuContextType = import("./components/menu/Context").Context;
  export type FilesystemContextType = import("./components/apps/filesystem/context/Context").Context;
  export type NotepadContextType = import("./components/apps/notepad/context/Context").Context;
  export type PaintContextType = import("./components/apps/paint/context/Context").Context;
}
