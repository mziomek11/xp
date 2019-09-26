import React, { Component } from "react";

import { File } from "../../../../store/filesystem/models";
import { getIcon } from "../../../../icons";
import { getClassName, areArraysEqual } from "../../../../utils";
import { OwnProps as TreeOwnProps } from "./Tree";

type OwnProps = File & {
  icon: string;
  filePath: string[];
};

type Props = OwnProps & TreeOwnProps;

type State = {
  open: boolean;
};

class TreeNode extends Component<Props, State> {
  isOpenAtStart = () => {
    const { selectedPath, filePath } = this.props;
    if (!selectedPath) return false;

    for (let i = 0; i < filePath.length; i++) {
      if (filePath[i] !== selectedPath[i]) return false;
    }

    return true;
  };

  readonly state: State = {
    open: this.isOpenAtStart()
  };

  shouldShowList = () => {
    const { content, type } = this.props;
    const hasProperType =
      type === "folder" || type === "disk" || type === "computer";

    const shouldShow = hasProperType && Object.keys(content!).length > 0;

    return shouldShow;
  };

  isSelected = () => {
    const { selectedPath, filePath } = this.props;
    if (!selectedPath) return false;

    return areArraysEqual(filePath, selectedPath);
  };

  getContainerClass = (selected: boolean) => {
    const baseClass = "filesystem__tree-list-item";

    return getClassName(baseClass, { selected });
  };

  getTogglerClass = (shouldShowList: boolean) => {
    const baseClass = "filesystem__tree-list-item-toggler";
    return getClassName(baseClass, {
      invisible: !shouldShowList,
      open: this.state.open
    });
  };

  handleTogglerClick = () => this.setState({ open: !this.state.open });

  handleNameContainerClick = () => {
    const { onClick, filePath } = this.props;
    this.setState({ open: true });
    if (!this.isSelected()) onClick(filePath);
  };

  render() {
    const {
      icon,
      content,
      filePath,
      onClick,
      selectedPath,
      withToggler,
      name
    } = this.props;
    const isSelected = this.isSelected();
    const showList = this.shouldShowList();

    const containerClass = this.getContainerClass(isSelected);
    const togglerClass = this.getTogglerClass(showList);

    return (
      <li className={containerClass} data-test="container">
        <div className="filesystem__tree-list-item-container">
          {withToggler && (
            <div
              onClick={this.handleTogglerClick}
              className={togglerClass}
              data-test="toggler"
            />
          )}
          <div
            className="filesystem__tree-list-item-text-container"
            onClick={this.handleNameContainerClick}
            data-test="name-container"
          >
            <div className="filesystem__tree-list-item-icon-container">
              <img
                src={icon}
                alt="file icon"
                className="filesystem__tree-list-item-icon"
                data-test="icon"
              />
            </div>
            <span
              className={"filesystem__tree-list-item-text"}
              data-test="text"
            >
              {name}
            </span>
          </div>
        </div>
        {showList && this.state.open && (
          <ul className="filesystem__tree-list" data-test="list">
            {Object.keys(content!).map(key => {
              const file = (content as any)[key] as File;
              return (
                <TreeNode
                  name={file.name}
                  type={file.type}
                  content={file.content}
                  icon={getIcon(file.type as any)}
                  filePath={[...filePath, key]}
                  key={key}
                  onClick={onClick}
                  selectedPath={selectedPath}
                  withToggler={withToggler}
                  data-test="node"
                />
              );
            })}
          </ul>
        )}
      </li>
    );
  }
}

export default TreeNode;
