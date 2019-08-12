import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { changePriority } from "../../../store/window/actions";

type OwnProps = {
  id: string;
  type: "exit" | "minimalize" | "fullscreen";
  onClick: () => void;
};

type DispatchProps = {
  changePriority: () => void;
};

type Props = OwnProps & DispatchProps;

export const Action: React.FC<Props> = ({ type, onClick, changePriority }) => {
  return (
    <div
      className={`window__action window__action--${type}`}
      onClick={() => {
        onClick();
        if (type !== "exit") changePriority();
      }}
      data-test="action"
    />
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => {
  return {
    changePriority: () => dispatch(changePriority(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Action);
