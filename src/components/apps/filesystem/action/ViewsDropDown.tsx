import React from "react";

import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { DropDown, RadioGroup } from "../../../dropdown";

export const ViewsDropDown: React.FC<{ context: FilesystemContextType }> = ({
  context
}) => {
  const { options, setOptions } = context;
  const { display } = options;
  const handleClick = (option: string) =>
    setOptions({ display: option as any });

  return (
    <DropDown data-test="dropdown">
      <RadioGroup
        onClick={handleClick}
        checkedValue={display}
        options={[
          { name: "Thumbnails", value: "thumbnails" },
          { name: "Tiles", value: "tiles" },
          { name: "Icons", value: "icons" },
          { name: "List", value: "list" }
        ]}
        data-test="radio-group"
      />
    </DropDown>
  );
};

export default withContext(ViewsDropDown, "filesystem");
