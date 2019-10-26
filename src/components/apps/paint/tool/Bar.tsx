import React from "react";

import AnySelect from "./select/Any";
import RectSelect from "./select/Rect";

import Rubber from "./draw/Rubber";
import Pencil from "./draw/Pencil";
import Brush from "./draw/Brush";

import Fill from "./other/Fill";
import Pick from "./other/Pick";
import Aero from "./other/Aero";
import Text from "./other/Text";
import Zoom from "./other/Zoom";

import Line from "./line/Line";

import Rectangle from "./shape/Rectangle";
import Polygon from "./shape/Polygon";
import Circle from "./shape/Circle";
import Rounded from "./shape/Rounded";

import CurrentOptions from "./options/Current";

const Bar = () => {
  return (
    <div className="paint__toolbar" data-test="bar">
      <div className="paint__toolbar__tools">
        <AnySelect data-test="tool" />
        <RectSelect data-test="tool" />

        <Rubber data-test="tool" />
        <Fill data-test="tool" />

        <Pick data-test="tool" />
        <Zoom data-test="tool" />

        <Pencil data-test="tool" />
        <Brush data-test="tool" />

        <Aero data-test="tool" />
        <Text data-test="tool" />

        <Line type="straight" data-test="tool" />
        <Line type="curve" data-test="tool" />

        <Rectangle data-test="tool" />
        <Polygon data-test="tool" />

        <Circle data-test="tool" />
        <Rounded data-test="tool" />
      </div>
      <CurrentOptions data-test="options" />
    </div>
  );
};

export default Bar;
