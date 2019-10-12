import React, { Component } from "react";

import Button from "./Button";
import Input from "./Input";
import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType, WindowContextType } from "ContextType";
import { FileType } from "../../../../../store/filesystem/models";

type OwnProps = {
  acceptText: string;
  onSubmit: (text: string) => void;
  startText: string;
  fileType: FileType;
};

type CtxProps = {
  filesystem: FilesystemContextType;
  window: WindowContextType;
};

type Props = OwnProps & CtxProps;

type State = {
  text: string;
};

export class Form extends Component<Props, State> {
  readonly state: State = {
    text: this.props.startText
  };

  componentDidUpdate(_: Props, prevState: State) {
    const { fileType, filesystem } = this.props;
    const { focused, files } = filesystem;

    if (this.state.text !== prevState.text) return;
    if (focused.length === 0) return;

    const file = files.filter(({ name }) => name === focused[0])[0];
    if (file.type === fileType && file.name !== this.state.text) {
      this.setText(focused[0]);
    }
  }

  setText = (newText: string) => {
    this.setState({ text: newText });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
  };

  render() {
    const { text } = this.state;
    const { acceptText, window } = this.props;
    return (
      <form
        onSubmit={this.handleSubmit}
        className="picker__form"
        data-test="form"
      >
        <div className="picker__form__left">
          <label className="picker__form__label">File name: </label>
          <Input setText={this.setText} text={text} data-test="input" />
        </div>
        <div className="picker__form__right">
          <Button data-test="submit-btn" type="submit">
            {acceptText}
          </Button>
          <Button onClick={window.close} data-test="cancel-btn" type="button">
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}

export default withContext(withContext(Form, "window"), "filesystem");
