import React, { Component } from "react";
import { connect } from "react-redux";

import FileSystem from "./filesystem/FileSystem";
import Notepad from "./notepad/Notepad";
import Paint from "./paint/Paint";
import WindowContainer from "../window/WindowContainer";
import windowConfig from "../../config/window";
import { Provider as FilesystemContextProvider } from "./filesystem/context/Context";
import { Provider as NotepadContextProvider } from "./notepad/context/Context";
import { Provider as PaintContextProvider } from "./paint/context/Context";
import { RootState } from "MyTypes";
import { Window } from "../../store/window/models";
import {
  Provider as WindowContextProvider,
  MinMaxProps,
  StartProps
} from "../window/Context";
import {
  getWindowDefaultMinMaxProps,
  getWindowStartWidthAndHeight,
  getWindowStartLeftAndTop
} from "../../utils/window";

type OwnProps = {
  id: string;
};

type StateProps = {
  window: Window;
  screenWidth: number;
  screenHeight: number;
};

type Props = OwnProps & StateProps;

export class Application extends Component<Props, {}> {
  getApplication = () => {
    switch (this.props.window.application) {
      case "filesystem":
        return this.getFilesystemApp();
      case "notepad":
        return this.getNotepadApp();
      case "paint":
        return this.getPaintApp();
      default:
        throw Error(`${this.props.window.application} is not an application`);
    }
  };

  getFilesystemApp = () => (
    <FilesystemContextProvider
      id={this.props.id}
      startPath={[]}
      defaultDisplay="tiles"
    >
      <FileSystem data-test="filesystem" />
    </FilesystemContextProvider>
  );

  getNotepadApp = () => {
    const { content, path } = this.props.window.openData!;
    return (
      <NotepadContextProvider startText={content as string} startPath={path}>
        <Notepad data-test="notepad" />
      </NotepadContextProvider>
    );
  };

  getPaintApp = () => {
    const { content, path } = this.props.window.openData!;
    return (
      <PaintContextProvider startImage={content as ImageData} startPath={path}>
        <Paint data-test="paint" />
      </PaintContextProvider>
    );
  };

  getWindowCtxProps = () => {
    const windowMinMaxProps = this.getMinMaxProps();
    const startSize = this.getStartSize(windowMinMaxProps);
    const startPosition = this.getStartPosition(startSize);

    return {
      id: this.props.id,
      startFullscreened: false,
      ...windowMinMaxProps,
      ...startSize,
      ...startPosition
    };
  };

  getMinMaxProps = () => {
    const { screenWidth, screenHeight } = this.props;

    return getWindowDefaultMinMaxProps(screenWidth, screenHeight);
  };

  getStartSize = (minMaxProps: MinMaxProps) => {
    const { INITIAL_WIDTH, INITIAL_HEIGHT } = windowConfig;

    return getWindowStartWidthAndHeight(
      INITIAL_WIDTH,
      INITIAL_HEIGHT,
      minMaxProps
    );
  };

  getStartPosition = (
    startSize: Pick<StartProps, "startWidth" | "startHeight">
  ) => {
    const { screenWidth, screenHeight } = this.props;

    return getWindowStartLeftAndTop(
      startSize.startWidth,
      startSize.startHeight,
      screenWidth,
      screenHeight
    );
  };

  render() {
    const windowCtxProps = this.getWindowCtxProps();

    return (
      <WindowContextProvider {...windowCtxProps} data-test="ctx">
        <WindowContainer>{this.getApplication()}</WindowContainer>
      </WindowContextProvider>
    );
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => {
  return {
    window: state.window.byId[id],
    screenWidth: state.screen.width,
    screenHeight: state.screen.height
  };
};

export default connect(mapStateToProps)(Application);
