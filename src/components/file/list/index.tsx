import React from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import File from "../";
import { open as openWindow } from "../../../store/window/actions";

type DispatchProps = {
  openWindow: (name: string) => void;
};

const fileNames: string[] = ["Chrome", "Quake", "VS Code", "Terminal"];

export const FileList: React.FC<DispatchProps> = ({ openWindow }) => {
  return (
    <div data-test="file-list">
      {fileNames.map((name, i) => (
        <File
          name={name}
          key={i}
          left={0}
          top={50 * i}
          onDoubleClick={() => openWindow(name)}
          data-test="file"
        />
      ))}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    openWindow: (name: string) => dispatch(openWindow(uuid(), name, false))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FileList);
