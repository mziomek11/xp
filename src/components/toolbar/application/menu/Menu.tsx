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
    if (this.clickedOutsideMenu(e) && !isOpeningClick) this.props.closeMenu();
    else if (isOpeningClick) this.setState({ isOpeningClick: false });
  };

  clickedOutsideMenu = (e: MouseEvent) => {
    const expectedClass: string = "toolbar__application-menu-list";

    return !(e.target as Element).classList.contains(expectedClass);
  };

  render() {
    return (
      <div className="toolbar__application-menu" data-test="menu">
        {this.props.ids.map(id => (
          <MenuItem id={id} key={id} data-test="menu-item" />
        ))}
      </div>
    );
  }
}

export default Menu;
