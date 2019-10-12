import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { NotepadContextType } from "ContextType";
import { areObjectsEqual } from "../../../../utils";

type Props = {
  notepad: NotepadContextType;
};

export class TextArea extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    const { notepad } = this.props;
    const properties = ["wordWrap", "text"];

    return !areObjectsEqual(notepad, nextProps.notepad, properties);
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.notepad.setContext({ text: e.target.value });
  };

  render() {
    const { wordWrap, text } = this.props.notepad;
    return (
      <textarea
        style={{ whiteSpace: wordWrap ? "pre-wrap" : "nowrap" }}
        className="notepad__textarea"
        value={text}
        onChange={this.handleChange}
        spellCheck={false}
        data-test="textarea"
      />
    );
  }
}

export default withContext(TextArea, "notepad");
