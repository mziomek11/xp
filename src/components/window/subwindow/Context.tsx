import React, { Component } from "react";
import { connect } from "react-redux";

import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";
import { RootState } from "MyTypes";
import { Props as SubWindowProps } from "./SubWindow";
import { ContextProvider, Props as CtxProps, MinMaxProps } from "../Context";
import {
  clickedWindow,
  getWindowCustomMinMaxProps,
  getWindowNoResizableMinMaxProps,
  getSubWindowStartLeftAndTop
} from "../../../utils/window";

export type ParentProps = {
  width: number;
  height: number;
  left: number;
  top: number;
  fullScr: boolean;
  focused: boolean;
  changePriority: () => void;
  removeFocus: (e: MouseEvent) => void;
};

type WindowProps = {
  window: WindowContextType;
};

type StateProps = {
  screenWidth: number;
  screenHeight: number;
};

type Props = SubWindowProps & StateProps & WindowProps;

export class Context extends Component<Props, {}> {
  handleRemoveFocus = (e: MouseEvent) => {
    const {
      left,
      top,
      width,
      height,
      fullScr,
      removeFocus
    } = this.props.window.getSubWindowProps();

    const clickedParent = clickedWindow(e, left, top, width, height, fullScr);

    if (!clickedParent) removeFocus(e);
  };

  errorFN = () => {
    throw Error("Tried to access not defined function");
  };

  getContextData = (): Partial<CtxProps> => {
    const { children, onClose, ...ctxProps } = this.props;
    const { focused, changePriority } = this.props.window.getSubWindowProps();
    const adjustedSizeData = this.getAdjustedSizeData();

    const ctxData: Partial<CtxProps> = {
      minimalized: false,
      focused: focused,
      changePriority: changePriority,
      removeFocus: this.handleRemoveFocus,
      hideMinimalize: true,
      hideFullscreen: true,
      hideIcon: true,
      close: onClose,
      ...ctxProps,
      ...adjustedSizeData
    };

    return ctxData;
  };

  getAdjustedSizeData = (): Omit<MinMaxProps, "startFullscreened"> => {
    const minMaxProps = this.getMinMaxProps();
    const startPosition = this.getStartPosition();

    return { ...minMaxProps, ...startPosition };
  };

  getMinMaxProps = () => {
    const {
      startWidth,
      startHeight,
      resizable,
      screenWidth,
      screenHeight
    } = this.props;

    if (!resizable) {
      return getWindowNoResizableMinMaxProps(startWidth, startHeight);
    }

    return getWindowCustomMinMaxProps(
      startWidth,
      startHeight,
      screenWidth,
      screenHeight
    );
  };

  getStartPosition = () => {
    const { props } = this;
    let { startWidth, startHeight, screenWidth, screenHeight, window } = props;
    const { width, height, left, top } = window.getSubWindowProps();

    return getSubWindowStartLeftAndTop(
      startWidth,
      startHeight,
      width,
      height,
      left,
      top,
      screenWidth,
      screenHeight
    );
  };

  render() {
    const { children } = this.props;
    const contextProps = this.getContextData() as any;
    return (
      <ContextProvider {...(contextProps as any)} data-test="provider">
        {children}
      </ContextProvider>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  screenWidth: state.screen.width,
  screenHeight: state.screen.height
});

export default connect(mapStateToProps)(withContext(Context, "window"));
