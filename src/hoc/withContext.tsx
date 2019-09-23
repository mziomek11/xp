import React from "react";

import FilesystemContext from "../components/apps/filesystem/context/Context";
import WindowContext from "../components/window/Context";

type ContextType = "window" | "filesystem";

export function withContext<T>(
  Component: React.ComponentType<T>,
  type: ContextType
) {
  const Context = type === "filesystem" ? FilesystemContext : WindowContext;
  return (props: Omit<T, "context">) => {
    return (
      <Context.Consumer data-test={type}>
        {(context: any) => {
          const propsWithContext = { ...props, context };
          return <Component {...(propsWithContext as any)} />;
        }}
      </Context.Consumer>
    );
  };
}

export default withContext;
