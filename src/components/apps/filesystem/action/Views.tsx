import React, { Component } from "react";

import ViewsDropDown from "./ViewsDropDown";
import { getClassName } from "../../../../utils";
import viewIcon from "../../../../assets/folder/views.png";

type State = {
  isOpen: boolean;
  isClickOpening: boolean;
};

class Views extends Component<{}, State> {
  readonly state: State = {
    isOpen: false,
    isClickOpening: true
  };

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowClick);
  }

  handleActionClick = () => {
    this.setState({ isOpen: !this.state.isOpen, isClickOpening: true });
    window.addEventListener("click", this.handleWindowClick);
  };

  handleWindowClick = () => {
    if (this.state.isClickOpening) this.setState({ isClickOpening: false });
    else {
      this.setState({ isOpen: false });
      window.removeEventListener("click", this.handleWindowClick);
    }
  };

  render() {
    const { isOpen } = this.state;
    const className = getClassName("filesystem__action", { open: isOpen });

    return (
      <div className="filesystem__actions" data-test="actions">
        <div
          className={className}
          onClick={this.handleActionClick}
          data-test="action"
        >
          <img src={viewIcon} alt="view icon" data-test="icon" />
          <span
            className="filesystem__action-dropdown-arrow filesystem__action-dropdown-arrow--near"
            data-test="arrow"
          />
          {isOpen && <ViewsDropDown data-test="dropdown" />}
        </div>
      </div>
    );
  }
}

export default Views;
