import React, { Component, createContext } from "react";

import Vector from "../../../classes/Vector";

type State = {
  focusedIds: number[];
  focusingRect: boolean;
  startFocusPosition: Vector;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
export type Context = State & SetState;

const DesktopContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<{}, State> {
  readonly state: State = {
    focusedIds: [],
    focusingRect: false,
    startFocusPosition: Vector.Zero
  };

  getContextValue = (): Context => {
    return {
      ...this.state,
      setContext: (data: SetStateData) => this.setState(data as any)
    };
  };

  render() {
    const contextValue = this.getContextValue();
    return (
      <DesktopContext.Provider value={contextValue} data-test="context">
        {this.props.children}
      </DesktopContext.Provider>
    );
  }
}

export const Provider = ContextProvider;

export default DesktopContext;
