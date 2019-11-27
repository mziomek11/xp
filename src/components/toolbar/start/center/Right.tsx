import React from "react";

import Application from "./application/Application";
import FolderApplication from "./application/Folder";
import { filesystemStartData } from "../../../../fileStartData";

import myDocumentsImage from "../../../../assets/toolbar/my-documents.png";
import myPicturesImage from "../../../../assets/toolbar/my-pictures.png";
import myMusicImage from "../../../../assets/toolbar/my-music.png";

const Right = () => (
  <div className="start__right" data-test="right">
    <FolderApplication image={myDocumentsImage} name="My documents" />
    <FolderApplication
      image={myPicturesImage}
      name="My pictures"
      isInDocuments
    />
    <FolderApplication image={myMusicImage} name="My music" isInDocuments />
    <Application {...filesystemStartData} name="My computer" isRight isBold />
  </div>
);

export default Right;
