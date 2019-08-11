import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Action from "../";
import { toggleFullscreen as fullscreenWindow } from "../../../../store/window/actions";

type OwnProps = {
  id: string;
};

type DispatchProps = {
  fullscreenWindow: () => void;
};

type Props = OwnProps & DispatchProps;

export const FullscreenAction: React.FC<Props> = ({ fullscreenWindow }) => {
  return (
    <Action type="fullscreen" onClick={fullscreenWindow} data-test="action" />
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => {
  return {
    fullscreenWindow: () => dispatch(fullscreenWindow(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FullscreenAction);
