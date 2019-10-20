import React, { Component } from "react";

import Options from "./Options";
import Option, { Props as OptionProps } from "./Option";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { AeroSize } from "../../models";

import aeroSmall from "../../../../../assets/paint/aero-small.png";
import aeroMedium from "../../../../../assets/paint/aero-medium.png";
import aeroBig from "../../../../../assets/paint/aero-big.png";

type CtxProps = {
  paint: PaintContextType;
};

type ImageProps = {
  src: string;
  alt: string;
  className: string;
};

export class AeroOptions extends Component<CtxProps> {
  private aeroClass = "paint__toolbar__options__aero";

  shouldComponentUpdate(nextProps: CtxProps) {
    const { aeroSize } = this.props.paint.options;

    return aeroSize !== nextProps.paint.options.aeroSize;
  }

  getOptionData = (size: AeroSize): [OptionProps, ImageProps] => {
    const props = this.getOptionProps(size);
    const imageProps = this.getImageProps(size);

    return [props, imageProps];
  };

  getOptionProps = (size: AeroSize): OptionProps => {
    const focused = size === this.props.paint.options.aeroSize;
    const onClick = () => this.handleClick(size);
    const modifiers = size === AeroSize.Big ? ["span"] : [];

    return { focused, onClick, modifiers };
  };

  getImageProps = (size: AeroSize): ImageProps => {
    const src = this.getImageSrc(size);
    const alt = "aero size icon";
    const className = this.aeroClass;

    return { src, alt, className };
  };

  getImageSrc = (size: AeroSize): string => {
    if (size === AeroSize.Small) return aeroSmall;
    else if (size === AeroSize.Medium) return aeroMedium;
    else return aeroBig;
  };

  handleClick = (size: AeroSize) => {
    this.props.paint.setOptions({ aeroSize: size });
  };

  render() {
    const sizes: AeroSize[] = [AeroSize.Small, AeroSize.Medium, AeroSize.Big];

    return (
      <Options modifiers={["aero"]}>
        {sizes.map(size => {
          const [optsProps, { alt, ...imgProps }] = this.getOptionData(size);

          return (
            <Option {...optsProps} key={size} data-test="option">
              <img alt={alt} {...imgProps} />
            </Option>
          );
        })}
      </Options>
    );
  }
}

export default withContext(AeroOptions, "paint");
