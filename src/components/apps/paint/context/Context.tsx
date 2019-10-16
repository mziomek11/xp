import React, { Component, createContext } from "react";

import { Tool } from "../models";

type State = {
  selectedTool: Tool;
  primaryColor: string;
  secondaryColor: string;
  canvasCtx: CanvasRenderingContext2D | null;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
export type Context = State & SetState;

const PaintContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<{}, State> {
  readonly state: State = {
    selectedTool: "pencil",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    canvasCtx: null
  };

  getContextValue = (): Context => ({
    ...this.state,
    setContext: (data: SetStateData) => this.setState(data as any)
  });

  render() {
    const contextValue = this.getContextValue();
    return (
      <PaintContext.Provider value={contextValue} data-test="context">
        {this.props.children}
      </PaintContext.Provider>
    );
  }
}

export const Provider = ContextProvider;

export default PaintContext;
