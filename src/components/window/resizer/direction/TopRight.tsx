import React from "react";
import Resizer from "../Resizer";

type Props = { id: string };

const WindowTopRightResizer: React.FC<Props> = ({ id }) => {
  return (
    <Resizer id={id} resizesHeight isTop resizesWidth data-test="resizer" />
  );
};

export default WindowTopRightResizer;
