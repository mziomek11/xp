import React from "react";

type Props = {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  isRed?: boolean;
};

const Button: React.FC<Props> = ({ onClick, isRed, children }) => {
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
};

export default Button;
