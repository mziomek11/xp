import React from "react";
import uuid from "uuid";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import File from "./File";
import { open as openWindow } from "../../store/window/actions";

type DispatchProps = {
  openWindow: (application: string, title: string) => void;
};

const fileNames: string[] = [
  "Chrome",
  "Very long name too long papapap yo hey",
  "VS Code",
  "Terminal"
];

export const FileList: React.FC<DispatchProps> = ({ openWindow }) => {
  return (
    <div data-test="file-list">
      {fileNames.map((name, i) => (
        <File
          name={name}
          key={i}
          left={0}
          top={50 * i}
          onDoubleClick={() => openWindow(name, "Untitled " + name)}
          data-test="file"
        />
      ))}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  openWindow: (application: string, title: string) =>
    dispatch(openWindow(uuid(), application, title, false))
});

export default connect(
  null,
  mapDispatchToProps
)(FileList);
