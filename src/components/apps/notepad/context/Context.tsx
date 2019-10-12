import React, { Component, createContext } from "react";

type Path = string[] | undefined;

type OwnProps = {
  startText: string;
  startPath: Path;
};

type State = {
  isSaving: boolean;
  isOpening: boolean;
  text: string;
  path: Path;
  wordWrap: boolean;
};

type SetStateData = Partial<State>;
type SetState = { setContext: (data: SetStateData) => void };
export type Context = State & SetState;

const NotepadContext = createContext<Partial<Context>>({});

export class ContextProvider extends Component<OwnProps, State> {
  readonly state: State = {
    isSaving: false,
    isOpening: false,
    text: this.props.startText,
    path: this.props.startPath,
    wordWrap: false
  };

  getContextValue = (): Context => {
    return {
      ...this.state,
      setContext: (data: SetStateData) => this.setState(data as any)
    };
  };

  render() {
    const contextValue = this.getContextValue();
    return (
      <NotepadContext.Provider value={contextValue} data-test="context">
        {this.props.children}
      </NotepadContext.Provider>
    );
  }
}

export const Provider = ContextProvider;

export default NotepadContext;
