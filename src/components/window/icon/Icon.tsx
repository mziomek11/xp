import React from "react";

type Props = {
  src: string;
};

const Icon: React.FC<Props> = ({ src }) => {
  return (
    <div className="window__icon-container" data-test="container">
      <img src={src} className="window__icon" alt="app icon" data-test="icon" />
    </div>
  );
};

export default Icon;
