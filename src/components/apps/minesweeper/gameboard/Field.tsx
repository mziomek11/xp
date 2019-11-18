import React, { Component, CSSProperties } from "react";

import minesweeperConfig from "../config";
import withContext from "../../../../hoc/withContext";
import { MinesweeperContextType } from "ContextType";
import { areObjectsEqual } from "../../../../utils";

const inlineStyles: CSSProperties = {
  width: minesweeperConfig.tileSize,
  height: minesweeperConfig.tileSize
};

type OwnProps = {
  index: number;
};

type CtxProps = {
  minesweeper: MinesweeperContextType;
};

type Props = OwnProps & CtxProps;

export class Field extends Component<Props> {
  shouldComponentUpdate({ minesweeper, index }: Props) {
    if (this.props.index !== index) return true;

    const currField = this.props.minesweeper.fields[this.props.index];
    const nextField = minesweeper.fields[index];
    const keysToCheck = ["isBomb", "checked", "bombsNear"];

    return !areObjectsEqual(currField, nextField, keysToCheck);
  }

  handleClick = () => {
    const { minesweeper, index } = this.props;
    const { fields, isGameOver, onGameOver, checkField } = minesweeper;
    const { isBomb } = fields[index];

    if (isGameOver) return;

    if (isBomb) onGameOver();
    checkField(index);
  };

  render() {
    const { minesweeper, index } = this.props;
    const { isBomb, bombsNear, checked } = minesweeper.fields[index];

    return !checked ? (
      <button
        className="minesweeper__field"
        style={inlineStyles}
        data-test="field-btn"
        onClick={this.handleClick}
      />
    ) : (
      <div
        className="minesweeper__field--checked"
        style={inlineStyles}
        data-test="field-div"
      >
        {isBomb ? "b" : bombsNear}
      </div>
    );
  }
}

export default withContext(Field, "minesweeper");
