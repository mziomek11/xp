import React from "react";

import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";

import Navigation from "./navigation/Navigation";
import Folders from "./Folders";
import Views from "./Views";

export const Bar: React.FC<{ context: FilesystemContextType }> = ({
  context
}) => {
  if (!context.options.showActionBar) return null;

  return (
    <div className="filesystem__action-bar" data-test="bar">
      <Navigation data-test="navigation" />
      <Folders data-test="folders" />
      <Views data-test="views" />
    </div>
  );
};

export default withContext(Bar, "filesystem");
