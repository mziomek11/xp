import React, { Component } from "react";

import HistoryArrowDropDown from "./HistoryArrowDropDown";
import { OptionData } from "../../context/models";

export type Props = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  disabled: boolean;
  dropdownOptions: OptionData[];
};

type State = {
  isClickOpening: boolean;
};

class HistoryArrow extends Component<Props, State> {
  readonly state: State = {
    isClickOpening: false
  };

  componentWillUnmount() {
    window.removeEventListener("click", this.listenForClick);
  }

  handleClick = () => {
    if (!this.props.isOpen && !this.props.disabled) {
      this.props.setOpen(true);
      this.setState({ isClickOpening: true });
      window.addEventListener("click", this.listenForClick);
    }
  };

  listenForClick = () => {
    if (this.state.isClickOpening) this.setState({ isClickOpening: false });
    else {
      this.props.setOpen(false);
      window.removeEventListener("click", this.listenForClick);
    }
  };

  render() {
    const { dropdownOptions, isOpen } = this.props;
    return (
      <div
        className="filesystem__action__dropdown-arrow-container"
        onClick={this.handleClick}
        data-test="arrow-container"
      >
        <div className="filesystem__action__dropdown-arrow" data-test="arrow" />
        {isOpen && (
          <HistoryArrowDropDown
            options={dropdownOptions}
            data-test="dropdown"
          />
        )}
      </div>
    );
  }
}

export default HistoryArrow;
