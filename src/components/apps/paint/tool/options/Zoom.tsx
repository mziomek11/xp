import React, { Component } from "react";

import Options from "./Options";
import Option, { Props as OptionProps } from "./Option";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { ZoomSize } from "../../models";

type CtxProps = {
  paint: PaintContextType;
};

export class ZoomOptions extends Component<CtxProps> {
  shouldComponentUpdate(nextProps: CtxProps) {
    const { zoom } = this.props.paint.options;

    return zoom !== nextProps.paint.options.zoom;
  }

  getOptionData = (size: ZoomSize): [OptionProps, React.CSSProperties] => {
    const props = this.getOptionProps(size);
    const inlineStyles = this.getInlineStyles(size);

    return [props, inlineStyles];
  };

  getOptionProps = (size: ZoomSize): OptionProps => {
    const focused = size === this.props.paint.options.zoom;
    const onClick = () => this.handleClick(size);

    return { focused, onClick };
  };

  handleClick = (size: ZoomSize) => {
    this.props.paint.setOptions({ zoom: size });
  };

  getInlineStyles = (size: ZoomSize): React.CSSProperties => ({
    height: size,
    width: size
  });

  render() {
    const sizes: ZoomSize[] = [
      ZoomSize.Default,
      ZoomSize.Small,
      ZoomSize.Medium,
      ZoomSize.Big
    ];

    return (
      <Options>
        {sizes.map(size => {
          const [props, style] = this.getOptionData(size);

          return (
            <Option {...props} key={size} data-test="option">
              <div className="paint__toolbar__options__zoom">
                <span className="paint__toolbar__options__zoom__text">
                  {`${size}x `}
                </span>
                <div
                  className="paint__toolbar__options__square"
                  style={style}
                />
              </div>
            </Option>
          );
        })}
      </Options>
    );
  }
}

export default withContext(ZoomOptions, "paint");
