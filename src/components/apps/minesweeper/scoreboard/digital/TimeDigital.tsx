import React, { Component } from "react";

import withContext from "../../../../../hoc/withContext";
import { MinesweeperContextType } from "ContextType";

import Digital from "./Digital";

type CtxProps = {
  minesweeper: MinesweeperContextType;
};

type State = {
  time: number;
};

export class TimeDigital extends Component<CtxProps, State> {
  private interval: NodeJS.Timeout | null = null;

  readonly state: State = {
    time: 0
  };

  componentWillUnmount() {
    this.clearInterval();
  }

  componentDidUpdate(prev: CtxProps) {
    const { gameStarted, isGameOver } = this.props.minesweeper;
    if (!prev.minesweeper.gameStarted && gameStarted) this.startInterval();
    else if (!prev.minesweeper.isGameOver && isGameOver) this.clearInterval();
    else if (prev.minesweeper.isGameOver && !isGameOver) this.resetTime();
  }

  startInterval = () => {
    this.interval = setInterval(this.addSecond, 1000);
  };

  addSecond = () => {
    if (this.state.time === 999) return;
    this.setState((oldState: State) => ({ time: oldState.time + 1 }));
  };

  clearInterval = () => {
    if (this.interval) clearInterval(this.interval);
  };

  resetTime = () => this.setState({ time: 0 });

  render() {
    return <Digital number={this.state.time} data-test="digital" />;
  }
}
export default withContext(TimeDigital, "minesweeper");
