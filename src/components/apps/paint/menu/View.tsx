import React, { Component } from "react";

import MenuItem from "../../../menu/Item";
import withContext from "../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import {
  DropDown,
  OptionCheckBox,
  Divider,
  Option,
  OptionWithDropDown
} from "../../../dropdown";
import { ZoomSize } from "../models";

type CtxProps = {
  paint: PaintContextType;
};

type Props = CtxProps;

export class View extends Component<Props> {
  shouldComponentUpdate({ paint }: Props) {
    const { showToolBox, showColorBox, options } = this.props.paint;
    return (
      showToolBox !== paint.showToolBox ||
      showColorBox !== paint.showColorBox ||
      options.zoom !== paint.options.zoom
    );
  }

  handleShowToolBoxClick = () => {
    const { setContext, showToolBox } = this.props.paint;
    setContext({ showToolBox: !showToolBox });
  };

  handleShowColorBoxClick = () => {
    const { setContext, showColorBox } = this.props.paint;
    setContext({ showColorBox: !showColorBox });
  };

  handleNormalZoomClick = () => this.changeZoom(ZoomSize.Default);

  handleLargeZoomClick = () => this.changeZoom(ZoomSize.Big);

  changeZoom = (size: ZoomSize) => this.props.paint.setOptions({ zoom: size });

  render() {
    const { showColorBox, showToolBox, options } = this.props.paint;
    const { zoom } = options;
    const zoomDropDown = (
      <DropDown horPosition="right" vertPosition="top-aligned">
        <Option
          name="Normal size"
          onClick={this.handleNormalZoomClick}
          disabled={zoom === ZoomSize.Default}
        />
        <Option
          name="Large size"
          onClick={this.handleLargeZoomClick}
          disabled={zoom === ZoomSize.Big}
        />
      </DropDown>
    );

    const dropDown = (
      <DropDown>
        <OptionCheckBox
          name="Toolbox"
          isChecked={showToolBox}
          onClick={this.handleShowToolBoxClick}
        />
        <OptionCheckBox
          name="Colorbox"
          isChecked={showColorBox}
          onClick={this.handleShowColorBoxClick}
        />
        <Divider />
        <OptionWithDropDown
          name="Zoom"
          arrowDirection="right"
          dropdown={zoomDropDown}
        />
      </DropDown>
    );

    return <MenuItem name="View" dropdown={dropDown} data-test="view" />;
  }
}

export default withContext(View, "paint");
