import React, { Component } from "react";

import Menu from "../../../menu/Menu";
import Game from "./Game";

import withContext from "../../../../hoc/withContext";
import { MinesweeperContextType, WindowContextType } from "ContextType";

type CtxProps = {
  minesweeper: MinesweeperContextType;
  window: WindowContextType;
};

export class MinesweeperMenu extends Component<CtxProps> {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  shouldComponentUpdate() {
    return false;
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const { window } = this.props;
    if (!window.focused || window.disabled) return;

    const key = e.key.toUpperCase();
    if (["F2"].indexOf(key) === -1) return;

    e.preventDefault();
    if (key === "F2") this.handleNewGameClick();
  };

  handleNewGameClick = () => {
    const { startNewGame, difficulty } = this.props.minesweeper;
    startNewGame(difficulty);
  };

  render() {
    return (
      <Menu data-test="menu">
        <Game onNewGameClick={this.handleNewGameClick} data-test="game" />
      </Menu>
    );
  }
}

export default withContext(
  withContext(MinesweeperMenu, "window"),
  "minesweeper"
);
