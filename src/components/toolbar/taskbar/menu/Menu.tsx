import React from "react";

import MenuItem from "./MenuItem";

type Props = {
  ids: string[];
  closeMenu: () => void;
};

type State = { isOpeningClick: boolean };

export class Menu extends React.Component<Props, State> {
  readonly state: State = {
    isOpeningClick: true
  };

  componentDidMount() {
    window.addEventListener("click", this.handleClickOutsideMenu);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutsideMenu);
  }

  handleClickOutsideMenu = (e: MouseEvent) => {
    const { isOpeningClick } = this.state;
    if (!isOpeningClick) this.props.closeMenu();
    else this.setState({ isOpeningClick: false });
  };

  render() {
    return (
      <div className="taskbar__menu" data-test="menu">
        {this.props.ids.map(id => (
          <MenuItem id={id} key={id} data-test="menu-item" />
        ))}
      </div>
    );
  }
}

export default Menu;
