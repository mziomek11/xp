import React from "react";

import WindowContext from "../components/window/Context";
import FilesystemContext from "../components/apps/filesystem/context/Context";
import NotepadContext from "../components/apps/notepad/context/Context";

type ContextType = "window" | "filesystem" | "notepad";

const getContext = (type: ContextType): React.Context<any> => {
  switch (type) {
    case "window":
      return WindowContext;
    case "filesystem":
      return FilesystemContext;
    case "notepad":
      return NotepadContext;
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
