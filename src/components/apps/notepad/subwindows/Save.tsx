import React, { Component } from "react";

import SavePicker from "../../../subwindows/picker/save/Picker";
import withContext from "../../../../hoc/withContext";
import { NotepadContextType, WindowContextType } from "ContextType";

type Props = {
  notepad: NotepadContextType;
  window: WindowContextType;
};

export class NotepadSave extends Component<Props, {}> {
  closeSaveAs = () => {
    this.props.window.setContext({ disabled: false });
    this.props.notepad.setContext({ isSaving: false });
  };

  setPath = (path: string[]) => this.props.notepad.setContext({ path });

  render() {
    const { window, notepad } = this.props;
    return (
      <SavePicker
        onClose={this.closeSaveAs}
        filePath={notepad.path}
        id={window.id}
        setFilePath={this.setPath}
        content={notepad.text}
        fileType="text"
        data-test="picker"
      />
    );
  }
}

export default withContext(withContext(NotepadSave, "window"), "notepad");
