import React from "react";

import * as DirectionResizer from "./Direction";

class ResizerList extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <>
        <DirectionResizer.TopLeft data-test="NW" />
        <DirectionResizer.Top data-test="N" />
        <DirectionResizer.TopRight data-test="NE" />
        <DirectionResizer.Right data-test="E" />
        <DirectionResizer.BottomRight data-test="SE" />
        <DirectionResizer.Bottom data-test="S" />
        <DirectionResizer.BottomLeft data-test="SW" />
        <DirectionResizer.Left data-test="W" />
      </>
    );
  }
}

export default ResizerList;
