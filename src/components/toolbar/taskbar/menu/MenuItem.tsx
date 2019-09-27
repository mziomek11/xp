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
      className="taskbar__menu__item"
      onClick={handleClick}
      data-test="menu-item"
    >
      <div className="taskbar__icon-container">
        <img src={icon} className="taskbar__icon" alt="applicaiton icon" />
      </div>
      <span className="taskbar__text">{name}</span>
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
