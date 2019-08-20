import React from "react";

import TopLeftResizer from "./direction/TopLeft";
import TopResizer from "./direction/Top";
import TopRightResizer from "./direction/TopRight";
import RightResizer from "./direction/Right";
import BottomRightResizer from "./direction/BottomRight";
import BottomResizer from "./direction/Bottom";
import BottomLeftResizer from "./direction/BottomLeft";
import LeftResizer from "./direction/Left";

type Props = {
  id: string;
};

class ResizerList extends React.Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { id } = this.props;
    return (
      <>
        <TopLeftResizer id={id} data-test="NW" />
        <TopResizer id={id} data-test="N" />
        <TopRightResizer id={id} data-test="NE" />
        <RightResizer id={id} data-test="E" />
        <BottomRightResizer id={id} data-test="SE" />
        <BottomResizer id={id} data-test="S" />
        <BottomLeftResizer id={id} data-test="SW" />
        <LeftResizer id={id} data-test="W" />
      </>
    );
  }
}

export default ResizerList;
