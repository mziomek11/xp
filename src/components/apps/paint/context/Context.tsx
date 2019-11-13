import React, { Component, createContext } from "react";

import {
  Tool,
  Options,
  BrushSize,
  LineWidth,
  RubberSize,
  ZoomSize,
  AeroSize,
  SelectionOptions as SelOpts
} from "../models";
import Vector from "../../../../classes/Vector";

type Path = string[] | undefined;

type Props = {
  startPath: Path;
  startImage?: ImageData;
};

type State = {
  path: Path;
  startImage?: ImageData;
  selectedTool: Tool;
  lastSelectedTool: Tool;
  primaryColor: string;
  secondaryColor: string;
  canvasCtx: CanvasRenderingContext2D | null;
  tempCanvasCtx: CanvasRenderingContext2D | null;
  showTempCanvas: boolean;
  showError: boolean;
  isOpening: boolean;
  isSaving: boolean;
  options: Options;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
type SetOptions = { setOptions: (options: Partial<Options>) => void };
type SetSelect = { setSelectOptions: (o: Partial<SelOpts>) => void };
type ClearCtx = { clearTempCanvas: VoidFunction };
type SetColor = { setColor: (primary: boolean) => void };
type GetImageData = { getImageData: () => ImageData };
export type Context = State &
  SetState &
  SetOptions &
  ClearCtx &
  SetColor &
  SetSelect &
  GetImageData;

const PaintContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<Props, State> {
  readonly state: State = {
    path: this.props.startPath,
    startImage: this.props.startImage,
    showError: false,
    isOpening: false,
    isSaving: false,
    selectedTool: "pencil",
    lastSelectedTool: "brush",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    canvasCtx: null,
    tempCanvasCtx: null,
    showTempCanvas: false,
    options: {
      lineWidth: LineWidth.ExtraSmall,
      rubberSize: RubberSize.Big,
      aeroSize: AeroSize.Small,
      zoom: ZoomSize.Default,
      pickColor: "transparent",
      brush: {
        type: "circle",
        size: BrushSize.Medium
      },
      shapeDrawMode: {
        circle: "stroke",
        rect: "stroke",
        rounded: "stroke",
        poly: "stroke"
      },
      select: {
        isRect: false,
        isText: false,
        isTransparent: false,
        size: Vector.Zero,
        position: Vector.Zero
      }
    }
  };

  getContextValue = (): Context => ({
    ...this.state,
    setContext: (data: SetStateData) => this.setState(data as any),
    setOptions: this.setOptions,
    clearTempCanvas: this.clearTempCanvas,
    setColor: this.setColor,
    setSelectOptions: this.setSelectOptions,
    getImageData: this.getImageData
  });

  setOptions = (newOptions: Partial<Options>) => {
    this.setState({ options: { ...this.state.options, ...newOptions } });
  };

  setSelectOptions = (newSelectOpts: Partial<SelOpts>) => {
    this.setOptions({
      select: { ...this.state.options.select, ...newSelectOpts }
    });
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

  getImageData = (): ImageData => {
    const { canvasCtx } = this.state;
    const { width, height } = canvasCtx!.canvas;

    const imageData = canvasCtx!.getImageData(0, 0, width, height);
    return imageData;
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
