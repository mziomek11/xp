import React, { Component } from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import withDoubleClick from "../../hoc/withDoubleClick";
import withContext from "../../hoc/withContext";
import desktopConfig from "./config";
import { open as openWindow } from "../../store/window/actions";
import { OpenData } from "../../store/window/models";
import { Application } from "../../store/models";
import { DesktopContextType } from "ContextType";
import { getIcon } from "../../icons";
import { getClassName } from "../../utils";

type OwnProps = {
  name: string;
  id: number;
  startWindowName: string;
  application: Application;
  openData?: OpenData;
};

type CtxProps = {
  desktop: DesktopContextType;
};

type DispatchProps = {
  openWindow: () => void;
};

type DoubleClickProps = {
  checkForDoubleClick: (onDouble: () => void) => boolean;
};

type Props = OwnProps & DispatchProps & DoubleClickProps & CtxProps;

export class File extends Component<Props> {
  handleClick = () => {
    const { checkForDoubleClick, openWindow, desktop, id } = this.props;
    const { setContext } = desktop;

    const isSecondClick = checkForDoubleClick(openWindow);
    if (isSecondClick) setContext({ focusedIds: [] });
    else setContext({ focusedIds: [id] });
  };

  getInlineStyles = (): React.CSSProperties => ({
    width: desktopConfig.fileSize,
    height: desktopConfig.fileSize,
    margin: desktopConfig.fileMargin
  });

  render() {
    const { application, desktop, id, name } = this.props;
    const focused = desktop.focusedIds.indexOf(id) > -1;
    const fileClassName = getClassName("desktop__file", { focused });
    const inlineStyles = this.getInlineStyles();

    return (
      <div
        className={fileClassName}
        style={inlineStyles}
        data-test="file"
        onClick={this.handleClick}
      >
        <div className="desktop__file__image-container">
          <img
            src={getIcon(application, focused)}
            className="desktop__file__image"
            alt={application}
          />
        </div>
        <span className="desktop__file__text">{name}</span>
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { startWindowName, application, openData }: OwnProps
): DispatchProps => ({
  openWindow: () =>
    dispatch(openWindow(uuid(), application, startWindowName, openData))
});

export default connect(
  null,
  mapDispatchToProps
)(withDoubleClick(withContext(File, "desktop")));
