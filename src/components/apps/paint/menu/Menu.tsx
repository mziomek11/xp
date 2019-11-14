import React, { Component } from "react";
import uuid from "uuid";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Menu from "../../../menu/Menu";
import SaveableFile from "../../../menu/SaveableFile";
import View from "./View";
import Image from "./Image";
import withContext from "../../../../hoc/withContext";
import { PaintContextType, WindowContextType } from "ContextType";
import { updateContent } from "../../../../store/filesystem/actions";
import { replace } from "../../../../store/window/actions";
import { Window } from "../../../../store/window/models";
import { getIcon } from "../../../../icons";

type DispatchProps = {
  update: (path: string[], fileName: string, content: ImageData) => void;
  replace: (id: string, window: Window) => void;
};

type CtxProps = {
  paint: PaintContextType;
  window: WindowContextType;
};

type Props = DispatchProps & CtxProps;

export class PaintMenu extends Component<Props> {
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
      name: "Untilted Paint",
      application: "paint",
      icon: getIcon("paint"),
      minimalized: false,
      openData: {
        content: undefined,
        path: undefined
      }
    };
    replace(window.id, newWindow);
  };

  handleOpenClick = () => {
    const { window, paint } = this.props;
    window.setContext!({ disabled: true });
    paint.setContext!({ isOpening: true });
  };

  handleSaveAsClick = () => {
    const { window, paint } = this.props;
    window.setContext!({ disabled: true });
    paint.setContext!({ isSaving: true });
  };

  handleSaveClick = () => {
    const { update, paint, window } = this.props;

    if (paint.path) {
      const imageData = paint.getImageData();
      update(paint.path, window.name, imageData);
    } else this.handleSaveAsClick();
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
        <SaveableFile
          onNewClick={this.handleNewClick}
          onOpenClick={this.handleOpenClick}
          onSaveClick={this.handleSaveClick}
          onCloseClick={this.handleCloseClick}
          onSaveAsClick={this.handleSaveAsClick}
          data-test="file"
        />
        <View data-test="view" />
        <Image data-test="image" />
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
)(withContext(withContext(PaintMenu, "window"), "paint"));
