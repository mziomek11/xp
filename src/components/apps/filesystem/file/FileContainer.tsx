import React, { Component } from "react";
import uuid from "uuid";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import TileView from "./views/TileView";
import ThumbnailView from "./views/ThumbnailView";
import IconView from "./views/IconView";
import ListView from "./views/ListView";

import withDoubleClick from "../../../../hoc/withDoubleClick";
import withContext from "../../../../hoc/withContext";
import { open } from "../../../../store/window/actions";
import { FilesystemContextType } from "ContextType";
import { OpenData } from "../../../../store/window/models";
import { File as IFile } from "../../../../store/filesystem/models";
import { Application } from "../../../../store/models";
import { getIcon } from "../../../../icons";
import { containerClass } from "../classNames";
import {
  getClassName,
  areArraysEqual,
  areObjectsEqual
} from "../../../../utils";

export type ViewProps = {
  containerClass: string;
  getElementClass: (e: string) => string;
  onClick: () => void;
  icon: string;
  name: string;
  renaming: boolean;
};

type OwnProps = {
  isFilePicker: boolean;
  file: IFile;
  filesystem: FilesystemContextType;
};

type DoubleClickProps = {
  checkForDoubleClick: (onDoubleClick: () => void) => void;
};

type DispatchProps = {
  open: (app: Application, openData: OpenData) => void;
};

type Props = OwnProps & DoubleClickProps & DispatchProps;

export class FileContainer extends Component<Props, {}> {
  shouldComponentUpdate({ file, filesystem }: Props) {
    const { renamedFile, focused, options } = this.props.filesystem;

    if (!areObjectsEqual(this.props.file, file, ["type", "name"])) return true;
    if (renamedFile !== filesystem.renamedFile) return true;
    if (!areArraysEqual(focused, filesystem.focused)) return true;
    if (options.display !== filesystem.options.display) return true;

    return false;
  }

  getContainerClass = (focused: boolean) => {
    const { options, renamedFile } = this.props.filesystem;
    const { display } = options;
    const renaming = renamedFile === this.props.file.name;

    return getClassName(containerClass, { focused, renaming }, [display]);
  };

  getElementClass = (element: string) => {
    const { display } = this.props.filesystem.options;

    return getClassName(`filesystem__file__${element}`, {}, [display]);
  };

  handleClick = () => {
    const { filesystem, file, checkForDoubleClick } = this.props;
    if (filesystem.renamedFile === file.name) return null;

    filesystem.setFocused([file.name]);
    checkForDoubleClick(this.onDoubleClick());
  };

  onDoubleClick = () => {
    switch (this.props.file.type) {
      case "text":
        return () => this.openApp("notepad");
      case "image":
        return () => this.openApp("paint");
      default:
        return this.enterFolder;
    }
  };

  enterFolder = () => {
    const { filesystem, file } = this.props;
    const { setPath, path, historyPosition } = filesystem;

    setPath([...path, file.name], historyPosition + 1);
  };

  openApp = (app: Application) => {
    const { open, file, filesystem, isFilePicker } = this.props;

    if (!isFilePicker) {
      open(app, { path: filesystem.path, content: file.content });
    }
  };

  render() {
    const { filesystem, file } = this.props;
    const { options, focused, renamedFile } = filesystem;

    const isFocused = focused.indexOf(file.name) > -1;
    const isRenamed = renamedFile === file.name;
    const icon = getIcon(file.type as any, isFocused);

    const viewProps: ViewProps = {
      containerClass: this.getContainerClass(isFocused),
      getElementClass: this.getElementClass,
      onClick: this.handleClick,
      icon: icon,
      name: file.name,
      renaming: isRenamed
    };

    switch (options.display) {
      case "thumbnails":
        return <ThumbnailView {...viewProps} data-test="thumbnail" />;
      case "tiles":
        return <TileView {...viewProps} data-test="tile" />;
      case "icons":
        return <IconView {...viewProps} data-test="icon" />;
      case "list":
        return <ListView {...viewProps} data-test="list" />;
      default:
        return null;
    }
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { file }: OwnProps
): DispatchProps => {
  return {
    open: (app, openData) => dispatch(open(uuid(), app, file.name, openData))
  };
};

export default withDoubleClick(
  withContext(connect(null, mapDispatchToProps)(FileContainer), "filesystem")
);
