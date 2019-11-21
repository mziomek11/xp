import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { MinesweeperContextType, WindowContextType } from "ContextType";
import { Difficulty } from "../models";
import { getMinesweeperSize } from "../../../../utils/minesweeper";
import { getWindowNoResizableMinMaxProps } from "../../../../utils/window";

import MenuItem from "../../../menu/Item";
import { DropDown, Divider, OptionCheckBox, Option } from "../../../dropdown";

type CtxProps = {
  minesweeper: MinesweeperContextType;
  window: WindowContextType;
};

type OwnProps = {
  onNewGameClick: VoidFunction;
};

type Props = OwnProps & CtxProps;

export class Game extends Component<Props> {
  shouldComponentUpdate({ minesweeper: { difficulty } }: Props) {
    return this.props.minesweeper.difficulty !== difficulty;
  }

  handleBeginnerClick = () => this.handleLevelClick("easy");
  handleIntermediateClick = () => this.handleLevelClick("medium");
  handleExpertClick = () => this.handleLevelClick("hard");

  handleLevelClick = (diff: Difficulty) => {
    const { difficulty, startNewGame } = this.props.minesweeper;

    if (difficulty !== diff) this.updateWindowSize(diff);
    startNewGame(diff);
  };

  updateWindowSize = (difficulty: Difficulty) => {
    const { setContext } = this.props.window;
    const windowProps = this.getWindowProps(difficulty);

    setContext(windowProps);
  };

  getWindowProps = (difficulty: Difficulty) => {
    const { x, y } = getMinesweeperSize(difficulty);
    const minMax = getWindowNoResizableMinMaxProps(x, y);

    return {
      width: minMax.minWidth,
      height: minMax.minHeight,
      ...minMax
    };
  };

  render() {
    const { onNewGameClick, window, minesweeper } = this.props;
    const { difficulty } = minesweeper;
    const dropDown = (
      <DropDown withShortcuts>
        <Option name="New" shortcut={["F2"]} onClick={onNewGameClick} />
        <Divider />
        <OptionCheckBox
          name="Beginner"
          isChecked={difficulty === "easy"}
          onClick={this.handleBeginnerClick}
        />
        <OptionCheckBox
          name="Intermediate"
          isChecked={difficulty === "medium"}
          onClick={this.handleIntermediateClick}
        />
        <OptionCheckBox
          name="Expert"
          isChecked={difficulty === "hard"}
          onClick={this.handleExpertClick}
        />
        <Divider />
        <Option name="Close" onClick={window.close} />
      </DropDown>
    );
    return <MenuItem name="Game" dropdown={dropDown} data-test="game" />;
  }
}

export default withContext(withContext(Game, "window"), "minesweeper");
