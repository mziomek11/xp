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

const isFolderLikeType = (type: string) => {
  return type === "folder" || type === "disk" || type === "computer";
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
    if (!isFolderLikeType(type)) return false;

    let shouldShow = false;
    for (let property of Object.keys(content!)) {
      const { type } = (content as any)[property];
      if (isFolderLikeType(type)) {
        shouldShow = true;
        break;
      }
    }

    return shouldShow;
  };

  isSelected = () => {
    const { selectedPath, filePath } = this.props;
    if (!selectedPath) return false;

    return areArraysEqual(filePath, selectedPath);
  };

  getContainerClass = (selected: boolean) => {
    const baseClass = "filesystem__tree__item";

    return getClassName(baseClass, { selected });
  };

  getTogglerClass = (shouldShowList: boolean) => {
    const baseClass = "filesystem__tree__item__toggler";
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

  getNodes = () => {
    const { content, filePath, onClick, selectedPath } = this.props;

    return Object.keys(content!)
      .filter(key => isFolderLikeType((content as any)[key].type))
      .map(key => {
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
            withToggler={this.props.withToggler}
            data-test="node"
          />
        );
      });
  };

  render() {
    const { icon, withToggler, name } = this.props;
    const isSelected = this.isSelected();
    const showList = this.shouldShowList();

    const containerClass = this.getContainerClass(isSelected);
    const togglerClass = this.getTogglerClass(showList);

    return (
      <li className={containerClass} data-test="container">
        <div className="filesystem__tree__item__content">
          {withToggler && (
            <div
              onClick={this.handleTogglerClick}
              className={togglerClass}
              data-test="toggler"
            />
          )}
          <div
            className="filesystem__tree__item__text-container"
            onClick={this.handleNameContainerClick}
            data-test="name-container"
          >
            <div className="filesystem__tree__item__icon-container">
              <img
                src={icon}
                alt="file icon"
                className="filesystem__tree__item__icon"
                data-test="icon"
              />
            </div>
            <span className={"filesystem__tree__item__text"} data-test="text">
              {name}
            </span>
          </div>
        </div>
        {showList && this.state.open && (
          <ul className="filesystem__tree__list" data-test="list">
            {this.getNodes()}
          </ul>
        )}
      </li>
    );
  }
}

export default TreeNode;
