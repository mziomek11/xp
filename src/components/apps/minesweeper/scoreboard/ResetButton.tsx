import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { MinesweeperContextType } from "ContextType";
import { getClassName, areObjectsEqual } from "../../../../utils";

type CtxProps = {
  minesweeper: MinesweeperContextType;
};

export class ResetButton extends Component<CtxProps> {
  shouldComponentUpdate({ minesweeper }: CtxProps) {
    const keysToCheck = ["isGameOver"];
    return !areObjectsEqual(this.props.minesweeper, minesweeper, keysToCheck);
  }

  handleClick = () => {
    const { startNewGame, difficulty } = this.props.minesweeper;

    startNewGame(difficulty);
  };

  getClassName = () => {
    const { isGameOver } = this.props.minesweeper;
    const baseClass = "minesweeper__scoreboard__button";
    const modifiers = {
      sad: isGameOver
    };

    return getClassName(baseClass, modifiers);
  };

  render() {
    const className = this.getClassName();
    return (
      <button
        className={className}
        onClick={this.handleClick}
        data-test="btn"
      />
    );
  }
}

export default withContext(ResetButton, "minesweeper");
