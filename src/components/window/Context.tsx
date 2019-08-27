import React, { Component, createContext } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import { windowConfig } from "../../config";
import {
  changePriority,
  toggleMinimalize,
  close,
  removeFocus
} from "../../store/window/actions";

type OwnProps = {
  id: string;
  startFullscreened: boolean;
};

type DispatchProps = {
  changePriority: () => void;
  toggleMinimalize: () => void;
  close: () => void;
  removeFocus: () => void;
};

type StateProps = {
  name: string;
  minimalized: boolean;
  focused: boolean;
};

type Props = OwnProps & DispatchProps & StateProps;

type State = {
  left: number;
  top: number;
  width: number;
  height: number;
  fullscreened: boolean;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
export type Context = DispatchProps & StateProps & State & SetState;

const WindowContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<Props, State> {
  readonly state: State = {
    left: windowConfig.INITIAL_LEFT,
    top: windowConfig.INITIAL_TOP,
    width: windowConfig.INITIAL_WIDTH,
    height: windowConfig.INITIAL_HEIGHT,
    fullscreened: this.props.startFullscreened
  };

  getContextValue = (): Context => {
    return {
      ...this.state,
      ...this.props,
      setContext: (data: SetStateData) => this.setState(data as any)
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
  const { name, minimalized } = state.window.byId[id];
  const focused = id === state.window.focused;
  return { name, minimalized, focused };
};

const mapDistapchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  changePriority: () => dispatch(changePriority(id)),
  toggleMinimalize: () => dispatch(toggleMinimalize(id)),
  close: () => dispatch(close(id)),
  removeFocus: () => dispatch(removeFocus())
});

export const Provider = connect(
  mapStateToProps,
  mapDistapchToProps
)(ContextProvider);

export default WindowContext;
