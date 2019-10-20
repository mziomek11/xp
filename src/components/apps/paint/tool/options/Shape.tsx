import React, { Component } from "react";

import Options from "./Options";
import Option, { Props as OptionProps } from "./Option";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { ShapeDrawMode } from "../../models";
import { getClassName } from "../../../../../utils";

type CtxProps = {
  paint: PaintContextType;
};

export class ShapeOptions extends Component<CtxProps> {
  private shapeClass = "paint__toolbar__options__shape";

  shouldComponentUpdate(nextProps: CtxProps) {
    const { selectedTool, options } = this.props.paint;

    if (selectedTool !== nextProps.paint.selectedTool) return true;

    const actualDrawMode = (options.shapeDrawMode as any)[selectedTool];
    const nextDrawMode = (nextProps.paint.options.shapeDrawMode as any)[
      selectedTool
    ];

    return actualDrawMode !== nextDrawMode;
  }

  getOptionData = (option: ShapeDrawMode): [OptionProps, string] => {
    const props = this.getProps(option);
    const className = this.getClassName(option);

    return [props, className];
  };

  getProps = (option: ShapeDrawMode): OptionProps => {
    const { options, selectedTool } = this.props.paint;

    const focused = option === (options.shapeDrawMode as any)[selectedTool];
    const onClick = () => this.handleClick(option);

    return { focused, onClick };
  };

  handleClick = (option: ShapeDrawMode) => {
    const { setOptions, selectedTool, options } = this.props.paint;

    const newOptions: any = { shapeDrawMode: { ...options.shapeDrawMode } };
    newOptions.shapeDrawMode[selectedTool] = option;
    setOptions(newOptions);
  };

  getClassName = (option: ShapeDrawMode) => {
    return getClassName(this.shapeClass, {}, [option]);
  };

  render() {
    const drawModes: ShapeDrawMode[] = ["stroke", "both", "fill"];

    return (
      <Options>
        {drawModes.map(mode => {
          const [props, className] = this.getOptionData(mode);

          return (
            <Option {...props} key={mode} data-test="option">
              <div className={className} />
            </Option>
          );
        })}
      </Options>
    );
  }
}

export default withContext(ShapeOptions, "paint");
