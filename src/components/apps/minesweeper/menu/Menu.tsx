import React from "react";

import Menu from "../../../menu/Menu";
import Game from "./Game";

const MinesweeperMenu = () => {
  return (
    <Menu data-test="menu">
      <Game data-test="game" />
    </Menu>
  );
};

export default MinesweeperMenu;
