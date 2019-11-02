import React, { Component } from "react";

import OpenPicker from "../../../subwindows/picker/open/Picker";
import withContext from "../../../../hoc/withContext";
import { NotepadContextType, WindowContextType } from "ContextType";

type Props = {
  notepad: NotepadContextType;
  window: WindowContextType;
};

export class NotepadOpen extends Component<Props, {}> {
  closeOpening = () => {
    this.props.window.setContext({ disabled: false });
    this.props.notepad.setContext({ isOpening: false });
  };

  render() {
    const { window, notepad } = this.props;

    return (
      <OpenPicker
        onClose={this.closeOpening}
        filePath={notepad.path}
        id={window.id}
        fileType="text"
        data-test="picker"
      />
    );
  }
}

export default withContext(withContext(NotepadOpen, "window"), "notepad");
