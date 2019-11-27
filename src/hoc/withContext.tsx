import React from "react";

import WindowContext from "../components/window/Context";
import FilesystemContext from "../components/apps/filesystem/context/Context";
import NotepadContext from "../components/apps/notepad/context/Context";
import PaintContext from "../components/apps/paint/context/Context";
import MinesweeperContext from "../components/apps/minesweeper/context/Context";
import DesktopContext from "../components/desktop/context/Context";

export type ContextType =
  | "window"
  | "filesystem"
  | "notepad"
  | "paint"
  | "minesweeper"
  | "desktop";

const getContext = (type: ContextType): React.Context<any> => {
  switch (type) {
    case "window":
      return WindowContext;
    case "filesystem":
      return FilesystemContext;
    case "notepad":
      return NotepadContext;
    case "paint":
      return PaintContext;
    case "minesweeper":
      return MinesweeperContext;
    case "desktop":
      return DesktopContext;
    default:
      throw Error("Unknown context type");
  }
};

export function withContext<T>(
  Component: React.ComponentType<T>,
  type: ContextType
) {
  const Context = getContext(type);
  return (props: Omit<T, ContextType>) => {
    return (
      <Context.Consumer data-test={type}>
        {(context: any) => {
          const propsWithContext = { ...props } as any;
          propsWithContext[type] = context;
          return <Component {...(propsWithContext as any)} />;
        }}
      </Context.Consumer>
    );
  };
}

export default withContext;
