import React, { Component } from "react";

import Field from "./Field";
import withContext from "../../../../hoc/withContext";
import { MinesweeperContextType } from "ContextType";

type CtxProps = {
  minesweeper: MinesweeperContextType;
};

export class GameBoard extends Component<CtxProps> {
  shouldComponentUpdate({ minesweeper }: CtxProps) {
    return this.props.minesweeper.fields.length !== minesweeper.fields.length;
  }

  render() {
    const fieldCount = this.props.minesweeper.fields.length;

    return (
      <div className="minesweeper__gameboard" data-test="gameboard">
        {new Array(fieldCount).fill(0).map((_, i) => (
          <Field index={i} key={i} data-test="field" />
        ))}
      </div>
    );
  }
}

export default withContext(GameBoard, "minesweeper");
