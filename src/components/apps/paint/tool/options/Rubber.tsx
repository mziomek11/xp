import React, { Component } from "react";

import Options from "./Options";
import Option, { Props as OptionProps } from "./Option";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { RubberSize } from "../../models";

type CtxProps = {
  paint: PaintContextType;
};

export class RubberOptions extends Component<CtxProps> {
  private rubberClass = "paint__toolbar__options__square";

  shouldComponentUpdate(nextProps: CtxProps) {
    const { rubberSize } = this.props.paint.options;

    return rubberSize !== nextProps.paint.options.rubberSize;
  }

  getOptionData = (size: RubberSize): [OptionProps, React.CSSProperties] => {
    const props = this.getProps(size);
    const inlineStyle = this.getInlineStyles(size);

    return [props, inlineStyle];
  };

  getProps = (size: RubberSize): OptionProps => {
    const focused = size === this.props.paint.options.rubberSize;
    const onClick = () => this.handleClick(size);

    return { focused, onClick };
  };

  getInlineStyles = (size: RubberSize): React.CSSProperties => ({
    height: size,
    width: size
  });

  handleClick = (size: RubberSize) => {
    this.props.paint.setOptions({ rubberSize: size });
  };

  render() {
    const sizes: RubberSize[] = [
      RubberSize.Small,
      RubberSize.Medium,
      RubberSize.Big,
      RubberSize.ExtraBig
    ];

    return (
      <Options>
        {sizes.map(size => {
          const [props, style] = this.getOptionData(size);

          return (
            <Option {...props} key={size} data-test="option">
              <div className={this.rubberClass} style={style} />
            </Option>
          );
        })}
      </Options>
    );
  }
}

export default withContext(RubberOptions, "paint");
