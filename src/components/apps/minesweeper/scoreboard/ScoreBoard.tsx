import React from "react";

import BombsDigital from "./digital/BombsDigital";
import TimeDigital from "./digital/TimeDigital";
import ResetButton from "./ResetButton";

const ScoreBoard = () => {
  return (
    <div className="minesweeper__scoreboard" data-test="scoreboard">
      <BombsDigital data-test="bombs-digital" />
      <ResetButton data-test="btn" />
      <TimeDigital data-test="time-digital" />
    </div>
  );
};

export default ScoreBoard;
