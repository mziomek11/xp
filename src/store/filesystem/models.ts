export type FileType = "computer" | "disk" | "folder" | "text" | "image";

export type File = {
  type: FileType;
  name: string;
  content: Content;
};

export type Content = FolderContent | TextContent | ImageContent;
export type FolderContent = { [x: string]: File };
export type TextContent = string;
export type ImageContent = ImageData | undefined;

export type FileTree = {
  [x: string]: File;
};
