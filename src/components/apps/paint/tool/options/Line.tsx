import React, { Component } from "react";

import Options from "./Options";
import Option, { Props as OptionProps } from "./Option";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { LineWidth } from "../../models";

type CtxProps = {
  paint: PaintContextType;
};

export class LineOptions extends Component<CtxProps> {
  private lineClass = "paint__toolbar__options__line";

  shouldComponentUpdate(nextProps: CtxProps) {
    const { lineWidth } = this.props.paint.options;

    return lineWidth !== nextProps.paint.options.lineWidth;
  }

  getOptionData = (size: LineWidth): [OptionProps, React.CSSProperties] => {
    const props = this.getProps(size);
    const inlineStyles = this.getInlineStyles(size);

    return [props, inlineStyles];
  };

  getProps = (size: LineWidth): OptionProps => {
    const focused = size === this.props.paint.options.lineWidth;
    const onClick = () => this.handleClick(size);

    return { focused, onClick };
  };

  handleClick = (size: LineWidth) => {
    this.props.paint.setOptions({ lineWidth: size });
  };

  getInlineStyles = (size: LineWidth): React.CSSProperties => ({
    height: size
  });

  render() {
    const sizes: LineWidth[] = [
      LineWidth.ExtraSmall,
      LineWidth.Small,
      LineWidth.Medium,
      LineWidth.Big,
      LineWidth.ExtraBig
    ];

    return (
      <Options>
        {sizes.map(size => {
          const [props, style] = this.getOptionData(size);

          return (
            <Option {...props} key={size} data-test="option">
              <div className={this.lineClass} style={style} />
            </Option>
          );
        })}
      </Options>
    );
  }
}

export default withContext(LineOptions, "paint");
