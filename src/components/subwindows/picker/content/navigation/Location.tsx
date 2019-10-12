import React from "react";

import withContext from "../../../../../hoc/withContext";
import Location from "../../../../location/Location";
import { FilesystemContextType } from "ContextType";

type Props = {
  filesystem: FilesystemContextType;
};

export const PickerLocation: React.FC<Props> = ({ filesystem }) => {
  return (
    <Location
      path={filesystem.path}
      setPath={filesystem.setPath}
      historyPosition={filesystem.historyPosition}
      data-test="location"
    />
  );
};

export default withContext(PickerLocation, "filesystem");
