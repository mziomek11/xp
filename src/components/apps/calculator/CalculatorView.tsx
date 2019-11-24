import React from "react";

import Menu from "./menu/Menu";
import Display from "./Display";
import Button from "./Button";

type Props = {
  triedToDivideByZero: boolean;
  wrongFunctionArgument: boolean;
  displayText: string;
  onValueClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onClearMemoryClick: VoidFunction;
  onMemoryRecallClick: VoidFunction;
  onMemoryStoreClick: VoidFunction;
  onMemoryAddClick: VoidFunction;
  onBackspaceClick: VoidFunction;
  onClearAllClick: VoidFunction;
  onClearClick: VoidFunction;
  onAddClick: VoidFunction;
  onSubtractClick: VoidFunction;
  onMultipleClick: VoidFunction;
  onDivideClick: VoidFunction;
  onEqualClick: VoidFunction;
  onPercentClick: VoidFunction;
  onSquareRootClick: VoidFunction;
  onInverseClick: VoidFunction;
  onDotClick: VoidFunction;
  onOppositeClick: VoidFunction;
};

const CalculatorView: React.FC<Props> = ({
  triedToDivideByZero,
  wrongFunctionArgument,
  displayText,
  onValueClick,
  onClearMemoryClick,
  onMemoryRecallClick,
  onMemoryStoreClick,
  onMemoryAddClick,
  onBackspaceClick,
  onClearAllClick,
  onClearClick,
  onAddClick,
  onSubtractClick,
  onMultipleClick,
  onDivideClick,
  onEqualClick,
  onPercentClick,
  onSquareRootClick,
  onInverseClick,
  onDotClick,
  onOppositeClick
}) => {
  return (
    <div className="calculator" data-test="calculator">
      <Menu />
      <div className="calculator__content">
        <Display
          text={displayText}
          triedToDivideByZero={triedToDivideByZero}
          wrongFunctionArgument={wrongFunctionArgument}
        />
        <div className="calculator__buttons">
          <div className="calculator__left">
            <div className="calculator__rect" />
            <div className="calculator__left__bottom">
              <Button onClick={onClearMemoryClick} isRed>
                MC
              </Button>
              <Button onClick={onMemoryRecallClick} isRed>
                MR
              </Button>
              <Button onClick={onMemoryStoreClick} isRed>
                MS
              </Button>
              <Button onClick={onMemoryAddClick} isRed>
                M+
              </Button>
            </div>
          </div>
          <div className="calculator__right">
            <div className="calculator__right__top">
              <Button onClick={onBackspaceClick} isRed>
                Backspace
              </Button>
              <Button onClick={onClearClick} isRed>
                CE
              </Button>
              <Button onClick={onClearAllClick} isRed>
                C
              </Button>
            </div>
            <div className="calculator__right__bottom">
              <Button onClick={onValueClick}>7</Button>
              <Button onClick={onValueClick}>8</Button>
              <Button onClick={onValueClick}>9</Button>
              <Button onClick={onDivideClick} isRed>
                /
              </Button>
              <Button onClick={onSquareRootClick}>sqrt</Button>

              <Button onClick={onValueClick}>4</Button>
              <Button onClick={onValueClick}>5</Button>
              <Button onClick={onValueClick}>6</Button>
              <Button onClick={onMultipleClick} isRed>
                *
              </Button>
              <Button onClick={onPercentClick}>%</Button>

              <Button onClick={onValueClick}>1</Button>
              <Button onClick={onValueClick}>2</Button>
              <Button onClick={onValueClick}>3</Button>
              <Button onClick={onSubtractClick} isRed>
                -
              </Button>
              <Button onClick={onInverseClick}>1/x</Button>

              <Button onClick={onValueClick}>0</Button>
              <Button onClick={onOppositeClick}>x/-</Button>
              <Button onClick={onDotClick}>,</Button>
              <Button onClick={onAddClick} isRed>
                +
              </Button>
              <Button onClick={onEqualClick} isRed>
                =
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorView;
