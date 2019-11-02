import React from "react";

type Props = {
  onClick?: () => void;
  type: "button" | "submit";
};

const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick} data-test="btn">
      {children}
    </button>
  );
};

export default Button;
