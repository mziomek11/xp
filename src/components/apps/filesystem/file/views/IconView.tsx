import React from "react";
import { ViewProps } from "../FileContainer";

import Renamer from "../Renamer";

const IconView: React.FC<ViewProps> = ({
  containerClass,
  getElementClass,
  onClick,
  icon,
  name,
  renaming
}) => {
  return (
    <div className={containerClass} data-test="container">
      <div
        className={getElementClass("content")}
        onClick={onClick}
        data-test="clickable"
      >
        <div className={getElementClass("icon-container")}>
          <img
            className={getElementClass("icon")}
            src={icon}
            alt="file icon"
            data-test="icon"
          />
        </div>
        <div className={getElementClass("name-container")}>
          {renaming ? (
            <Renamer
              className={getElementClass("renamer")}
              startText={name}
              data-test="renamer"
            />
          ) : (
            <span className={getElementClass("name")} data-test="text">
              {name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default IconView;
