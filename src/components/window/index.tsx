import React from "react";
import { connect } from "react-redux";

import Bar from "./bar";
import { RootState } from "MyTypes";

type OwnProps = {
  id: string;
};

type StateProps = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type Props = OwnProps & StateProps;

class Window extends React.Component<Props, {}> {
  render() {
    const { children, top, left, width, height, id } = this.props;
    return (
      <div className="window" style={{ top, left, width, height }}>
        <Bar id={id} />
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { left, top, width, height } = state.window.byId[ownProps.id];
  return { left, top, width, height };
};

export default connect(mapStateToProps)(Window);
