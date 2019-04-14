import * as React from 'react'
import { clearCalculator, equalsPressed, numberPressed, operatorPressed } from './actions'
import { operators } from './constants'
import { calculatorReducer } from './reducer'
import { calculatorInitialState } from './types'

export const Calculator = (): JSX.Element => {
  const [state, dispatch] = React.useReducer(calculatorReducer, calculatorInitialState)

  return (
    <div className="calculator-wrapper">
      <div className="calculator-display">{state.display}</div>
      <div className="calculator-buttons">
        <div className="calculator-button-row">
          <button className="calculator-button helper" onClick={() => dispatch(clearCalculator())}>
            AC
          </button>
          <button className="calculator-button helper">+/-</button>
          <button className="calculator-button helper">%</button>
          <button className="calculator-button operator" onClick={() => dispatch(operatorPressed(operators.divide))}>
            /
          </button>
        </div>
        <div className="calculator-button-row">
          <button className="calculator-button number" onClick={() => dispatch(numberPressed(7))}>
            7
          </button>
          <button className="calculator-button number" onClick={() => dispatch(numberPressed(8))}>
            8
          </button>
          <button className="calculator-button number" onClick={() => dispatch(numberPressed(9))}>
            9
          </button>
          <button className="calculator-button operator" onClick={() => dispatch(operatorPressed(operators.multiply))}>
            x
          </button>
        </div>
        <div className="calculator-button-row">
          <button className="calculator-button number" onClick={() => dispatch(numberPressed(4))}>
            4
          </button>
          <button className="calculator-button number" onClick={() => dispatch(numberPressed(5))}>
            5
          </button>
          <button className="calculator-button number" onClick={() => dispatch(numberPressed(6))}>
            6
          </button>
          <button className="calculator-button operator" onClick={() => dispatch(operatorPressed(operators.subtract))}>
            -
          </button>
        </div>
        <div className="calculator-button-row">
          <button className="calculator-button number" onClick={() => dispatch(numberPressed(1))}>
            1
          </button>
          <button className="calculator-button number" onClick={() => dispatch(numberPressed(2))}>
            2
          </button>
          <button className="calculator-button number" onClick={() => dispatch(numberPressed(3))}>
            3
          </button>
          <button className="calculator-button operator" onClick={() => dispatch(operatorPressed(operators.add))}>
            +
          </button>
        </div>
        <div className="calculator-button-row">
          <button className="calculator-button number zero" onClick={() => dispatch(numberPressed(0))}>
            0
          </button>
          <button className="calculator-button number">.</button>
          <button className="calculator-button operator" onClick={() => dispatch(equalsPressed())}>
            =
          </button>
        </div>
      </div>
    </div>
  )
}
