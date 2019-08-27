import React from "react";

import WindowContext from "../components/window/Context";

function withWindowContext<T>(Component: React.ComponentType<T>) {
  return (props: Omit<T, "context">) => {
    return (
      <WindowContext.Consumer data-test="consumer">
        {context => {
          const propsWithContext = { ...props, context };
          return <Component {...(propsWithContext as any)} />;
        }}
      </WindowContext.Consumer>
    );
  };
}

export default withWindowContext;
