export type FileType = "computer" | "disk" | "folder" | "text";

export type File = {
  type: FileType;
  name: string;
  content: Content;
};

export type Content = FolderContent | TextContent;
export type FolderContent = { [x: string]: File };
export type TextContent = string;

export type FileTree = {
  [x: string]: File;
};
