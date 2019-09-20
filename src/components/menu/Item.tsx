import React, { Component } from "react";

import Context from "./Context";
import { getClassName } from "../../utils";

type Props = {
  dropdown?: React.ReactNode;
  name: string;
};

type State = {
  isClickOpening: boolean;
};

export class Item extends Component<Props, State> {
  static contextType = Context;
  context!: React.ContextType<typeof Context>;

  readonly state: State = {
    isClickOpening: true
  };

  componentWillUnmount() {
    window.removeEventListener("click", this.listenForClick);
  }

  handleMouseClick = () => {
    const { openedItem, setOpenedItem } = this.context;
    if (!openedItem) {
      setOpenedItem(this.props.name);
      this.setState({ isClickOpening: true });
      window.addEventListener("click", this.listenForClick);
    }
  };

  handleMouseEnter = () => {
    if (this.context.openedItem) {
      this.context.setOpenedItem(this.props.name);
    }
  };

  listenForClick = () => {
    if (this.state.isClickOpening) this.setState({ isClickOpening: false });
    else {
      this.context.setOpenedItem(null);
      window.removeEventListener("click", this.listenForClick);
    }
  };

  render() {
    const { name, dropdown } = this.props;
    const { openedItem } = this.context;
    const isItemOpened = openedItem === name;
    const className = getClassName("menu__item", { open: isItemOpened });

    return (
      <li
        className={className}
        onMouseEnter={this.handleMouseEnter}
        onClick={this.handleMouseClick}
        data-test="item"
      >
        <span data-test="name">{name}</span> {isItemOpened && dropdown}
      </li>
    );
  }
}

export default Item;
