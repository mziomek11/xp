import React from "react";

import Digital from "./Digital";
import ResetButton from "./ResetButton";

const ScoreBoard = () => {
  return (
    <div className="minesweeper__scoreboard" data-test="scoreboard">
      <Digital number={456} data-test="digital" />
      <ResetButton data-test="btn" />
      <Digital number={92} data-test="digital" />
    </div>
  );
};

export default ScoreBoard;
