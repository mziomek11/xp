import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Bar from "./bar";
import { changePriority as changeWindowPriority } from "../../store/window/actions";
import { RootState } from "MyTypes";

type OwnProps = {
  id: string;
};

type DispatchProps = {
  changePriority: () => void;
};

type StateProps = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type Props = OwnProps & StateProps & DispatchProps;

export class Window extends React.Component<Props, {}> {
  render() {
    const { children, top, left, width, height, id } = this.props;
    return (
      <div
        className="window"
        style={{ top, left, width, height }}
        data-test="window"
        onMouseDown={this.props.changePriority}
      >
        <Bar id={id} data-test="bar" />
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { left, top, width, height } = state.window.byId[ownProps.id];
  return { left, top, width, height };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => {
  return {
    changePriority: () => dispatch(changeWindowPriority(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);
