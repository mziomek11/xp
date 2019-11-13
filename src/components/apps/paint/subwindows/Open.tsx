import React, { Component } from "react";

import OpenPicker from "../../../subwindows/picker/open/Picker";
import withContext from "../../../../hoc/withContext";
import { PaintContextType, WindowContextType } from "ContextType";

type Props = {
  paint: PaintContextType;
  window: WindowContextType;
};

export class PaintOpen extends Component<Props, {}> {
  closeOpening = () => {
    this.props.window.setContext({ disabled: false });
    this.props.paint.setContext({ isOpening: false });
  };

  render() {
    const { window, paint } = this.props;

    return (
      <OpenPicker
        onClose={this.closeOpening}
        filePath={paint.path}
        id={window.id}
        fileType="image"
        data-test="picker"
      />
    );
  }
}

export default withContext(withContext(PaintOpen, "window"), "paint");
