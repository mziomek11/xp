import React from "react";

import File from "./File";

const FileList = () => {
  return (
    <div className="desktop__file__list" data-test="file-list">
      <File
        name="Computer"
        startWindowName="Computer"
        application="filesystem"
        data-test="computer"
      />
      <File
        name="Notepad"
        startWindowName="Untilted - Notepad"
        application="notepad"
        openData={{
          content: "",
          path: undefined
        }}
        data-test="notepad"
      />
    </div>
  );
};

export default FileList;
