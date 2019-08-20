import React from "react";
import Resizer from "../Resizer";

type Props = { id: string };

const WindowLeftResizer: React.FC<Props> = ({ id }) => {
  return <Resizer id={id} resizesWidth isLeft data-test="resizer" />;
};

export default WindowLeftResizer;
