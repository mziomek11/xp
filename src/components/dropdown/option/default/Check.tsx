import React from "react";

export type CheckOptions = "check" | "circle";

type Props = {
  renderCheck: boolean;
  type?: CheckOptions;
};

const Check: React.FC<Props> = ({ renderCheck, type = "check" }) => {
  return (
    <div className="dropdown__check-container" data-test="container">
      {renderCheck && <div className={`dropdown__${type}`} data-test="check" />}
    </div>
  );
};

export default Check;
