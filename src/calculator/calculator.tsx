import * as React from 'react'
import { actionCreators, CalculatorAction } from './actions'
import { CalculatorButton } from './calculatorButton'
import { operatorSymbols } from './constants'
import { calculatorReducer } from './reducer'
import { calculatorInitialState } from './types'

const buildActions = (dispatch: React.Dispatch<CalculatorAction>) => ({
  numberPressed: (value: string) => dispatch(actionCreators.numberPressed(value)),
  operatorPressed: (operator: string) => dispatch(actionCreators.operatorPressed(operator)),
  equalsPressed: () => dispatch(actionCreators.equalsPressed()),
  clearCalculator: () => dispatch(actionCreators.clearCalculator()),
  decimalPointPressed: () => dispatch(actionCreators.decimalPointPressed()),
  toggleSign: () => dispatch(actionCreators.toggleSign()),
  percentPressed: () => dispatch(actionCreators.percentPressed())
})

export const Calculator = (): JSX.Element => {
  const [state, dispatch] = React.useReducer(calculatorReducer, calculatorInitialState)
  const actions = buildActions(dispatch)

  return (
    <div className="calculator-wrapper">
      <div className="calculator-display">{state.value || state.total || '0'}</div>
      <div className="calculator-buttons">
        <div className="calculator-button-row">
          <CalculatorButton text="AC" className="dark-gray" handleClick={actions.clearCalculator} />
          <CalculatorButton text="+/-" className="dark-gray" handleClick={actions.toggleSign} />
          <CalculatorButton text="%" className="dark-gray" handleClick={actions.percentPressed} />
          <CalculatorButton text={operatorSymbols.divide} className="orange" handleClick={actions.operatorPressed} />
        </div>
        <div className="calculator-button-row">
          <CalculatorButton text="7" className="gray" handleClick={actions.numberPressed} />
          <CalculatorButton text="8" className="gray" handleClick={actions.numberPressed} />
          <CalculatorButton text="9" className="gray" handleClick={actions.numberPressed} />
          <CalculatorButton text={operatorSymbols.multiply} className="orange" handleClick={actions.operatorPressed} />
        </div>
        <div className="calculator-button-row">
          <CalculatorButton text="4" className="gray" handleClick={actions.numberPressed} />
          <CalculatorButton text="5" className="gray" handleClick={actions.numberPressed} />
          <CalculatorButton text="6" className="gray" handleClick={actions.numberPressed} />
          <CalculatorButton text={operatorSymbols.subtract} className="orange" handleClick={actions.operatorPressed} />
        </div>
        <div className="calculator-button-row">
          <CalculatorButton text="1" className="gray" handleClick={actions.numberPressed} />
          <CalculatorButton text="2" className="gray" handleClick={actions.numberPressed} />
          <CalculatorButton text="3" className="gray" handleClick={actions.numberPressed} />
          <CalculatorButton text={operatorSymbols.add} className="orange" handleClick={actions.operatorPressed} />
        </div>
        <div className="calculator-button-row">
          <CalculatorButton text="0" className="gray wide" handleClick={actions.numberPressed} />
          <CalculatorButton text="." className="gray" handleClick={actions.decimalPointPressed} />
          <CalculatorButton text="=" className="orange" handleClick={actions.equalsPressed} />
        </div>
      </div>
    </div>
  )
}
