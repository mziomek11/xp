import React from "react";

type Props = {
  type: "exit" | "minimalize" | "fullscreen";
  onClick?: () => void;
};

const Action: React.FC<Props> = ({ type, onClick }) => {
  return (
    <div
      className={`window__action window__action--${type}`}
      onClick={onClick}
      data-test="action"
    />
  );
};

export default Action;
