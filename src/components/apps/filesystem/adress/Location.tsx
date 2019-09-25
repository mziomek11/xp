import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import withContext from "../../../../hoc/withContext";
import LocationListController from "./LocationListController";
import LocationInput from "./LocationInput";
import GoButton from "./GoButton";
import { RootState } from "MyTypes";
import { FilesystemContextType } from "ContextType";
import { FileTree } from "../../../../store/filesystem/models";
import { getIcon } from "../../../../icons";
import { areArraysEqual } from "../../../../utils";
import {
  pathArrayToString,
  objectPropFromPath
} from "../../../../utils/filesystem";

type ContextProps = {
  context: FilesystemContextType;
};

type StateProps = {
  fileTree: FileTree;
};

type Props = ContextProps & StateProps;

type State = {
  text: string;
};

export class Location extends Component<Props, State> {
  readonly state = {
    text: pathArrayToString(this.props.context.path)
  };

  private inputRef = createRef<HTMLInputElement>();

  shouldComponentUpdate({ context }: Props, { text }: State) {
    if (!areArraysEqual(this.props.context.path, context.path)) return true;
    if (this.state.text !== text) return true;

    return false;
  }

  componentDidUpdate(prevPros: Props) {
    if (!areArraysEqual(this.props.context.path, prevPros.context.path)) {
      const newText = pathArrayToString(this.props.context.path);
      this.setState({ text: newText });
    }
  }

  getLocationIcon = () => {
    const { path } = this.props.context;
    if (path.length === 0) return getIcon("computer");
    else if (path.length === 1) return getIcon("disk");
    else return getIcon("folder");
  };

  changePathToLocationText = () => {
    const { context, fileTree } = this.props;
    const { setPath, historyPosition, path } = context;
    const { text } = this.state;

    let newPath = text.split("\\");

    if (newPath[0] === "Computer") newPath = [];

    const [, newPossiblePath] = objectPropFromPath(fileTree, newPath);

    if (areArraysEqual(path, newPossiblePath)) {
      this.setState({ text: pathArrayToString(path) });
    } else {
      setPath(newPath, historyPosition + 1);
    }
  };

  handleIconClick = () => {
    if (this.inputRef.current) this.inputRef.current.select();
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const icon = this.getLocationIcon();
    return (
      <>
        <div className="filesystem__location" data-test="location">
          <div className="filesystem__location-items">
            <div
              className="filesystem__location-icon-container"
              onClick={this.handleIconClick}
              data-test="icon-container"
            >
              <img
                className="filesystem__location-icon"
                alt="container-icon"
                src={icon}
                data-test="icon"
              />
            </div>

            <LocationInput
              text={this.state.text}
              onChange={this.handleInputChange}
              onEnterPress={this.changePathToLocationText}
              ref={this.inputRef}
              data-test="input"
            />
            <LocationListController data-test="controller" />
          </div>
        </div>
        <GoButton
          onClick={this.changePathToLocationText}
          data-test="go-button"
        />
      </>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    fileTree: state.fileSystem.files
  };
};

export default connect(mapStateToProps)(withContext(Location, "filesystem"));
