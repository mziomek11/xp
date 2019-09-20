import React, { useState } from "react";
import { getClassName } from "../../../../utils";

type OwnProps = {
  title: string;
};

const Item: React.FC<OwnProps> = ({ children, title }) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);
  const arrowClass = getClassName("filesystem__side-header-arrow", { open });

  return (
    <div className="filesystem__side-item" data-test="container">
      <div
        className="filesystem__side-header"
        onClick={toggleOpen}
        data-test="clickable"
      >
        <h5 className="filesystem__side-header-text">{title}</h5>
        <div className={arrowClass} />
      </div>
      {open && (
        <div className="filesystem__side-content" data-test="content">
          {children}
        </div>
      )}
    </div>
  );
};

export default Item;
