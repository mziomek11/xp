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
  icon: string;
  focused: boolean;
  minimalized: boolean;
};

type Props = OwnProps & DispatchProps & StateProps;

export const MenuItem: React.FC<Props> = ({
  name,
  changePriority,
  toggleMinimalize,
  focused,
  minimalized,
  icon
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
      <div className="toolbar__application-icon-container">
        <img
          src={icon}
          className="toolbar__application-icon"
          alt="applicaiton icon"
        />
      </div>
      <span className="toolbar__application-text">{name}</span>
    </div>
  );
};

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => ({
  name: state.window.byId[id].name,
  icon: state.window.byId[id].icon,
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
