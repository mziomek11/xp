import React from "react";

type Props = {
  onClick: () => void;
};

const GoButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="filesystem__go" onClick={onClick} data-test="container">
      <div className="filesystem__go__icon" data-test="icon" />
      <span className="filesystem__go__text" data-test="text">
        Go
      </span>
    </div>
  );
};

export default GoButton;
