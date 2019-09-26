import React, { Component, createContext } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Options, OptionData, Shortcuts, CtxFunctions } from "./models";
import { RootState } from "MyTypes";
import { FileTree, File } from "../../../../store/filesystem/models";
import { remove, copy, cut, paste } from "../../../../store/filesystem/actions";
import { rename } from "../../../../store/window/actions";
import { areArraysEqual, deepCopy } from "../../../../utils";
import { objectPropFromPath } from "../../../../utils/filesystem";
import { listClass, containerClass } from "../classNames";
import { Icon } from "../../../../icons";

type OwnProps = {
  id: string;
};

type StateProps = {
  fileTree: FileTree;
  copiedFiles: FileTree;
  focusedWindow: string | null;
};

type DispatchProps = {
  remove: (path: string[], files: string[]) => void;
  copy: (path: string[], files: string[]) => void;
  cut: (path: string[], files: string[]) => void;
  paste: (path: string[]) => void;
  renameWindow: (newName: string, icon: Icon) => void;
};

export type Props = OwnProps & StateProps & DispatchProps;

export type State = {
  path: string[];
  renamedFile: string | null;
  files: File[];
  focused: string[];
  history: Array<Array<string>>;
  historyPosition: number;
  options: Options;
};

export type Context = State & CtxFunctions & Shortcuts;

export const defaultOptions: Options = {
  display: "tiles",
  arrangeIconsBy: "type",
  showAdressBar: true,
  showActionBar: true,
  showFolders: false
};

const FilesystemContext = createContext<Context>({} as any);

export class ContextProvider extends Component<Props, State> {
  readonly state: State = {
    path: [],
    files: [],
    focused: [],
    history: [],
    renamedFile: null,
    options: defaultOptions,
    historyPosition: 0
  };

  componentDidMount() {
    const { fileTree } = this.props;
    const [files, possiblePath] = objectPropFromPath(fileTree, []);

    this.setState({
      path: possiblePath,
      files: files,
      history: [possiblePath]
    });

    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentDidUpdate(prevProps: StateProps, prevState: State) {
    const newState: Partial<State> = {};

    const [newFiles, newPath] = objectPropFromPath(
      this.props.fileTree,
      this.state.path
    );
    const newFilenames = Array.from(newFiles, file => file.name);
    const oldFilenames = Array.from(this.state.files, file => file.name);

    if (!areArraysEqual(this.state.path, newPath)) {
      newState.files = newFiles;
      newState.path = newPath;
      this.setWindowNameAndIcon(newPath);
      window.removeEventListener("mousedown", this.handleUnfocusClick);
      newState.focused = [];
    } else if (!areArraysEqual(oldFilenames, newFilenames)) {
      newState.files = newFiles;
      window.removeEventListener("mousedown", this.handleUnfocusClick);
      newState.focused = [];
    } else if (this.props.focusedWindow !== prevProps.focusedWindow) {
      window.removeEventListener("mousedown", this.handleUnfocusClick);
      newState.focused = [];
    }

    if (
      this.state.options.arrangeIconsBy !== prevState.options.arrangeIconsBy
    ) {
      newState.files = this.getSortedFiles();
    }

    if (Object.keys(newState).length > 0) this.setState(newState as State);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.handleUnfocusClick);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  getSortedFiles = () => {
    const { arrangeIconsBy } = this.state.options;
    const { files } = this.state;

    const sortFn = (a: any, b: any) => {
      return ("" + a[arrangeIconsBy]).localeCompare(b[arrangeIconsBy]);
    };
    const sortedFiles = Array.from(files).sort(sortFn);

    return sortedFiles;
  };

  setPath = (path: string[], newHistoryPos: number) => {
    const { fileTree } = this.props;
    const [files, possiblePath] = objectPropFromPath(fileTree, path);
    const newHistory = this.calculateHistory(newHistoryPos, possiblePath);

    this.setWindowNameAndIcon(possiblePath);
    this.setState({
      path: possiblePath,
      files: files,
      history: newHistory,
      historyPosition: newHistoryPos,
      focused: []
    });
  };

  setWindowNameAndIcon = (path: string[]) => {
    if (path.length > 0) {
      const newName = path[path.length - 1];
      const newIcon = path.length === 1 ? "disk" : "folder";
      this.props.renameWindow(newName, newIcon);
    } else this.props.renameWindow("Computer", "filesystem");
  };

  calculateHistory = (
    newHistoryPos: number,
    newPath: string[]
  ): Array<Array<string>> => {
    const { history, historyPosition } = this.state;

    if (newHistoryPos < historyPosition) return deepCopy(history);

    if (newHistoryPos > history.length - 1) {
      return [...deepCopy<typeof history>(history), newPath];
    } else if (!areArraysEqual(newPath, history[newHistoryPos])) {
      return [
        ...deepCopy<typeof history>(history).slice(0, newHistoryPos),
        newPath
      ];
    }

    return deepCopy(history);
  };

  setOptions = (options: Partial<Options>) => {
    this.setState({ options: { ...this.state.options, ...options } });
  };

  setRenamedFile = (toNull: boolean) => {
    this.setState({ renamedFile: toNull ? null : this.state.focused[0] });
  };

  setFocused = (focused: string[]) => {
    this.setState({ focused });

    window.removeEventListener("mousedown", this.handleUnfocusClick);
    window.addEventListener("mousedown", this.handleUnfocusClick);
  };

  handleUnfocusClick = (e: MouseEvent) => {
    if (this.clickIsUnfocusClick(e)) {
      this.setState({ focused: [] });
      window.removeEventListener("mousedown", this.handleUnfocusClick);
    }
  };

  clickIsUnfocusClick = ({ target }: MouseEvent): boolean => {
    const { classList } = target as Element;
    return classList.contains(containerClass) || classList.contains(listClass);
  };

  getLocationOptions = (start: number, end: number, goingUp: boolean) => {
    const optionsData: OptionData[] = [];

    if (goingUp) {
      for (let i = start; i < end; i++) {
        optionsData.push(this.getLocationOption(i));
      }
    } else {
      for (let i = start; i >= end; i--) {
        optionsData.push(this.getLocationOption(i));
      }
    }

    return optionsData;
  };

  getLocationOption = (historyPos: number) => {
    const { history } = this.state;
    const pathOnHistoryPoint = history[historyPos];
    const onClick = () => this.setPath(pathOnHistoryPoint, historyPos);

    let lastPathName = pathOnHistoryPoint[pathOnHistoryPoint.length - 1];
    if (!lastPathName || lastPathName === "") lastPathName = "Computer";

    return { name: lastPathName, onClick };
  };

  getContextValue = (): Context => {
    return {
      ...this.state,
      setPath: this.setPath,
      setFocused: this.setFocused,
      getLocationOptions: this.getLocationOptions,
      setOptions: this.setOptions,
      setRenamedFile: this.setRenamedFile,
      shortcuts: this.getShortcutData()
    };
  };

  getShortcutData = () => ({
    copy: {
      disabled: !this.canCutAndCopyAndDelete(),
      emit: this.onCopy
    },
    cut: {
      disabled: !this.canCutAndCopyAndDelete(),
      emit: this.onCut
    },
    paste: {
      disabled: !this.canPaste(),
      emit: this.onPaste
    },
    back: {
      disabled: !this.canGoBack(),
      emit: this.onBack
    },
    forward: {
      disabled: !this.canGoForward(),
      emit: this.onForward
    },
    delete: {
      disabled: !this.canCutAndCopyAndDelete(),
      emit: this.onDelete
    },
    selectAll: {
      disabled: false,
      emit: this.onSelectAll
    },
    goUp: {
      disabled: !this.canGoUp(),
      emit: this.onGoUp
    }
  });

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.altKey) {
      e.preventDefault();
    }

