import React from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import withDoubleClick from "../../hoc/withDoubleClick";
import { open as openWindow } from "../../store/window/actions";
import { OpenData } from "../../store/window/models";
import { Application } from "../../store/models";

type OwnProps = {
  name: string;
  startWindowName: string;
  application: Application;
  openData?: OpenData;
};

type DispatchProps = {
  openWindow: () => void;
};

type DoubleClickProps = {
  checkForDoubleClick: (onDouble: () => void) => void;
};

type Props = OwnProps & DispatchProps & DoubleClickProps;

export const File: React.FC<Props> = ({
  name,
  openWindow,
  checkForDoubleClick
}) => {
  const handleClick = () => checkForDoubleClick(openWindow);

  return (
    <div className="desktop__file" data-test="file" onClick={handleClick}>
      <span data-test="filename">{name}</span>
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

export default connect(
  null,
  mapDispatchToProps
)(withDoubleClick(File));
