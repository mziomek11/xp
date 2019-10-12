import React, { Component } from "react";
import uuid from "uuid";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Menu from "../../../menu/Menu";
import File from "./File";
import Format from "./Format";
import withContext from "../../../../hoc/withContext";
import { NotepadContextType, WindowContextType } from "ContextType";
import { TextContent } from "../../../../store/filesystem/models";
import { updateContent } from "../../../../store/filesystem/actions";
import { replace } from "../../../../store/window/actions";
import { Window } from "../../../../store/window/models";
import { getIcon } from "../../../../icons";

type DispatchProps = {
  update: (path: string[], fileName: string, content: TextContent) => void;
  replace: (id: string, window: Window) => void;
};

type CtxProps = {
  notepad: NotepadContextType;
  window: WindowContextType;
};

type Props = DispatchProps & CtxProps;

export class NotepadMenu extends Component<Props, {}> {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  shouldComponentUpdate() {
    return false;
  }

  handleNewClick = () => {
    const { replace, window } = this.props;
    const newWindow: Window = {
      id: uuid(),
      name: "Untilted Notepad",
      application: "notepad",
      icon: getIcon("notepad"),
      minimalized: false,
      openData: {
        content: "",
        path: undefined
      }
    };
    replace(window.id, newWindow);
  };

  handleOpenClick = () => {
    const { window, notepad } = this.props;
    window.setContext!({ disabled: true });
    notepad.setContext!({ isOpening: true });
  };

  handleSaveAsClick = () => {
    const { window, notepad } = this.props;
    window.setContext!({ disabled: true });
    notepad.setContext!({ isSaving: true });
  };

  handleSaveClick = () => {
    const { update, notepad, window } = this.props;
    if (!notepad.path) this.handleSaveAsClick();
    else update(notepad.path, window.name, notepad.text);
  };

  handleCloseClick = () => {
    this.props.window.close();
  };

  handleKeyDown = (e: KeyboardEvent) => {
    const { window } = this.props;
    if (!window.focused || window.disabled || !e.ctrlKey) return;

    const key = e.key.toUpperCase();
    if (["N", "O", "S"].indexOf(key) === -1) return;

    e.preventDefault();
    if (key === "N") this.handleNewClick();
    else if (key === "O") this.handleOpenClick();
    else if (key === "S") this.handleSaveClick();
  };

  render() {
    return (
      <Menu data-test="menu">
        <File
          onNewClick={this.handleNewClick}
          onOpenClick={this.handleOpenClick}
          onSaveClick={this.handleSaveClick}
          onCloseClick={this.handleCloseClick}
          onSaveAsClick={this.handleSaveAsClick}
          data-test="file"
        />
        <Format data-test="format" />
      </Menu>
    );
  }
}

const mapDisptachToProps = (dispatch: Dispatch): DispatchProps => ({
  update: (path, file, content) => dispatch(updateContent(path, file, content)),
  replace: (id, window) => dispatch(replace(id, window))
});

export default connect(
  null,
  mapDisptachToProps
)(withContext(withContext(NotepadMenu, "window"), "notepad"));
