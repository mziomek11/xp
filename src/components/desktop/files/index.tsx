import React from "react";
import File from "../file";

const fileNames: string[] = ["Chrome", "Quake", "VS Code", "Terminal"];

const Files = () => {
  return (
    <div>
      {fileNames.map((name, i) => (
        <File name={name} key={i} left={0} top={50 * i} />
      ))}
    </div>
  );
};

export default Files;
