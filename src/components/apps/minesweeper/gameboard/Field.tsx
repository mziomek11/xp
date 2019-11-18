import React, { Component, CSSProperties } from "react";

import minesweeperConfig from "../config";

const inlineStyles: CSSProperties = {
  width: minesweeperConfig.tileSize,
  height: minesweeperConfig.tileSize
};

class Field extends Component {
  render() {
    return (
      <button
        className="minesweeper__field"
        style={inlineStyles}
        data-test="field"
      />
    );
  }
}

export default Field;
