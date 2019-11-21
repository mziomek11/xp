import React from "react";

import withContext from "../../../../hoc/withContext";
import { MinesweeperContextType } from "ContextType";
import { getClassName } from "../../../../utils";
import { FieldProps } from "./Field";

type CtxProps = {
  minesweeper: MinesweeperContextType;
};

type Props = FieldProps & CtxProps;

export const DiscoveredField: React.FC<Props> = ({
  style,
  baseClassName,
  index,
  minesweeper: { isGameOver, destroyedBombIndex, fields }
}) => {
  const { isBomb, checked, bombsNear, flagged } = fields[index];
  const shouldBeBomb = isBomb && !flagged && (checked || isGameOver);
  const modifiers = {
    checked: checked || (isGameOver && isBomb && !flagged),
    bomb: shouldBeBomb && index !== destroyedBombIndex,
    "destroyed-bomb": shouldBeBomb && index === destroyedBombIndex,
    flag: isGameOver && flagged,
    hidden: isGameOver && flagged
  };

  const defaultModifiers = [];
  if (checked && bombsNear > 0) defaultModifiers.push(`num${bombsNear}`);

  const className = getClassName(baseClassName, modifiers, defaultModifiers);

  return <div className={className} data-test="field" style={style} />;
};

export default withContext(DiscoveredField, "minesweeper");
