import React, { Component } from "react";

import SavePicker from "../../../subwindows/picker/save/Picker";
import withContext from "../../../../hoc/withContext";
import { PaintContextType, WindowContextType } from "ContextType";

type Props = {
  paint: PaintContextType;
  window: WindowContextType;
};

export class PaintSave extends Component<Props, {}> {
  closeSaveAs = () => {
    this.props.window.setContext({ disabled: false });
    this.props.paint.setContext({ isSaving: false });
  };

  setPath = (path: string[]) => this.props.paint.setContext({ path });

  render() {
    const { window, paint } = this.props;
    const imageData = paint.getImageData();
    return (
      <SavePicker
        onClose={this.closeSaveAs}
        filePath={paint.path}
        id={window.id}
        setFilePath={this.setPath}
        content={imageData}
        fileType="image"
        data-test="picker"
      />
    );
  }
}

export default withContext(withContext(PaintSave, "window"), "paint");
