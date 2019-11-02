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
  tempCanvasCtx: CanvasRenderingContext2D | null;
  showTempCanvas: boolean;
  showError: boolean;
  options: Options;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
type SetOptions = { setOptions: (options: Partial<Options>) => void };
type ClearCtx = { clearTempCanvas: VoidFunction };
type SetColor = { setColor: (primary: boolean) => void };
export type Context = State & SetState & SetOptions & ClearCtx & SetColor;

const PaintContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<{}, State> {
  readonly state: State = {
    selectedTool: "poly",
    lastSelectedTool: "brush",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    canvasCtx: null,
    tempCanvasCtx: null,
    showTempCanvas: false,
    showError: false,
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
        rounded: "fill",
        poly: "stroke"
      }
    }
  };

  getContextValue = (): Context => ({
    ...this.state,
    setContext: (data: SetStateData) => this.setState(data as any),
    setOptions: this.setOptions,
    clearTempCanvas: this.clearTempCanvas,
    setColor: this.setColor
  });

  setOptions = (newOptions: Partial<Options>) => {
    this.setState({ options: { ...this.state.options, ...newOptions } });
  };

  setColor = (primary: boolean) => {
    const { state } = this;
    const { primaryColor, secondaryColor, canvasCtx, tempCanvasCtx } = state;
    const newColor: string = primary ? primaryColor : secondaryColor;

    canvasCtx!.fillStyle = newColor;
    canvasCtx!.strokeStyle = newColor;

    tempCanvasCtx!.fillStyle = newColor;
    tempCanvasCtx!.strokeStyle = newColor;
  };

  clearTempCanvas = () => {
    const { tempCanvasCtx, canvasCtx } = this.state;
    const { width, height } = canvasCtx!.canvas;

    tempCanvasCtx!.clearRect(0, 0, width, height);
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
