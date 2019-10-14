import React, { Component } from "react";

import Resizer from "./Resizer";

type State = {
  width: number;
  height: number;
};

class Canvas extends Component<{}, State> {
  readonly state: State = {
    width: 200,
    height: 200
  };

  resize = (width: number, height: number) => this.setState({ width, height });

  render() {
    const { width, height } = this.state;
    const size = { width, height, resize: this.resize };

    return (
      <div className="paint__canvas-container" data-test="canvas">
        <canvas className="paint__canvas" style={{ width, height }} />

        <Resizer isVertical={false} isHorizontal {...size} data-test="E" />
        <Resizer isVertical isHorizontal={false} {...size} data-test="S" />
        <Resizer isVertical isHorizontal {...size} data-test="SE" />
      </div>
    );
  }
}

export default Canvas;
