import React, { Component } from "react";
import { connect } from "react-redux";

import FileSystem from "./filesystem/FileSystem";
import Notepad from "./notepad/Notepad";
import Paint from "./paint/Paint";
import Minesweeper from "./minesweeper/Minesweeper";
import Calculator from "./calculator/Calculator";
import WindowContainer from "../window/WindowContainer";
import windowConfig from "../../config/window";
import calculatorConfig from "./calculator/config";
import { Provider as FilesystemContextProvider } from "./filesystem/context/Context";
import { Provider as NotepadContextProvider } from "./notepad/context/Context";
import { Provider as PaintContextProvider } from "./paint/context/Context";
import { Provider as MinesweeperContextProvider } from "./minesweeper/context/Context";
import { RootState } from "MyTypes";
import { Window } from "../../store/window/models";
import { getMinesweeperSize } from "../../utils/minesweeper";
import {
  Provider as WindowContextProvider,
  MinMaxProps,
  StartProps,
  OptionalProps
} from "../window/Context";
import {
  getWindowDefaultMinMaxProps,
  getWindowStartWidthAndHeight,
  getWindowStartLeftAndTop,
  getWindowNoResizableMinMaxProps
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
  getApplication = (): JSX.Element => {
    switch (this.props.window.application) {
      case "filesystem":
        return this.getFilesystemApp();
      case "notepad":
        return this.getNotepadApp();
      case "paint":
        return this.getPaintApp();
      case "minesweeper":
        return this.getMinesweeperApp();
      case "calculator":
        return this.getCalculatorApp();
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

  getMinesweeperApp = () => {
    return (
      <MinesweeperContextProvider>
        <Minesweeper data-test="minesweeper" />
      </MinesweeperContextProvider>
    );
  };

  getCalculatorApp = () => {
    return <Calculator data-test="calculator" />;
  };

  getWindowCtxProps = (): MinMaxProps & StartProps & OwnProps => {
    const windowMinMaxProps = this.getMinMaxProps();
    const startSize = this.getStartSize(windowMinMaxProps);
    const startPosition = this.getStartPosition(startSize);
    const specialAppProps = this.getSpecialAppProps();

    return {
      id: this.props.id,
      startFullscreened: false,
      ...windowMinMaxProps,
      ...startSize,
      ...startPosition,
      ...specialAppProps
    };
  };

  getSpecialAppProps = (): Partial<OptionalProps | StartProps> => {
    const { application } = this.props.window;

    switch (application) {
      case "paint":
        return { startFullscreened: true };
      case "minesweeper":
      case "calculator":
        return { resizable: false, hideFullscreen: true };
      default:
        return {};
    }
  };

  getMinMaxProps = (): MinMaxProps => {
    const { screenWidth, screenHeight, window } = this.props;

    switch (window.application) {
      case "minesweeper":
        const { x, y } = getMinesweeperSize("easy");
        return getWindowNoResizableMinMaxProps(x, y);
      case "calculator":
        return getWindowNoResizableMinMaxProps(
          calculatorConfig.width,
          calculatorConfig.height
        );
      default:
        return getWindowDefaultMinMaxProps(screenWidth, screenHeight);
    }
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
