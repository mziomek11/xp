import React, { Component } from "react";

import Menu from "./menu/Menu";
import Display from "./Display";
import Button from "./Button";

class Calculator extends Component {
  clearMemory = () => {};

  memoryRecall = () => {};

  memoryStore = () => {};

  memoryAdd = () => {};

  backspace = () => {};

  clearAll = () => {};

  clear = () => {};

  handleValueClick = (e?: React.MouseEvent<HTMLButtonElement>) => {};

  divide = () => {};

  multiple = () => {};

  add = () => {};

  subtract = () => {};

  equal = () => {};

  squareRoot = () => {};

  opposite = () => {};

  inverse = () => {};

  percent = () => {};

  dot = () => {};

  render() {
    return (
      <div className="calculator" data-test="calculator">
        <Menu />
        <div className="calculator__content">
          <Display />
          <div className="calculator__buttons">
            <div className="calculator__left">
              <div className="calculator__rect" />
              <div className="calculator__left__bottom">
                <Button onClick={this.clearMemory} isRed>
                  MC
                </Button>
                <Button onClick={this.memoryRecall} isRed>
                  MR
                </Button>
                <Button onClick={this.memoryStore} isRed>
                  MS
                </Button>
                <Button onClick={this.memoryAdd} isRed>
                  M+
                </Button>
              </div>
            </div>
            <div className="calculator__right">
              <div className="calculator__right__top">
                <Button onClick={this.backspace} isRed>
                  Backspace
                </Button>
                <Button onClick={this.clearAll} isRed>
                  CE
                </Button>
                <Button onClick={this.clear} isRed>
                  C
                </Button>
              </div>
              <div className="calculator__right__bottom">
                <Button onClick={this.handleValueClick}>7</Button>
                <Button onClick={this.handleValueClick}>8</Button>
                <Button onClick={this.handleValueClick}>9</Button>
                <Button onClick={this.divide} isRed>
                  /
                </Button>
                <Button onClick={this.squareRoot}>sqrt</Button>

                <Button onClick={this.handleValueClick}>4</Button>
                <Button onClick={this.handleValueClick}>5</Button>
                <Button onClick={this.handleValueClick}>6</Button>
                <Button onClick={this.multiple} isRed>
                  *
                </Button>
                <Button onClick={this.percent}>%</Button>

                <Button onClick={this.handleValueClick}>1</Button>
                <Button onClick={this.handleValueClick}>2</Button>
                <Button onClick={this.handleValueClick}>3</Button>
                <Button onClick={this.subtract} isRed>
                  -
                </Button>
                <Button onClick={this.inverse}>1/x</Button>

                <Button onClick={this.handleValueClick}>0</Button>
                <Button onClick={this.opposite}>x/-</Button>
                <Button onClick={this.dot}>.</Button>
                <Button onClick={this.add} isRed>
                  +
                </Button>
                <Button onClick={this.equal} isRed>
                  =
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
