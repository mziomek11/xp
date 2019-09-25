import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import {
  changePriority,
  toggleMinimalize
} from "../../../../store/window/actions";

type OwnProps = {
  id: string;
};

type DispatchProps = {
  changePriority: () => void;
  toggleMinimalize: () => void;
};

type StateProps = {
  name: string;
  focused: boolean;
  minimalized: boolean;
};

type Props = OwnProps & DispatchProps & StateProps;

export const MenuItem: React.FC<Props> = ({
  name,
  changePriority,
  toggleMinimalize,
  focused,
  minimalized
}) => {
  const handleClick = () => {
    if (focused || minimalized) toggleMinimalize();
    else changePriority();
  };

  return (
    <div
      className="toolbar__application-menu-item"
      onClick={handleClick}
      data-test="menu-item"
    >
      {name}
    </div>
  );
};

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => ({
  name: state.window.byId[id].name,
  minimalized: state.window.byId[id].minimalized,
  focused: state.window.focused === id
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  changePriority: () => dispatch(changePriority(id)),
  toggleMinimalize: () => dispatch(toggleMinimalize(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem);
