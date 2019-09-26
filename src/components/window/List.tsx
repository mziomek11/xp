import React, { Component } from "react";
import { connect } from "react-redux";

import Application from "../apps/Application";
import WindowContainer from "./WindowContainer";
import { Provider as WindowContextProvider } from "./Context";
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
          <WindowContextProvider id={id} startFullscreened={false} key={id}>
            <WindowContainer data-test="window">
              <Application id={id} />
            </WindowContainer>
          </WindowContextProvider>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  windowsIds: state.window.allIds
});

export default connect(mapStateToProps)(List);
