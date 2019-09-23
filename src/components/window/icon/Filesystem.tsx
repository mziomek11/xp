import React from "react";

import Icon from "./Icon";
import withContext from "../../../hoc/withContext";
import { getIcon } from "../../../icons";
import { FilesystemContextType } from "ContextType";

type Props = {
  context: FilesystemContextType;
};

export const FilesystemIcon: React.FC<Props> = ({ context }) => {
  const pathLength = context.path.length;

  let iconSrc;

  if (pathLength === 0) iconSrc = getIcon("computer", false);
  else if (pathLength === 1) iconSrc = getIcon("disk", false);
  else iconSrc = getIcon("folder", false);

  return <Icon src={iconSrc} data-test="icon" />;
};

export default withContext(FilesystemIcon, "filesystem");
