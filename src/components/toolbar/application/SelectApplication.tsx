import React from "react";

import ApplicationMenu from "./Menu";

type Props = {
  application: string;
  width: number;
  ids: string[];
};

type State = { isOpen: boolean };

export class SelectApplication extends React.Component<Props, State> {
  readonly state: State = { isOpen: false };

  handleClick = () => this.setState({ isOpen: !this.state.isOpen });

  closeMenu = () => this.setState({ isOpen: false });

  render() {
    const { isOpen } = this.state;
    const { application, width, ids } = this.props;

    return (
      <div
        className="toolbar__application toolbar__application--with-menu"
        data-test="application"
        onClick={this.handleClick}
        style={{ width }}
      >
        <span className="toolbar__application-text" data-test="text">
          {application}
        </span>
        <div className="toolbar__application-arrow " data-test="arrow" />
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

export default SelectApplication;
