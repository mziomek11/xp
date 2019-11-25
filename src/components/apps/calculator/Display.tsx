import React from "react";

import config from "./config";

type Props = {
  text: string;
  triedToDivideByZero: boolean;
  wrongFunctionArgument: boolean;
  groupingNumber: boolean;
};

const Display: React.FC<Props> = ({
  text,
  triedToDivideByZero,
  wrongFunctionArgument,
  groupingNumber
}) => {
  const shouldBeExponential = text.length > config.maxTextLength;
  if (shouldBeExponential) text = parseFloat(text).toExponential();
  else if (groupingNumber) {
    const dotIndex = text.indexOf(".");
    let beforeDot = text;
    let afterDot = "";

    if (dotIndex > -1) {
      beforeDot = text.substring(0, dotIndex);
      afterDot = text.substring(dotIndex, text.length);
    }

    let newBeforeDot = "";

    for (let i = 0; i < beforeDot.length; i++) {
      newBeforeDot += beforeDot[i];
      if ((beforeDot.length - 1 - i) % 3 === 0 && i !== beforeDot.length - 1) {
        newBeforeDot += " ";
      }
    }

    text = newBeforeDot + afterDot;
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
