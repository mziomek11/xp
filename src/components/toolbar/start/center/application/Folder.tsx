import React from "react";

import Application from "./Application";
import { filesystemStartData } from "../../../../../fileStartData";

type Props = {
  image: string;
  name: string;
  isInDocuments?: boolean;
};

export const userPath = ["Local Disk (C:)", "Documents and settings", "User"];

const FolderApplication: React.FC<Props> = ({ image, name, isInDocuments }) => {
  const path = [...userPath];
  if (isInDocuments) path.push("My documents");
  path.push(name);

  return (
    <Application
      {...filesystemStartData}
      startWindowName={name}
      openData={{ path }}
      image={image}
      name={name}
      isRight
      isBold
      data-test="app"
    />
  );
};

export default FolderApplication;
