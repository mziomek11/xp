import React, { useContext } from "react";

import FilesystemContext from "../../context/Context";

import {
  DropDown,
  OptionWithDropDown,
  RadioGroup
} from "../../../../dropdown/";

const ArrangeIconsBy = () => {
  const { options, setOptions } = useContext(FilesystemContext);

  const handleArrangeIconsByClick = (value: string) => {
    setOptions({ arrangeIconsBy: value as any });
  };

  const dropdown = (
    <DropDown horPosition="right" vertPosition="top-aligned">
      <RadioGroup
        checkedValue={options.arrangeIconsBy}
        onClick={handleArrangeIconsByClick}
        options={[
          { name: "Name", value: "name" },
          { name: "Type", value: "type" }
        ]}
      />
    </DropDown>
  );

  return <OptionWithDropDown name="Arrange Icons by" dropdown={dropdown} />;
};

export default ArrangeIconsBy;
