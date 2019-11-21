import React, { Component } from "react";

import withContext from "../../../hoc/withContext";
import { getClassName } from "../../../utils";
import { MinesweeperContextType } from "ContextType";

import Menu from "./menu/Menu";
import ScoreBoard from "./scoreboard/ScoreBoard";
import GameBoard from "./gameboard/GameBoard";

type CtxProps = {
  minesweeper: MinesweeperContextType;
};

type State = {
  isPressing: boolean;
};

export class Minesweeper extends Component<CtxProps, State> {
  readonly state: State = {
    isPressing: false
  };

  shouldComponentUpdate(
    { minesweeper: { isGameOver } }: CtxProps,
    { isPressing }: State
  ) {
    return (
      this.props.minesweeper.isGameOver !== isGameOver ||
      this.state.isPressing !== isPressing
    );
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 2) return;
    this.setState({ isPressing: true });
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseUp = () => {
    this.setState({ isPressing: false });
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  handleContextMenu = (e: any) => {
    e.preventDefault();
  };

  getContentClassName = () => {
    const { isGameOver } = this.props.minesweeper;
    const baseClass = "minesweeper__content";
    const modifiers = { pressing: this.state.isPressing && !isGameOver };

    return getClassName(baseClass, modifiers);
  };

  render() {
    const contentClass = this.getContentClassName();

    return (
      <div className="minesweeper" data-test="minesweeper">
        <Menu data-test="menu" />
        <div
          className={contentClass}
          onMouseDown={this.handleMouseDown}
          onContextMenu={this.handleContextMenu}
        >
          <ScoreBoard data-test="scoreboard" />
          <GameBoard data-test="gameboard" />
        </div>
      </div>
    );
  }
}

export default withContext(Minesweeper, "minesweeper");
