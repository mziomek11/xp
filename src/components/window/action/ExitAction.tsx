import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Action from "./Action";
import { close as closeWindow } from "../../../store/window/actions";

type OwnProps = {
  id: string;
};

type DispatchProps = {
  closeWindow: () => void;
};

type Props = OwnProps & DispatchProps;

export const ExitAction: React.FC<Props> = ({ closeWindow, id }) => (
  <Action id={id} type="exit" onClick={closeWindow} data-test="action" />
);

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  closeWindow: () => dispatch(closeWindow(id))
});

export default connect(
  null,
  mapDispatchToProps
)(ExitAction);
