import React, { Component, createRef } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { rename } from "../../../../store/filesystem/actions";

type OwnProps = {
  startText: string;
  className: string;
  filesystem: FilesystemContextType;
};

type DispatchProps = {
  rename: (path: string[], oldName: string, newName: string) => void;
};

type Props = OwnProps & DispatchProps;

type State = {
  text: string;
};

export class Renamer extends Component<Props, State> {
  readonly state: State = {
    text: this.props.startText
  };

  private inputRef = createRef<HTMLInputElement>();

  componentDidMount() {
    window.addEventListener("mousedown", this.handleWindowMouseDown);
    this.inputRef.current!.focus();
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleWindowMouseDown);
    this.props.filesystem.setRenamedFile(true);
  }

  handleWindowMouseDown = (e: MouseEvent) => {
    if (!e.target || !this.inputRef.current) return null;

    if (!this.inputRef.current.isEqualNode(e.target as Node)) this.renameFile();
  };

  renameFile = () => {
    window.removeEventListener("mousedown", this.handleWindowMouseDown);

    const { filesystem, rename, startText } = this.props;
    const { path, setRenamedFile } = filesystem;

    rename(path, startText, this.state.text);
    setRenamedFile(true);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") this.renameFile();
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const { className } = this.props;

    return (
      <input
        type="text"
        className={className}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        value={this.state.text}
        ref={this.inputRef}
        spellCheck={false}
        data-test="input"
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    rename: (path, oldName, newName) => dispatch(rename(path, oldName, newName))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withContext(Renamer, "filesystem"));
