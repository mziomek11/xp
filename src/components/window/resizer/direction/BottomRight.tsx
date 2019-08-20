import React from "react";
import Resizer from "../Resizer";

type Props = { id: string };

const WindowBottomRightResizer: React.FC<Props> = ({ id }) => {
  return <Resizer id={id} resizesHeight resizesWidth data-test="resizer" />;
};

export default WindowBottomRightResizer;
