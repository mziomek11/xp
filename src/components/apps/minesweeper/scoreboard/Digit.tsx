import React from "react";
import { getClassName } from "../../../../utils";

type Props = {
  digit: string;
};

const baseClass = "minesweeper__digital__number";

const Digit: React.FC<Props> = ({ digit }) => {
  const className = getClassName(baseClass, {}, [digit]);

  return <div className={className} data-test="digit" />;
};

export default Digit;
