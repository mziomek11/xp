import React, { useState } from "react";
import { getClassName } from "../../../../utils";

type OwnProps = {
  title: string;
};

const Item: React.FC<OwnProps> = ({ children, title }) => {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen(!open);
  const arrowClass = getClassName("filesystem__side__arrow", { open });

  return (
    <div className="filesystem__side__item" data-test="container">
      <div
        className="filesystem__side__header"
        onClick={toggleOpen}
        data-test="clickable"
      >
        <h5>{title}</h5>
        <div className={arrowClass} />
      </div>
      {open && (
        <div className="filesystem__side__content" data-test="content">
          {children}
        </div>
      )}
    </div>
  );
};

export default Item;
