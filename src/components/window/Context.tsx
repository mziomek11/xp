import React, { Component, createContext } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import { ParentProps } from "./subwindow/Context";
import {
  changePriority,
  toggleMinimalize,
  close,
  removeFocus
} from "../../store/window/actions";

export type OwnProps = {
  id: string;
};

export type MinMaxProps = {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
};

export type StartProps = {
  startWidth: number;
  startHeight: number;
  startLeft: number;
  startTop: number;
  startFullscreened: boolean;
};

export type OptionalProps = {
  hideMinimalize: boolean;
  hideFullscreen: boolean;
  hideExit: boolean;
  hideIcon: boolean;
  staticWindowName: string | null;
  resizable: boolean;
};

type DispatchProps = {
  changePriority: () => void;
  toggleMinimalize: () => void;
  close: () => void;
  removeFocus: (e: MouseEvent) => void;
};

type StateProps = {
  name: string;
  icon: string;
  minimalized: boolean;
  focused: boolean;
};

export type Props = OwnProps &
  MinMaxProps &
  StartProps &
  DispatchProps &
  StateProps &
  OptionalProps;

type State = {
  disabled: boolean;
  resizing: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
  fullscreened: boolean;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
type GetSWProps = { getSubWindowProps: () => ParentProps };
export type Context = Omit<Props, keyof StartProps> &
  State &
  SetState &
  GetSWProps;

const WindowContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<Props, State> {
  public static defaultProps = {
    hideMinimalize: false,
    hideFullscreen: false,
    hideExit: false,
    hideIcon: false,
    staticWindowName: null,
    resizable: true
  };

  readonly state: State = {
    disabled: false,
    resizing: false,
    left: this.props.startLeft,
    top: this.props.startTop,
    width: this.props.startWidth,
    height: this.props.startHeight,
    fullscreened: this.props.startFullscreened
  };

  getContextValue = (): Context => {
    const { startFullscreened, startHeight, startWidth, ...rest } = this.props;
    return {
      ...this.state,
      ...rest,
      setContext: (data: SetStateData) => this.setState(data as any),
      getSubWindowProps: this.getSubWindowProps
    };
  };

  getSubWindowProps = (): ParentProps => {
    return {
      focused: this.props.focused,
      changePriority: this.props.changePriority,
      removeFocus: this.props.removeFocus,
      left: this.state.left,
      top: this.state.top,
      width: this.state.width,
      height: this.state.height,
      fullScr: this.state.fullscreened
    };
  };

  render() {
    const contextValue = this.getContextValue();
    return (
      <WindowContext.Provider value={contextValue} data-test="context">
        {this.props.children}
      </WindowContext.Provider>
    );
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => {
  const { name, minimalized, icon } = state.window.byId[id];
  const focused = id === state.window.focused;
  return { name, minimalized, icon, focused };
};

const mapDistapchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  changePriority: () => dispatch(changePriority(id)),
  toggleMinimalize: () => dispatch(toggleMinimalize(id)),
  close: () => dispatch(close(id)),
  removeFocus: (e: MouseEvent) => dispatch(removeFocus())
});

export const Provider = connect(
  mapStateToProps,
  mapDistapchToProps
)(ContextProvider);

export default WindowContext;