    if (this.props.id !== this.props.focusedWindow) return null;
    const canCutAndCopyAndDelete = this.canCutAndCopyAndDelete();

    if (e.key === "Delete" && canCutAndCopyAndDelete) {
      this.onDelete();
      return;
    }

    if (e.altKey) {
      if (e.key === "ArrowLeft" && this.canGoBack()) {
        this.onBack();
        return;
      }

      if (e.key === "ArrowRight" && this.canGoForward()) {
        this.onForward();
        return;
      }
    }

    if (e.ctrlKey) {
      const key = e.key.toUpperCase();

      if (key === "A") {
        this.onSelectAll();
        return;
      }

      if (key === "X" && canCutAndCopyAndDelete) {
        this.onCut();
        return;
      }

      if (key === "C" && canCutAndCopyAndDelete) {
        this.onCopy();
        return;
      }

      if (key === "V" && this.canPaste()) {
        this.onPaste();
        return;
      }
    }
  };

  canCutAndCopyAndDelete = () => {
    const { path, focused } = this.state;
    return path.length > 0 && focused.length > 0;
  };

  onDelete = () => {
    this.props.remove(this.state.path, this.state.focused);
  };

  onCut = () => {
    this.props.cut(this.state.path, this.state.focused);
  };

  onCopy = () => {
    this.props.copy(this.state.path, this.state.focused);
  };

  canPaste = () => {
    const { path } = this.state;
    return path.length > 0 && Object.keys(this.props.copiedFiles).length > 0;
  };

  onPaste = () => {
    this.props.paste(this.state.path);
  };

  canGoBack = () => {
    return this.state.historyPosition > 0;
  };

  onBack = () => {
    const { history, historyPosition } = this.state;
    this.setPath(history[historyPosition - 1], historyPosition - 1);
  };

  canGoForward = () => {
    const { historyPosition, history } = this.state;
    return historyPosition < history.length - 1;
  };

  onForward = () => {
    const { history, historyPosition } = this.state;
    this.setPath(history[historyPosition + 1], historyPosition + 1);
  };

  onSelectAll = () => {
    const fileNames = Array.from(this.state.files, ({ name }) => name);
    this.setFocused(fileNames);
  };

  canGoUp = () => {
    return this.state.path.length > 0;
  };

  onGoUp = () => {
    const { path, historyPosition } = this.state;
    const newPath = path.slice(0, path.length - 1);
    this.setPath(newPath, historyPosition + 1);
  };

  render() {
    const contextValue = this.getContextValue();
    return (
      <FilesystemContext.Provider value={contextValue} data-test="context">
        {this.props.children}
      </FilesystemContext.Provider>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    fileTree: state.fileSystem.files,
    focusedWindow: state.window.focused,
    copiedFiles: state.fileSystem.copiedFiles
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => {
  return {
    remove: (path, files) => dispatch(remove(path, files)),
    copy: (path, files) => dispatch(copy(path, files)),
    cut: (path, files) => dispatch(cut(path, files)),
    paste: path => dispatch(paste(path)),
    renameWindow: (name, icon) => dispatch(rename(id, name, icon))
  };
};

export const Provider = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContextProvider);

export default FilesystemContext;
