export type FileType = "computer" | "disk" | "folder" | "text";

export type File = {
  type: FileType;
  name: string;
  content?: { [x: string]: File } | string;
};

export type FileTree = {
  [x: string]: File;
};
