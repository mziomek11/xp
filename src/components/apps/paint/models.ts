import Vector from "../../../classes/Vector";

export type ShapeDrawMode = "stroke" | "fill" | "both";

export enum LineWidth {
  ExtraSmall = 1,
  Small = 2,
  Medium = 3,
  Big = 4,
  ExtraBig = 5
}

export enum RubberSize {
  Small = 4,
  Medium = 6,
  Big = 8,
  ExtraBig = 10
}

export enum ZoomSize {
  Default = 1,
  Small = 2,
  Medium = 6,
  Big = 8
}

export enum AeroSize {
  Small,
  Medium,
  Big
}

export type Brush = "circle" | "rect" | "slash" | "backSlash";
export enum BrushSize {
  Small = 2,
  Medium = 5,
  Big = 8
}

export type SelectionOptions = {
  isRect: boolean;
  isText: boolean;
  isTransparent: boolean;
  position: Vector;
  size: Vector;
};

type BrushOptions = {
  type: Brush;
  size: BrushSize;
};

type DrawModeOptions = {
  circle: ShapeDrawMode;
  rect: ShapeDrawMode;
  rounded: ShapeDrawMode;
  poly: ShapeDrawMode;
};

export type Options = {
  lineWidth: LineWidth;
  rubberSize: RubberSize;
  zoom: ZoomSize;
  aeroSize: AeroSize;
  pickColor: string;
  brush: BrushOptions;
  shapeDrawMode: DrawModeOptions;
  select: SelectionOptions;
};

type Shape = "rect" | "poly" | "circle" | "rounded";
type Select = "anySelect" | "rectSelect";
type Line = "line" | "curve";
type Draw = "rubber" | "brush" | "pencil";
type Other = "fill" | "pick" | "zoom" | "aero" | "text";

export type Tool = Select | Draw | Line | Shape | Other;
