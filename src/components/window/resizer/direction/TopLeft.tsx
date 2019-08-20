import React from "react";
import Resizer from "../Resizer";

type Props = { id: string };

const WindowTopLeftResizer: React.FC<Props> = ({ id }) => {
  return (
    <Resizer
      id={id}
      resizesHeight
      isTop
      resizesWidth
      isLeft
      data-test="resizer"
    />
  );
};

export default WindowTopLeftResizer;
