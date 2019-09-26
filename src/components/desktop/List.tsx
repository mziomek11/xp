import React from "react";

import File from "./File";

const FileList = () => {
  return (
    <div data-test="file-list">
      <File
        name="Computer"
        startWindowName="Computer"
        application="filesystem"
        left={0}
        top={0}
        data-test="computer"
      />
      <File
        name="Notepad"
        startWindowName="Untilted - Notepad"
        application="notepad"
        left={0}
        top={50}
        data-test="notepad"
      />
    </div>
  );
};

export default FileList;
