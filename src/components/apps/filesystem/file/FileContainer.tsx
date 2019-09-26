import React, { Component } from "react";

import TileView from "./views/TileView";
import ThumbnailView from "./views/ThumbnailView";
import IconView from "./views/IconView";
import ListView from "./views/ListView";

import withDoubleClick from "../../../../hoc/withDoubleClick";
import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { File as IFile } from "../../../../store/filesystem/models";
import { getIcon } from "../../../../icons";
import {
  getClassName,
  areArraysEqual,
  areObjectsEqual
} from "../../../../utils";
import { containerClass } from "../classNames";

export type ViewProps = {
  containerClass: string;
  getElementClass: (e: string) => string;
  onClick: () => void;
  icon: string;
  name: string;
  renaming: boolean;
};

type OwnProps = {
  file: IFile;
  context: FilesystemContextType;
};

type DoubleClickProps = {
  checkForDoubleClick: (onDoubleClick: () => void) => void;
};

type Props = OwnProps & DoubleClickProps;

export class FileContainer extends Component<Props, {}> {
  shouldComponentUpdate({ file, context }: Props) {
    const { renamedFile, focused, options } = this.props.context;

    if (!areObjectsEqual(this.props.file, file, ["type", "name"])) return true;
    if (renamedFile !== context.renamedFile) return true;
    if (!areArraysEqual(focused, context.focused)) return true;
    if (options.display !== context.options.display) return true;

    return false;
  }

  getContainerClass = (focused: boolean) => {
    const { display } = this.props.context.options;

    return getClassName(containerClass, { focused }, [display, "renaming"]);
  };

  getElementClass = (element: string) => {
    const { display } = this.props.context.options;

    return `filesystem__file-${element} filesystem__file-${element}--${display}`;
  };

  handleClick = () => {
    const { context, file, checkForDoubleClick } = this.props;
    if (context.renamedFile === file.name) return null;

    context.setFocused([file.name]);
    checkForDoubleClick(this.onDoubleClick);
  };

  onDoubleClick = () => {
    const { context, file } = this.props;
    const { setPath, path, historyPosition } = context;

    setPath([...path, file.name], historyPosition + 1);
  };

  render() {
    const { context, file } = this.props;
    const { options, focused, renamedFile } = context;

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

export default withDoubleClick(withContext(FileContainer, "filesystem"));
