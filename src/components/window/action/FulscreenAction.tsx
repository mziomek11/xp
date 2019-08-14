import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Action from "./Action";
import { toggleFullscreen } from "../../../store/window/actions";

type OwnProps = {
  id: string;
};

type DispatchProps = {
  toggleFullscreen: () => void;
};

type Props = OwnProps & DispatchProps;

export const FullscreenAction: React.FC<Props> = ({ toggleFullscreen, id }) => (
  <Action
    id={id}
    type="fullscreen"
    onClick={toggleFullscreen}
    data-test="action"
  />
);

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  toggleFullscreen: () => dispatch(toggleFullscreen(id))
});

export default connect(
  null,
  mapDispatchToProps
)(FullscreenAction);
