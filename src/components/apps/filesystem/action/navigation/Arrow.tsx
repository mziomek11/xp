import React, { Component } from "react";

import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import HistoryArrow from "./HistoryArrow";
import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { getClassName, areArraysEqual } from "../../../../../utils";

export type DirectionArrowProps = {
  disabled: boolean;
  containerClass: string;
  arrowClass: string;
  onClick: any;
  historyArrow: JSX.Element;
  onlyIcon?: boolean;
};

type Props = {
  isLeft: boolean;
  filesystem: FilesystemContextType;
  small?: boolean;
} & Pick<DirectionArrowProps, "onlyIcon">;

type State = {
  isOpen: boolean;
};

export class Arrow extends Component<Props, State> {
  public static defaultProps = {
    onlyIcon: false,
    small: false
  };

  readonly state: State = {
    isOpen: false
  };

  shouldComponentUpdate({ filesystem }: Props, prevState: State) {
    const { shortcuts, history, historyPosition } = this.props.filesystem;
    const { back, forward } = shortcuts;

    if (prevState.isOpen !== this.state.isOpen) return true;
    if (filesystem.shortcuts.back.disabled !== back.disabled) return true;
    if (filesystem.shortcuts.forward.disabled !== forward.disabled) return true;
    if (historyPosition !== filesystem.historyPosition) return true;
    if (!areArraysEqual(history, filesystem.history)) return true;

    for (let i = 0; i < history.length; i++) {
      if (!areArraysEqual(history[i], filesystem.history[i])) return true;
    }

    return false;
  }

  setOpen = (value: boolean) => this.setState({ isOpen: value });

  handleClick = (
    { target }: React.MouseEvent<HTMLDivElement>,
    container: Element,
    arrow: Element,
    text: Element | null = null
  ) => {
    const { isLeft, filesystem } = this.props;
    const { back, forward } = filesystem.shortcuts;

    const shouldChange = this.shouldChangeHistory(
      target as Element,
      container,
      arrow,
      text
    );

    if (shouldChange) {
      if (isLeft) back.emit();
      else forward.emit();
    }
  };

  shouldChangeHistory = (
    target: Element,
    container: Element,
    arrow: Element,
    text: Element | null
  ) => {
    if (this.isDisabled()) return false;

    const isContainer = target.isEqualNode(container);
    const isArrow = target.isEqualNode(arrow);
    const isText = text && target.isEqualNode(text);

    return isContainer || isArrow || isText;
  };

  getContainerClassName = (disabled: boolean) => {
    const baseClass = "filesystem__action";
    const modifiers = {
      disabled,
      open: this.state.isOpen,
      small: this.props.small!,
      "with-arrow": this.props.onlyIcon!
    };

    return getClassName(baseClass, modifiers);
  };

  getArrowClass = () => {
    const baseClass = "filesystem__action__icon";
    const modifiers = { small: this.props.small! };

    return getClassName(baseClass, modifiers);
  };

  getOptionsData = () => {
    const { isLeft, filesystem } = this.props;
    const { historyPosition, getLocationOptions, history } = filesystem;

    const start = historyPosition + (isLeft ? -1 : 1);
    const end = isLeft ? 0 : history.length;

    return getLocationOptions(start, end, !isLeft);
  };

  isDisabled = () => {
    const { isLeft, filesystem } = this.props;
    const { back, forward } = filesystem.shortcuts;

    return isLeft ? back.disabled : forward.disabled;
  };

  render() {
    const disabled = this.isDisabled();
    const containerClass = this.getContainerClassName(disabled);
    const arrowClass = this.getArrowClass();
    const dropdownOptions = this.getOptionsData();

    const historyArrow = (
      <HistoryArrow
        disabled={disabled}
        dropdownOptions={dropdownOptions}
        isOpen={this.state.isOpen}
        setOpen={this.setOpen}
      />
    );

    const arrowProps: DirectionArrowProps = {
      disabled,
      containerClass,
      arrowClass,
      historyArrow,
      onClick: this.handleClick,
      onlyIcon: this.props.onlyIcon
    };

    if (this.props.isLeft) {
      return <ArrowLeft {...arrowProps} data-test="arrow-left" />;
    }
    return <ArrowRight {...arrowProps} data-test="arrow-right" />;
  }
}

export default withContext(Arrow, "filesystem");
