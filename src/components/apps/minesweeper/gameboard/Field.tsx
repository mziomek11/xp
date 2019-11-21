import React, { CSSProperties } from "react";

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

export const Field: React.FC<Props> = ({
  index,
  minesweeper: { fields, isGameOver }
}) => {
  const { isBomb, checked } = fields[index];
  const props = { style: inlineStyles, baseClassName: baseClass, index };

  return checked || (isGameOver && isBomb) ? (
    <DiscoveredField {...props} data-test="discovered" />
  ) : (
    <HiddenField {...props} data-test="hidden" />
  );
};

export default withContext(Field, "minesweeper");
