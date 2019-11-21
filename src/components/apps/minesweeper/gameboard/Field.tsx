import React, { CSSProperties, Component } from "react";

import minesweeperConfig from "../config";
import withContext from "../../../../hoc/withContext";
import { MinesweeperContextType } from "ContextType";

import HiddenField from "./HiddenField";
import DiscoveredField from "./DiscoveredField";

const inlineStyles: CSSProperties = {
  width: minesweeperConfig.tileSize,
  height: minesweeperConfig.tileSize
};

export type FieldProps = {
  index: number;
  baseClassName: string;
  style: CSSProperties;
};

type OwnProps = {
  index: number;
};

type CtxProps = {
  minesweeper: MinesweeperContextType;
};

type Props = OwnProps & CtxProps;

const baseClass: string = "minesweeper__field";

export class Field extends Component<Props> {
  shouldComponentUpdate({ index, minesweeper: { isGameOver, fields } }: Props) {
    if (this.props.index !== index) return true;
    if (this.props.minesweeper.isGameOver !== isGameOver) return true;

    const currentObj = this.props.minesweeper.fields[this.props.index];
    const nextObj = fields[index];

    if (!nextObj) return true;
    if (currentObj.checked !== nextObj.checked) return true;
    if (currentObj.isBomb !== nextObj.isBomb) return true;

    return false;
  }

  render() {
    const { index, minesweeper } = this.props;
    const { fields, isGameOver } = minesweeper;
    const { isBomb, checked } = fields[index];
    const props = { style: inlineStyles, baseClassName: baseClass, index };

    return checked || (isGameOver && isBomb) ? (
      <DiscoveredField {...props} data-test="discovered" />
    ) : (
      <HiddenField {...props} data-test="hidden" />
    );
  }
}

export default withContext(Field, "minesweeper");
