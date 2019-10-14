import React from "react";

import ColorRect from "./Rect";
import colors from "../colors";

const List = () => {
  return (
    <ul className="paint__color__list" data-test="list">
      {colors.map(hex => (
        <ColorRect hex={hex} key={hex} data-test="rect" />
      ))}
    </ul>
  );
};

export default List;
