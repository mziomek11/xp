import React, { Component, CSSProperties } from "react";

import minesweeperConfig from "../config";
import withContext from "../../../../hoc/withContext";
import { MinesweeperContextType } from "ContextType";
import { areObjectsEqual, getClassName } from "../../../../utils";

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
  private baseClass: string = "minesweeper__field";
  shouldComponentUpdate({ minesweeper, index }: Props) {
    if (this.props.index !== index) return true;
    if (this.props.minesweeper.isGameOver !== minesweeper.isGameOver)
      return true;

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

    if (isBomb) onGameOver(index);
    checkField(index);
  };

  getFieldDivClassName = () => {
    const { minesweeper, index } = this.props;
    const { fields, isGameOver, destroyedBombIndex } = minesweeper;
    const { isBomb, bombsNear, checked } = fields[index];

    const shouldBeBomb = isBomb && (checked || isGameOver);
    const modifiers = {
      checked: checked || (isGameOver && isBomb),
      bomb: shouldBeBomb && index !== destroyedBombIndex,
      "destroyed-bomb": shouldBeBomb && index === destroyedBombIndex
    };

    const defaultModifiers = [];

    if (checked && bombsNear > 0) defaultModifiers.push(`num${bombsNear}`);

    return getClassName(this.baseClass, modifiers, defaultModifiers);
  };

  render() {
    const { minesweeper, index } = this.props;
    const { fields, isGameOver } = minesweeper;
    const { isBomb, checked } = fields[index];

    return checked || (isGameOver && isBomb) ? (
      <div
        className={this.getFieldDivClassName()}
        style={inlineStyles}
        data-test="field-div"
      />
    ) : (
      <button
        className={this.baseClass}
        style={inlineStyles}
        data-test="field-btn"
        onClick={this.handleClick}
      />
    );
  }
}

export default withContext(Field, "minesweeper");
