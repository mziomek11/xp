import React from "react";
import Resizer from "../Resizer";

type Props = { id: string };

const WindowTopResizer: React.FC<Props> = ({ id }) => {
  return <Resizer id={id} resizesHeight isTop data-test="resizer" />;
};

export default WindowTopResizer;
