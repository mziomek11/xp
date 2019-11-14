import React, { Component } from "react";

import MenuItem from "../../../menu/Item";
import withContext from "../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { DropDown, OptionCheckBox, Option } from "../../../dropdown";

type CtxProps = {
  paint: PaintContextType;
};

type Props = CtxProps;

export class Image extends Component<Props> {
  shouldComponentUpdate({ paint }: Props) {
    const { isTransparent } = this.props.paint.options.select;

    return isTransparent !== paint.options.select.isTransparent;
  }

  handleClearImageClick = () => {
    const { canvasCtx, secondaryColor } = this.props.paint;
    const { width, height } = canvasCtx!.canvas;

    const lastColor = canvasCtx!.fillStyle;
    canvasCtx!.fillStyle = secondaryColor;
    canvasCtx!.fillRect(0, 0, width, height);
    canvasCtx!.fillStyle = lastColor;
  };

  handleDrawOpaqueClick = () => {
    const { setSelectOptions, options } = this.props.paint;

    setSelectOptions({ isTransparent: !options.select.isTransparent });
  };

  render() {
    const { isTransparent } = this.props.paint.options.select;

    const dropDown = (
      <DropDown>
        <Option name="Clear image" onClick={this.handleClearImageClick} />
        <OptionCheckBox
          name="Draw opaque"
          isChecked={isTransparent}
          onClick={this.handleDrawOpaqueClick}
        />
      </DropDown>
    );

    return <MenuItem name="Image" dropdown={dropDown} data-test="image" />;
  }
}

export default withContext(Image, "paint");
