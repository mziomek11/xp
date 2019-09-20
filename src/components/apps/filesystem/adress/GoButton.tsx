import React from "react";

type Props = {
  onClick: () => void;
};

const GoButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      className="filesystem__adress-go-container"
      onClick={onClick}
      data-test="container"
    >
      <div className="filesystem__adress-go-icon" data-test="icon" />
      <span className="filesystem__adress-go-text" data-test="text">
        Go
      </span>
    </div>
  );
};

export default GoButton;
