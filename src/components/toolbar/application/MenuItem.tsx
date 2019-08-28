import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import { changePriority } from "../../../store/window/actions";

type OwnProps = {
  id: string;
};

type DispatchProps = {
  changePriority: () => void;
};

type StateProps = {
  name: string;
};

type Props = OwnProps & DispatchProps & StateProps;

export const MenuItem: React.FC<Props> = ({ name, changePriority }) => {
  return (
    <div
      className="toolbar__application-menu-item"
      onClick={changePriority}
      data-test="menu-item"
    >
      {name}
    </div>
  );
};

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => ({
  name: state.window.byId[id].name
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  changePriority: () => dispatch(changePriority(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem);
