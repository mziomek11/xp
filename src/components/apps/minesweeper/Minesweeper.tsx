import React from "react";

import Menu from "./menu/Menu";
import ScoreBoard from "./scoreboard/ScoreBoard";
import GameBoard from "./gameboard/GameBoard";

const Minesweeper = () => {
  return (
    <div className="minesweeper" data-test="minesweeper">
      <Menu data-test="menu" />
      <div className="minesweeper__content">
        <ScoreBoard data-test="scoreboard" />
        <GameBoard data-test="gameboard" />
      </div>
    </div>
  );
};

export default Minesweeper;
