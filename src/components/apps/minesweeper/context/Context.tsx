import React, { Component, createContext } from "react";

import Vector from "../../../../classes/Vector";
import msConfig from "../config";
import { Field } from "../models";
import {
  generateStartFields,
  makeChecked
} from "../../../../utils/minesweeper";
import { deepCopy } from "../../../../utils";

type State = {
  isGameOver: boolean;
  boardSize: Vector;
  fields: Field[];
  bombsLeft: number;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
type GameOver = { onGameOver: VoidFunction };
type CheckField = { checkField: (index: number) => void };
export type Context = State & SetState & GameOver & CheckField;

const MinesweeperContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<{}, State> {
  readonly state: State = {
    isGameOver: false,
    boardSize: msConfig.gameBoardOptions.easy.size,
    fields: generateStartFields(msConfig.gameBoardOptions.easy),
    bombsLeft: msConfig.gameBoardOptions.easy.bombCount
  };

  getContextValue = (): Context => {
    return {
      ...this.state,
      setContext: (data: SetStateData) => this.setState(data as any),
      onGameOver: this.onGameOver,
      checkField: this.checkField
    };
  };

  onGameOver = () => {
    this.setState({ isGameOver: true });
  };

  checkField = (index: number) => {
    const { fields, boardSize } = this.state;
    const newFields = deepCopy<Field[]>(fields);

    makeChecked(boardSize, newFields, index);
    this.setState({ fields: newFields });
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
