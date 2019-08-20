import React from "react";
import Resizer from "../Resizer";

type Props = { id: string };

const WindowBottomLeftResizer: React.FC<Props> = ({ id }) => {
  return (
    <Resizer id={id} resizesHeight resizesWidth isLeft data-test="resizer" />
  );
};

export default WindowBottomLeftResizer;
