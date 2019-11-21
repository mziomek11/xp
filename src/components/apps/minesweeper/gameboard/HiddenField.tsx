import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { MinesweeperContextType } from "ContextType";
import { getClassName } from "../../../../utils";
import { FieldProps } from "./Field";

type CtxProps = {
  minesweeper: MinesweeperContextType;
};

type Props = FieldProps & CtxProps;

export class HiddenField extends Component<Props> {
  shouldComponentUpdate({ minesweeper: { fields }, index }: Props) {
    const { props } = this;
    if (props.index !== index) return true;
    if (!fields[index]) return true;
    if (props.minesweeper.fields[props.index].flagged !== fields[index].flagged)
      return true;

    return false;
  }

  handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { minesweeper, index } = this.props;
    const { fields, isGameOver, onGameOver, checkField } = minesweeper;
    const { isBomb, flagged } = fields[index];

    if (isGameOver || e.button === 2 || flagged) return;

    if (isBomb) onGameOver(index);
    checkField(index);
  };

  handleContextMenu = (e: any) => {
    e.preventDefault();
    const { minesweeper, index } = this.props;

    minesweeper.toggleFlag(index);
  };

  getClassName = () => {
    const { index, minesweeper, baseClassName } = this.props;
    const modifiers = { flag: minesweeper.fields[index].flagged };
    const defaultModifiers = ["hidden"];

    return getClassName(baseClassName, modifiers, defaultModifiers);
  };

  render() {
    const className = this.getClassName();

    return (
      <button
        className={className}
        data-test="hidden"
        onMouseUp={this.handleMouseUp}
        onContextMenu={this.handleContextMenu}
        style={this.props.style}
      />
    );
  }
}

export default withContext(HiddenField, "minesweeper");
