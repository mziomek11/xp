import React, { PureComponent } from "react";

type Props = {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  isRed?: boolean;
};

class Button extends PureComponent<Props> {
  render() {
    const { onClick, children, isRed } = this.props;
    const color = isRed ? "red" : "blue";
    return (
      <button
        className="button button--calculator"
        onClick={onClick}
        style={{ color }}
        data-test="btn"
      >
        {children}
      </button>
    );
  }
}

export default Button;
