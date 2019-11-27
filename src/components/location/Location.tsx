import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import ListController from "./ListController";
import Input from "./Input";
import GoButton from "./GoButton";
import { RootState } from "MyTypes";
import { pathArrayToString, objectPropFromPath } from "../../utils/filesystem";
import { areArraysEqual } from "../../utils";
import { getIcon } from "../../icons";
import { FileTree } from "../../store/filesystem/models";

export type LocationProps = {
  path: string[];
  setPath: (path: string[], historyPos: number) => void;
  historyPosition?: number;
};

type OwnProps = {
  editable?: boolean;
  withGoButton?: boolean;
};

type StateProps = {
  fileTree: FileTree;
};

export type Props = LocationProps & OwnProps & StateProps;

type State = {
  text: string;
  open: boolean;
  isClickOpening: boolean;
};

export class Location extends Component<Props, State> {
  static deafultProps: Pick<LocationProps, "historyPosition"> & OwnProps = {
    historyPosition: 0,
    editable: false,
    withGoButton: false
  };

  readonly state = {
    text: this.props.editable!
      ? pathArrayToString(this.props.path)
      : this.props.path.length > 0
      ? this.props.path[this.props.path.length - 1]
      : "My computer",
    open: false,
    isClickOpening: true
  };

  private inputRef = createRef<HTMLInputElement>();

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowClick);
  }

  shouldComponentUpdate({ path }: Props, { text, open }: State) {
    if (!areArraysEqual(this.props.path, path)) return true;
    if (this.state.text !== text) return true;
    if (this.state.open !== open) return true;

    return false;
  }

  componentDidUpdate(prevPros: Props) {
    const { path, editable } = this.props;
    if (!areArraysEqual(path, prevPros.path)) {
      let newText: string;
      if (editable) newText = pathArrayToString(path);
      else newText = path.length === 0 ? "My computer" : path[path.length - 1];

      this.setState({ text: newText });
    }
  }

  handleContainerClick = () => {
    if (this.state.open) this.closeList();
    else {
      this.setState({ open: true, isClickOpening: true });
      window.addEventListener("click", this.handleWindowClick);
    }
  };

  closeList = () => {
    this.setState({ open: false });
    window.removeEventListener("click", this.handleWindowClick);
  };

  handleWindowClick = () => {
    if (this.state.isClickOpening) this.setState({ isClickOpening: false });
    else this.closeList();
  };

  getLocationIcon = () => {
    const { length } = this.props.path;
    if (length === 0) return getIcon("filesystem");
    else if (length === 1) return getIcon("disk");
    else return getIcon("folder");
  };

  changePathToLocationText = () => {
    const { setPath, historyPosition, path, fileTree } = this.props;
    const { text } = this.state;

    let newPath = text.split("\\");

    if (newPath[0] === "My computer") newPath = [];

    const [, newPossiblePath] = objectPropFromPath(fileTree, newPath);

    if (areArraysEqual(path, newPossiblePath)) {
      this.setState({ text: pathArrayToString(path) });
    } else {
      setPath(newPath, historyPosition! + 1);
    }
  };

  handleIconClick = () => {
    if (this.inputRef.current) this.inputRef.current.select();
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const { editable, withGoButton } = this.props;
    const onControllerClick = editable ? this.handleContainerClick : () => {};
    const onLocationClick = editable ? () => {} : this.handleContainerClick;
    const onIconClick = editable ? this.handleIconClick : () => {};
    const icon = this.getLocationIcon();

    return (
      <>
        <div
          className="location"
          onClick={onLocationClick}
          data-test="location"
        >
          <div className="location__items">
            <div
              className="location__icon-container"
              onClick={onIconClick}
              data-test="icon-container"
            >
              <img
                className="location__icon"
                alt="container-icon"
                src={icon}
                data-test="icon"
              />
            </div>

            {editable ? (
              <Input
                text={this.state.text}
                onChange={this.handleInputChange}
                onEnterPress={this.changePathToLocationText}
                ref={this.inputRef}
                data-test="input"
              />
            ) : (
              <div className="location__input" data-test="text">
                {this.state.text}
              </div>
            )}
            <ListController
              isOpen={this.state.open}
              path={this.props.path}
              setPath={this.props.setPath}
              historyPosition={this.props.historyPosition}
              onClick={onControllerClick}
              data-test="controller"
            />
          </div>
        </div>
        {withGoButton && (
          <GoButton
            onClick={this.changePathToLocationText}
            data-test="go-button"
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    fileTree: state.fileSystem.files
  };
};

export default connect(mapStateToProps)(Location);
