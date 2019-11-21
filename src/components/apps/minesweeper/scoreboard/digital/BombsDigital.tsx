import React, { Component } from "react";

import withContext from "../../../../../hoc/withContext";
import { MinesweeperContextType } from "ContextType";

import Digital from "./Digital";

type CtxProps = {
  minesweeper: MinesweeperContextType;
};

export class BombsDigital extends Component<CtxProps> {
  shouldComponentUpdate({ minesweeper: { bombsLeft } }: CtxProps) {
    return this.props.minesweeper.bombsLeft !== bombsLeft;
  }

  render() {
    return (
      <Digital number={this.props.minesweeper.bombsLeft} data-test="digital" />
    );
  }
}

export default withContext(BombsDigital, "minesweeper");
