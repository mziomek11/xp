import React, { Component } from "react";

import Error from "../../../subwindows/popup/Error";
import withContext from "../../../../hoc/withContext";
import { WindowContextType, PaintContextType } from "ContextType";

type Props = {
  window: WindowContextType;
  paint: PaintContextType;
};

class ErrorPopUp extends Component<Props, {}> {
  handleClose = () => {
    this.props.paint.setContext({ showError: false });
    this.props.window.setContext({ disabled: false });
  };

  render() {
    return (
      <Error
        width={270}
        height={138}
        text="This tool has not been implemented."
        onClose={this.handleClose}
      />
    );
  }
}

export default withContext(withContext(ErrorPopUp, "window"), "paint");
