import React from "react";

type Props = {
  icon: string;
  onClick?: () => void;
};

const ListItem: React.FC<Props> = ({ children, icon, onClick }) => {
  return (
    <li className="filesystem__side-content-list-item" data-test="container">
      <div
        className="filesystem__side-content-list-item-container"
        onClick={onClick}
        data-test="clickable"
      >
        <div className="filesystem__side-content-list-item-icon-container">
          <img
            src={icon}
            className="filesystem__side-content-list-item-icon"
            alt="action-icon"
            data-test="icon"
          />
        </div>
        <span className="filesystem__side-content-list-item-text">
          {children}
        </span>
      </div>
    </li>
  );
};

export default ListItem;
