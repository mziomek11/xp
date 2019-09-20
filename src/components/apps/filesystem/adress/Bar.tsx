import React from "react";

import Location from "./Location";
import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";

export const Bar: React.FC<{ context: FilesystemContextType }> = ({
  context
}) => {
  const { showAdressBar } = context.options;
  if (!showAdressBar) return null;

  return (
    <div className="filesystem__adress-bar" data-test="container">
      <span className="filesystem__adress-text" data-test="text">
        Adress
      </span>
      <Location data-test="location" />
    </div>
  );
};

export default withContext(Bar, "filesystem");
