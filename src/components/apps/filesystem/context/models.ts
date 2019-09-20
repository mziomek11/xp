export type OptionData = { name: string; onClick: () => void };

export type Display = "thumbnails" | "tiles" | "icons" | "list";
type ArrageIconsBy = "name" | "type";
export type Options = {
  display: Display;
  arrangeIconsBy: ArrageIconsBy;
  showAdressBar: boolean;
  showActionBar: boolean;
  showFolders: boolean;
};

type Shortcut = {
  disabled: boolean;
  emit: () => void;
};

export type Shortcuts = {
  shortcuts: {
    copy: Shortcut;
    cut: Shortcut;
    paste: Shortcut;
    back: Shortcut;
    forward: Shortcut;
    delete: Shortcut;
    selectAll: Shortcut;
    goUp: Shortcut;
  };
};

export type CtxFunctions = {
  setPath: (path: string[], newPos: number) => void;
  setFocused: (focused: string[]) => void;
  setOptions: (o: Partial<Options>) => void;
  setRenamedFile: (toNull: boolean) => void;
  getLocationOptions: (
    start: number,
    end: number,
    goindUp: boolean
  ) => OptionData[];
};
