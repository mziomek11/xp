import React, { Component, createContext } from "react";

import Vector from "../../../../classes/Vector";
import msConfig from "../config";
import { Field, Difficulty } from "../models";
import { deepCopy } from "../../../../utils";
import {
  generateStartFields,
  makeChecked
} from "../../../../utils/minesweeper";

type State = {
  difficulty: Difficulty;
  isGameOver: boolean;
  boardSize: Vector;
  fields: Field[];
  destroyedBombIndex: number;
  bombsLeft: number;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
type GameOver = { onGameOver: (index: number) => void };
type CheckField = { checkField: (index: number) => void };
type StartGame = { startNewGame: (difficult: Difficulty) => void };
type ToggleFlag = { toggleFlag: (index: number) => void };
export type Context = State &
  SetState &
  GameOver &
  CheckField &
  StartGame &
  ToggleFlag;

const MinesweeperContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<{}, State> {
  readonly state: State = {
    difficulty: "easy",
    isGameOver: false,
    boardSize: msConfig.gameBoardOptions.easy.size,
    fields: generateStartFields(msConfig.gameBoardOptions.easy),
    bombsLeft: msConfig.gameBoardOptions.easy.bombCount,
    destroyedBombIndex: 0
  };

  getContextValue = (): Context => {
    return {
      ...this.state,
      setContext: (data: SetStateData) => this.setState(data as any),
      onGameOver: this.onGameOver,
      checkField: this.checkField,
      startNewGame: this.startNewGame,
      toggleFlag: this.toggleFlag
    };
  };

  onGameOver = (index: number) => {
    this.setState({ isGameOver: true, destroyedBombIndex: index });
  };

  startNewGame = (difficulty: Difficulty) => {
    const options = msConfig.gameBoardOptions[difficulty];
    const newFields = generateStartFields(options);

    this.setState({
      isGameOver: false,
      boardSize: options.size,
      fields: newFields,
      bombsLeft: options.bombCount
    });
  };

  checkField = (index: number) => {
    const { fields, boardSize } = this.state;
    const newFields = deepCopy<Field[]>(fields);

    makeChecked(boardSize, newFields, index);
    this.setState({ fields: newFields });
  };

  toggleFlag = (index: number) => {
    const { fields, bombsLeft } = this.state;
    const newFields = deepCopy<Field[]>(fields);

    const newBombsLeft = bombsLeft + (newFields[index].flagged ? 1 : -1);
    if (newBombsLeft < 0) return;

    newFields[index].flagged = !newFields[index].flagged;
    this.setState({ fields: newFields, bombsLeft: newBombsLeft });
  };

  render() {
    const contextValue = this.getContextValue();
    return (
      <MinesweeperContext.Provider value={contextValue} data-test="context">
        {this.props.children}
      </MinesweeperContext.Provider>
    );
  }
}

export const Provider = ContextProvider;

export default MinesweeperContext;
