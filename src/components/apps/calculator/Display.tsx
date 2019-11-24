import React from "react";

import config from "./config";

type Props = {
  text: string;
  triedToDivideByZero: boolean;
};

const Display: React.FC<Props> = ({ text, triedToDivideByZero }) => {
  if (text.length > config.maxTextLength) {
    text = parseFloat(text).toExponential();
  }

  text = text.replace(".", ",");

  return (
    <div className="calculator__display" data-test="display">
      {triedToDivideByZero ? "Cannot be divided by zero" : text}
    </div>
  );
};

export default Display;
