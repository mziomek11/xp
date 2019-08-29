import React from "react";

import File from "./File";

const fileNames: string[] = [
  "Chrome",
  "Very long name too long papapap yo hey",
  "VS Code",
  "Terminal"
];

const FileList = () => {
  return (
    <div data-test="file-list">
      {fileNames.map((name, i) => (
        <File name={name} key={i} left={0} top={50 * i} data-test="file" />
      ))}
    </div>
  );
};

export default FileList;
