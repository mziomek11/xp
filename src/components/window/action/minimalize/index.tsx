import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Action from "../";
import { toggleMinimalize as minimalize } from "../../../../store/window/actions";

type OwnProps = {
  id: string;
};

type DispatchProps = {
  minimalize: () => void;
};

type Props = OwnProps & DispatchProps;

export const MinimalizeAction: React.FC<Props> = ({ minimalize, id }) => {
  return (
    <Action id={id} type="minimalize" onClick={minimalize} data-test="action" />
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => {
  return {
    minimalize: () => dispatch(minimalize(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MinimalizeAction);
