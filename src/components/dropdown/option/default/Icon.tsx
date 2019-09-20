import React from "react";

type Props = {
  icon?: string;
};

const Icon: React.FC<Props> = ({ icon }) => {
  return (
    <div className="dropdown__icon" data-test="container">
      <img src={icon} alt="icon" data-test="icon" />
    </div>
  );
};

export default Icon;
