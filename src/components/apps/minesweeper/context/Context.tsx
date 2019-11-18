import React, { Component, createContext } from "react";
import Vector from "../../../../classes/Vector";

type State = {
  boardSize: Vector;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
export type Context = State & SetState;

const MinesweeperContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<{}, State> {
  readonly state: State = {
    boardSize: Vector.mul(Vector.One, 9)
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
      <MinesweeperContext.Provider value={contextValue} data-test="context">
        {this.props.children}
      </MinesweeperContext.Provider>
    );
  }
}

export const Provider = ContextProvider;

export default MinesweeperContext;
