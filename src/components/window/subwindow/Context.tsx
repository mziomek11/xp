import React, { Component } from "react";

import { Props } from "./SubWindow";
import { ContextProvider, Props as CtxProps } from "../Context";
import { clickedWindow } from "../../../utils/window";

class Context extends Component<Props, {}> {
  handleRemoveFocus = (e: MouseEvent) => {
    const {
      left,
      top,
      width,
      height,
      fullScr,
      removeFocus
    } = this.props.parent;

    const clickedParent = clickedWindow(e, left, top, width, height, fullScr);

    if (!clickedParent) removeFocus(e);
  };

  errorFN = () => {
    throw Error("Tried to access not defined function");
  };

  getContextData = (): Partial<CtxProps> => {
    const { parent, children, onClose, ...ctxProps } = this.props;
    const { focused, changePriority } = parent;

    const ctxData: Partial<CtxProps> = {
      minimalized: false,
      focused: focused,
      changePriority: changePriority,
      removeFocus: this.handleRemoveFocus,
      hideMinimalize: true,
      hideFullscreen: true,
      hideIcon: true,
      close: onClose,
      ...ctxProps
    };

    return ctxData;
  };

  render() {
    const { children } = this.props;
    const contextProps = this.getContextData() as any;
    return (
      <ContextProvider {...(contextProps as any)}>{children}</ContextProvider>
    );
  }
}

export default Context;
