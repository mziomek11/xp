import React from "react";

import Field from "./Field";
import minesweeperConfig from "../config";

const GameBoard = () => {
  return (
    <div className="minesweeper__gameboard" data-test="gameboard">
      {new Array(
        minesweeperConfig.gameBoardSize.easy.x *
          minesweeperConfig.gameBoardSize.easy.y
      )
        .fill(0)
        .map((x, i) => (
          <Field key={i} />
        ))}
    </div>
  );
};

export default GameBoard;
