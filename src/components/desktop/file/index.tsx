import React from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { open as openWindow } from "../../../store/window/actions";

type OwnProps = {
  name: string;
  top: number;
  left: number;
};

type DispatchProps = {
  openWindow: () => void;
};

type Props = OwnProps & DispatchProps;
type State = {
  lastTimeClicked: number;
};

export class File extends React.Component<Props, State> {
  readonly state: State = {
    lastTimeClicked: -Infinity
  };

  handleClick = () => {
    const msToAcceptDoubleClick: number = 500;
    const currentTime: number = Date.now();
    const { lastTimeClicked } = this.state;

    if (currentTime - lastTimeClicked < msToAcceptDoubleClick) {
      this.setState({ lastTimeClicked: -Infinity });
      this.props.openWindow();
    } else {
      this.setState({ lastTimeClicked: currentTime });
    }
  };

  render() {
    const { left, top, name } = this.props;
    return (
      <div
        className="file"
        style={{ left, top }}
        data-test="file"
        onClick={this.handleClick}
      >
        {name}
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { name }: OwnProps
): DispatchProps => {
  return {
    openWindow: () => dispatch(openWindow(uuid(), name, false))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(File);
