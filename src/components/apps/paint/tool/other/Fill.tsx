import React, { Component } from "react";

import Tool from "../Tool";
import Vector from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { hexToRgb, rgbToHex } from "../../../../../utils/paint";

import fillIcon from "../../../../../assets/paint/fill.png";

type CtxProps = {
  paint: PaintContextType;
};

export class Fill extends Component<CtxProps> {
  shouldComponentUpdate() {
    return false;
  }

  handleMouseDown = (canvasPos: Vector, isLeft: boolean) => {
    const { primaryColor, secondaryColor } = this.props.paint;
    const color = isLeft ? primaryColor : secondaryColor;

    this.fill(canvasPos, color);
  };

  fill = (canvasPos: Vector, color: string) => {
    const { canvasCtx } = this.props.paint;
    const { width, height } = canvasCtx!.canvas;
    const image = canvasCtx!.getImageData(0, 0, width, height);
    const pixels = image.data;
    const clickPixel = 4 * (width * canvasPos.y + canvasPos.x);

    const targetRGB = {
      r: pixels[clickPixel],
      g: pixels[clickPixel + 1],
      b: pixels[clickPixel + 2]
    };

    const targetHex = rgbToHex(targetRGB);
    const primaryRGB = hexToRgb(color);

    const equalsTargetColor = (pixel: number, addStart: number) => {
      return (
        pixels[pixel + addStart] === targetRGB.r &&
        pixels[pixel + addStart + 1] === targetRGB.g &&
        pixels[pixel + addStart + 2] === targetRGB.b
      );
    };

    const findMaxLeftTargetPixel = (clickPixel: number) => {
      const y = Math.floor(clickPixel / (4 * width));
      const endLeft = y * width * 4;
      let left = clickPixel;
      while (endLeft < left) {
        if (equalsTargetColor(left, -4)) {
          left -= 4;
        } else break;
      }
      return left;
    };

    const findMaxRightTargetPixel = (clickPixel: number) => {
      const y = Math.floor(clickPixel / (4 * width));
      const endRight = (y + 1) * width * 4 - 4;
      let right = clickPixel;
      while (right < endRight) {
        if (equalsTargetColor(right, 4)) {
          right += 4;
        } else break;
      }
      return right;
    };

    if (color !== targetHex) {
      let Q: number[] = [clickPixel];
      while (Q.length > 0) {
        const chkdPos = Q.shift()!;
        if (!equalsTargetColor(chkdPos, 0)) continue;

        const left = findMaxLeftTargetPixel(chkdPos);
        const right = findMaxRightTargetPixel(chkdPos);
        for (let i = left; i <= right; i += 4) {
          pixels[i] = primaryRGB.r;
          pixels[i + 1] = primaryRGB.g;
          pixels[i + 2] = primaryRGB.b;

          const top = i - 4 * width;
          const bottom = i + 4 * width;

          if (top >= 0 && equalsTargetColor(top, 0)) {
            Q.push(top);
          }
          if (bottom < pixels.length && equalsTargetColor(bottom, 0)) {
            Q.push(bottom);
          }
        }
      }
    }

    canvasCtx!.putImageData(image, 0, 0);
  };

  render() {
    return (
      <Tool
        icon={fillIcon}
        toolType="fill"
        data-test="tool"
        onMouseDown={this.handleMouseDown}
      />
    );
  }
}

export default withContext(Fill, "paint");
