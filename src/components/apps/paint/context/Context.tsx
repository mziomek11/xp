import React, { Component, createContext } from "react";

import {
  Tool,
  Options,
  BrushSize,
  LineWidth,
  RubberSize,
  ZoomSize,
  AeroSize
} from "../models";

type State = {
  selectedTool: Tool;
  lastSelectedTool: Tool;
  primaryColor: string;
  secondaryColor: string;
  canvasCtx: CanvasRenderingContext2D | null;
  options: Options;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
type SetOptions = { setOptions: (options: Partial<Options>) => void };
export type Context = State & SetState & SetOptions;

const PaintContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<{}, State> {
  readonly state: State = {
    selectedTool: "brush",
    lastSelectedTool: "brush",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    canvasCtx: null,
    options: {
      lineWidth: LineWidth.ExtraSmall,
      rubberSize: RubberSize.ExtraBig,
      aeroSize: AeroSize.Small,
      zoom: ZoomSize.Default,
      pickColor: "transparent",
      isSelectTransparent: false,
      brush: {
        type: "slash",
        size: BrushSize.Big
      },
      shapeDrawMode: {
        circle: "stroke",
        rect: "stroke",
        rounded: "stroke",
        poly: "stroke"
      }
    }
  };

  getContextValue = (): Context => ({
    ...this.state,
    setContext: (data: SetStateData) => this.setState(data as any),
    setOptions: this.setOptions
  });

  setOptions = (newOptions: Partial<Options>) => {
    this.setState({ options: { ...this.state.options, ...newOptions } });
  };

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
