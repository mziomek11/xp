import React from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import withDoubleClick from "../../hoc/withDoubleClick";
import { open as openWindow } from "../../store/window/actions";
import { Application } from "../../store/models";
import { FileType } from "../../store/filesystem/models";

type OwnProps = {
  name: string;
  application: Application;
  type: FileType;
  top: number;
  left: number;
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
  top,
  left,
  openWindow,
  checkForDoubleClick
}) => {
  const handleClick = () => checkForDoubleClick(openWindow);

  return (
    <div
      className="file"
      style={{ left, top }}
      data-test="file"
      onClick={handleClick}
    >
      <span data-test="filename">{name}</span>
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { name, application, type }: OwnProps
): DispatchProps => ({
  openWindow: () => dispatch(openWindow(uuid(), application, name, type))
});

export default connect(
  null,
  mapDispatchToProps
)(withDoubleClick(File));
