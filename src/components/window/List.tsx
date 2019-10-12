import React, { Component } from "react";
import { connect } from "react-redux";

import Application from "../apps/Application";
import { RootState } from "MyTypes";
import { areArraysEqual } from "../../utils";

type StateProps = {
  windowsIds: string[];
};

type Props = StateProps;

export class List extends Component<Props, {}> {
  shouldComponentUpdate({ windowsIds }: Props) {
    return !areArraysEqual(this.props.windowsIds, windowsIds);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.windowsIds.map(id => (
          <Application id={id} key={id} data-test="app" />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  windowsIds: state.window.allIds
});

export default connect(mapStateToProps)(List);
