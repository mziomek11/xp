import React from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { DropDown, OptionWithDropDown, Option } from "../../../../dropdown";
import { open as openWindow } from "../../../../../store/window/actions";
import { getIcon } from "../../../../../icons";
import { Application } from "../../../../../store/models";
import { OpenData } from "../../../../../store/window/models";
import {
  notepadStartData,
  paintStartData,
  getBasicStartData,
  StartData
} from "../../../../../fileStartData";

import dropdownFolderIcon from "../../../../../assets/toolbar/dropdown-folder.png";

type DispatchProps = {
  openWindow: (app: Application, name: string, openData?: OpenData) => void;
};

export const AllProgramsDropdown: React.FC<DispatchProps> = ({
  openWindow
}) => {
  const startApp = ({ application, startWindowName, openData }: StartData) =>
    openWindow(application, startWindowName, openData);

  const openNotepad = () => startApp(notepadStartData);
  const openPaint = () => startApp(paintStartData);
  const openCalculator = () => startApp(getBasicStartData("calculator"));
  const openMinesweeper = () => startApp(getBasicStartData("minesweeper"));

  return (
    <DropDown
      horPosition="right"
      vertPosition="bottom-aligned"
      classModifiers={["start"]}
      data-test="dropdown"
    >
      <OptionWithDropDown
        name="Accessories"
        icon={dropdownFolderIcon}
        dropdown={
          <DropDown
            horPosition="right"
            vertPosition="top-aligned"
            classModifiers={["start"]}
          >
            <Option
              name="Notepad"
              icon={getIcon("notepad")}
              onClick={openNotepad}
            />
            <Option name="Paint" icon={getIcon("paint")} onClick={openPaint} />
            <Option
              name="Calculator"
              icon={getIcon("calculator")}
              onClick={openCalculator}
            />
          </DropDown>
        }
      />
      <OptionWithDropDown
        name="Games"
        icon={dropdownFolderIcon}
        dropdown={
          <DropDown
            horPosition="right"
            vertPosition="top-aligned"
            classModifiers={["start"]}
          >
            <Option
              name="Minesweeper"
              icon={getIcon("minesweeper")}
              onClick={openMinesweeper}
            />
          </DropDown>
        }
      />
    </DropDown>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  openWindow: (
    application: Application,
    startWindowName: string,
    openData?: OpenData
  ) => dispatch(openWindow(uuid(), application, startWindowName, openData))
});

export default connect(null, mapDispatchToProps)(AllProgramsDropdown);
