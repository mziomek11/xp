import React from "react";

import config from "./config";

type Props = {
  text: string;
  triedToDivideByZero: boolean;
  wrongFunctionArgument: boolean;
};

const Display: React.FC<Props> = ({
  text,
  triedToDivideByZero,
  wrongFunctionArgument
}) => {
  if (text.length > config.maxTextLength) {
    text = parseFloat(text).toExponential();
  }

  text = text.replace(".", ",");

  return (
    <div className="calculator__display" data-test="display">
      {triedToDivideByZero
        ? "Cannot be divided by zero"
        : wrongFunctionArgument
        ? "Wrong function argument"
        : text}
    </div>
  );
};

export default Display;
