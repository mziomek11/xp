import React from "react";
import Resizer from "../Resizer";

type Props = { id: string };

const WindowRightResizer: React.FC<Props> = ({ id }) => {
  return <Resizer id={id} resizesWidth data-test="resizer" />;
};

export default WindowRightResizer;
