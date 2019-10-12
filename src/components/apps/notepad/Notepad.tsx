import React, { Component } from "react";

import withContext from "../../../hoc/withContext";
import Menu from "./menu/Menu";
import Textarea from "./textarea/Textarea";
import Save from "./subwindows/Save";
import Open from "./subwindows/Open";
import { NotepadContextType } from "ContextType";
import { areObjectsEqual } from "../../../utils";

type Props = {
  notepad: NotepadContextType;
};

export class Notepad extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    const { notepad } = this.props;
    const properties = ["isSaving", "isOpening"];

    return !areObjectsEqual(notepad, nextProps.notepad, properties);
  }

  render() {
    const { isSaving, isOpening } = this.props.notepad;
    return (
      <div className="notepad" data-test="notepad">
        <Menu data-test="menu" />
        <Textarea data-test="textarea" />
        {isSaving && <Save data-test="save" />}
        {isOpening && <Open data-test="open" />}
      </div>
    );
  }
}

export default withContext(Notepad, "notepad");
