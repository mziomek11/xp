import React, { useContext } from "react";

import FilesystemContext from "../../context/Context";

import MenuItem from "../../../../menu/Item";
import OptionArrangeIconsBy from "./ArrangeIconsBy";
import OptionExplorerBar from "./ExplorerBar";
import OptionGoTo from "./GoTo";
import OptionToolbars from "./Toolbars";
import { DropDown, Divider, Option, RadioGroup } from "../../../../dropdown/";

const Views = () => {
  const { options, setOptions } = useContext(FilesystemContext);
  const handleDisplayClick = (option: string) => {
    setOptions({ display: option as any });
  };

  const dropdown = (
    <DropDown>
      <OptionToolbars />
      <OptionExplorerBar />
      <Divider />
      <RadioGroup
        checkedValue={options.display}
        onClick={handleDisplayClick}
        options={[
          { name: "Thumbnails", value: "thumbnails" },
          { name: "Tiles", value: "tiles" },
          { name: "Icons", value: "icons" },
          { name: "List", value: "list" }
        ]}
      />
      <Divider />
      <OptionArrangeIconsBy />
      <Divider />
      <OptionGoTo />
      <Option name="Refresh" />
    </DropDown>
  );

  return <MenuItem name="View" dropdown={dropdown} />;
};

export default Views;
