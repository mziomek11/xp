import React, { Component } from "react";

import { toolbarConfig } from "../../../config";

import StartContent from "./StartContent";
import { getClassName } from "../../../utils";

type State = {
  isOpen: boolean;
};

class Start extends Component<{}, State> {
  private isClickFirstAfterOpen: boolean = true;
  readonly state: State = { isOpen: false };

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => {
    window.removeEventListener("click", this.listenForClose);
  };

  listenForClose = () => {
    if (this.isClickFirstAfterOpen) this.isClickFirstAfterOpen = false;
    else this.close();
  };

  handleClick = () => {
    if (!this.state.isOpen) this.open();
    else this.close();
  };

  open = () => {
    this.setState({ isOpen: true });
    this.isClickFirstAfterOpen = true;
    window.addEventListener("click", this.listenForClose);
  };

  close = () => {
    this.setState({ isOpen: false });
    this.removeListeners();
  };

  getClassName = () => {
    const defaultClass = "start";
    const modifers = { open: this.state.isOpen };

    return getClassName(defaultClass, modifers);
  };

  render() {
    const className = this.getClassName();
    return (
      <div
        className={className}
        data-test="start"
        onClick={this.handleClick}
        style={{ width: toolbarConfig.START_WIDTH }}
      >
        {this.state.isOpen && <StartContent data-test="content" />}
      </div>
    );
  }
}

export default Start;
