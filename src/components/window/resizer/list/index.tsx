import React from "react";
import Resizer from "../";

type Props = {
  id: string;
};

const ResizerList: React.FC<Props> = ({ id }) => {
  const getResizerProps = (
    resizesWidth: boolean,
    isLeft: boolean,
    isBottom: boolean
  ) => ({ id, resizesWidth, isLeft, isBottom });

  return (
    <React.Fragment>
      <Resizer {...getResizerProps(true, true, false)} data-test="W" />
      <Resizer {...getResizerProps(true, true, true)} data-test="SW" />
      <Resizer {...getResizerProps(false, false, true)} data-test="S" />
      <Resizer {...getResizerProps(true, false, true)} data-test="SE" />
      <Resizer {...getResizerProps(true, false, false)} data-test="E" />
    </React.Fragment>
  );
};

export default ResizerList;
