import React from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { open as openWindow } from "../../../../../store/window/actions";
import { OpenData } from "../../../../../store/window/models";
import { Application } from "../../../../../store/models";
import { getIcon } from "../../../../../icons";
import { getClassName } from "../../../../../utils";

type OwnProps = {
  startWindowName: string;
  application: Application;
  openData?: OpenData;
  name: string;
  isBold?: boolean;
  isRight?: boolean;
  image?: string;
};

type DispatchProps = {
  openWindow: () => void;
};

type Props = OwnProps & DispatchProps;

export const StartApplication: React.FC<Props> = ({
  name,
  openWindow,
  application,
  image,
  isBold = false,
  isRight = false
}) => {
  const appClassName = getClassName("start__application", { right: isRight });
  const textClassName = getClassName("start__application__text", {
    bold: isBold
  });
  return (
    <div className={appClassName} onClick={openWindow} data-test="app">
      <div className="start__application__icon-container">
        <img
          src={image ? image : getIcon(application)}
          alt="app"
          className="start__application__icon"
        />
      </div>
      <span className={textClassName}>{name}</span>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { startWindowName, application, openData }: OwnProps
): DispatchProps => ({
  openWindow: () =>
    dispatch(openWindow(uuid(), application, startWindowName, openData))
});

export default connect(null, mapDispatchToProps)(StartApplication);
