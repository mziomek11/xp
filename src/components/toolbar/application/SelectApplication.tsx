import React from "react";
import { connect } from "react-redux";

import ApplicationMenu from "./menu/Menu";
import { RootState } from "MyTypes";
import { getClassName } from "../../../utils";
import { getIcon } from "../../../icons";
import { Application } from "../../../store/models";

type OwnProps = {
  application: Application;
  width: number;
  ids: string[];
};

type StateProps = {
  focused: boolean;
};

type Props = OwnProps & StateProps;

type State = { isOpen: boolean };

export class SelectApplication extends React.Component<Props, State> {
  private baseClassName = "toolbar__application";

  readonly state: State = { isOpen: false };

  toggleMenu = () => this.setState({ isOpen: !this.state.isOpen });
  closeMenu = () => this.setState({ isOpen: false });

  getClassName = () => {
    const modifiersObj = { focused: this.props.focused || this.state.isOpen };
    const baseModifiers = ["with-menu"];

    return getClassName(this.baseClassName, modifiersObj, baseModifiers);
  };

  getIcon = () => {
    switch (this.props.application) {
      case "filesystem":
        return getIcon("folder", false);
      case "notepad":
        return getIcon("notepad", false);
      default:
        throw Error("Unknown app");
    }
  };

  getName = () => {
    switch (this.props.application) {
      case "filesystem":
        return "Windows explorer";
      case "notepad":
        return "Notepad";
      default:
        throw Error("Unknown app");
    }
  };

  render() {
    const { isOpen } = this.state;
    const { width, ids } = this.props;
    const icon = this.getIcon();
    const name = this.getName();
    const className = this.getClassName();

    return (
      <div
        className={className}
        data-test="application"
        onClick={this.toggleMenu}
        style={{ width }}
      >
        <div className={`${this.baseClassName}-icon-container`}>
          <img
            className={`${this.baseClassName}-icon`}
            src={icon}
            alt="application-icon"
          />
        </div>
        <span className={`${this.baseClassName}-count`} data-test="count">
          {ids.length}
        </span>
        <span className={`${this.baseClassName}-text`} data-test="text">
          {name}
        </span>
        <div className={`${this.baseClassName}-arrow`} data-test="arrow" />
        {isOpen && (
          <ApplicationMenu
            ids={ids}
            closeMenu={this.closeMenu}
            data-test="menu"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, { ids }: OwnProps): StateProps => {
  return {
    focused: ids.indexOf(state.window.focused as any) > -1
  };
};

export default connect(mapStateToProps)(SelectApplication);
