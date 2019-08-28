import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import { getClassName } from "../../../utils";
import {
  toggleMinimalize,
  changePriority
} from "../../../store/window/actions";

type OwnProps = {
  id: string;
  width: number;
};

type StateProps = {
  name: string;
  focused: boolean;
};

type DispatchProps = {
  toggleMinimalize: () => void;
  changePriority: () => void;
};

type Props = OwnProps & StateProps & DispatchProps;

export class Application extends React.Component<Props, {}> {
  private baseClassName = "toolbar__application";

  handleClick = () => {
    const { focused, toggleMinimalize, changePriority } = this.props;
    if (focused) toggleMinimalize();
    else changePriority();
  };

  getClassName = () => {
    const modifierObj = { focused: this.props.focused };

    return getClassName(this.baseClassName, modifierObj);
  };

  render() {
    const { name, width } = this.props;
    const className = this.getClassName();
    return (
      <div
        className={className}
        onClick={this.handleClick}
        style={{ width }}
        data-test="application"
      >
        <span className={`${this.baseClassName}-text`} data-test="text">
          {name}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => ({
  name: state.window.byId[id].name,
  focused: state.window.focused === id
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  toggleMinimalize: () => dispatch(toggleMinimalize(id)),
  changePriority: () => dispatch(changePriority(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);
