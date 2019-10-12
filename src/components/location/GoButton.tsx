import React from "react";

type Props = {
  onClick: () => void;
};

const GoButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="location__go" onClick={onClick} data-test="container">
      <div className="location__go__icon" data-test="icon" />
      <span className="location__go__text" data-test="text">
        Go
      </span>
    </div>
  );
};

export default GoButton;
