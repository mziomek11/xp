import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Desktop from "../desktop/Desktop";
import Toolbar from "../toolbar/Toolbar";
import { setSize } from "../../store/screen/actions";

type DispatchProps = {
  setSize: (width: number, height: number) => void;
};

export class Screen extends Component<DispatchProps> {
  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize = () => {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;

    this.props.setSize(width, height);
  };

  render() {
    return (
      <div className="screen" data-test="screen">
        <Desktop data-test="desktop" />
        <Toolbar data-test="toolbar" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setSize: (width, height) => dispatch(setSize(width, height))
});

export default connect(
  null,
  mapDispatchToProps
)(Screen);
