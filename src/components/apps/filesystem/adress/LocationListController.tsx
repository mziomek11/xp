import React, { Component } from "react";

import LocationList from "./LocationList";

type State = {
  open: boolean;
  isClickOpening: boolean;
};

class LocationListController extends Component<{}, State> {
  readonly state: State = {
    open: false,
    isClickOpening: true
  };

  componentWillUnmount() {
    window.removeEventListener("click", this.handleWindowClick);
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

  render() {
    return (
      <div
        className="filesystem__location__arrow"
        onClick={this.handleContainerClick}
        data-test="container"
      >
        {this.state.open && <LocationList data-test="location-list" />}
      </div>
    );
  }
}

export default LocationListController;
