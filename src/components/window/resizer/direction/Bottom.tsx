import React from "react";
import Resizer from "../Resizer";

type Props = { id: string };

const WindowBottomResizer: React.FC<Props> = ({ id }) => {
  return <Resizer id={id} resizesHeight data-test="resizer" />;
};

export default WindowBottomResizer;
