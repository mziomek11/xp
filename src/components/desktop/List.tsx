import React from "react";

import File from "./File";

const FileList = () => {
  return (
    <div data-test="file-list">
      <File
        name="Computer"
        application="Filesystem"
        type="computer"
        left={0}
        top={0}
        data-test="computer"
      />
    </div>
  );
};

export default FileList;
