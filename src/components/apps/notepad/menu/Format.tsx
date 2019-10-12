import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import MenuItem from "../../../menu/Item";
import { DropDown, OptionCheckBox } from "../../../dropdown";
import { NotepadContextType } from "ContextType";

type CtxProps = {
  notepad: NotepadContextType;
};

type Props = CtxProps;

export class Format extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.notepad.wordWrap !== nextProps.notepad.wordWrap;
  }

  toggleWordWrap = () => {
    this.props.notepad.setContext({ wordWrap: !this.props.notepad.wordWrap });
  };

  render() {
    const dropDown = (
      <DropDown>
        <OptionCheckBox
          name="Word Wrap"
          isChecked={this.props.notepad.wordWrap}
          onClick={this.toggleWordWrap}
        />
      </DropDown>
    );

    return <MenuItem name="Format" dropdown={dropDown} data-test="format" />;
  }
}

export default withContext(Format, "notepad");
