import React from "react";

type Props = {
  icon: string;
  onClick?: () => void;
};

const ListItem: React.FC<Props> = ({ children, icon, onClick }) => {
  return (
    <li className="filesystem__side__list__item" data-test="container">
      <div
        className="filesystem__side__list__item__content"
        onClick={onClick}
        data-test="clickable"
      >
        <div className="filesystem__side__list__item__icon-container">
          <img
            src={icon}
            className="filesystem__side__list__item__icon"
            alt="action-icon"
            data-test="icon"
          />
        </div>
        <span>{children}</span>
      </div>
    </li>
  );
};

export default ListItem;
