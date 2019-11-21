import React from "react";

import Digit from "./Digit";
import { splitNumberIntoThreeStringDigits } from "../../../../../utils/minesweeper";

type Props = {
  number: number;
};

const Digital: React.FC<Props> = ({ number }) => {
  const digits = splitNumberIntoThreeStringDigits(number);

  return (
    <div className="minesweeper__digital" data-test="digital">
      {digits.map((digit, i) => (
        <Digit digit={digit} key={i} data-test="digit" />
      ))}
    </div>
  );
};

export default Digital;
