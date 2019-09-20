import React from "react";

type Props = {
  shortcut?: string[];
};

const Shortcut: React.FC<Props> = ({ shortcut }) => {
  const getShortCut = () => {
    if (shortcut && shortcut.length > 0) {
      return shortcut.reduce((prev, curr) => `${prev}+${curr}`);
    } else return "";
  };

  return (
    <span className="dropdown__shortcut" data-test="shortcut">
      {getShortCut()}
    </span>
  );
};

export default Shortcut;
