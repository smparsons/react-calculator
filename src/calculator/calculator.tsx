import * as React from 'react'
import { ActionButton, NumberButton, OperatorButton } from './buttons'
import { actions, operators } from './constants'
import { calculatorReducer } from './reducer'
import { calculatorInitialState } from './types'

export const Calculator = (): JSX.Element => {
  const [state, dispatch] = React.useReducer(calculatorReducer, calculatorInitialState)

  return (
    <div className="calculator-wrapper">
      <div className="calculator-display">{state.secondOperand || state.firstOperand || 0}</div>
      <div className="calculator-buttons">
        <div className="calculator-button-row">
          <ActionButton actionType={actions.clear} dispatch={dispatch} />
          <button className="calculator-button dark-gray">+/-</button>
          <button className="calculator-button dark-gray">%</button>
          <OperatorButton operator={operators.divide} dispatch={dispatch} />
        </div>
        <div className="calculator-button-row">
          <NumberButton value={7} dispatch={dispatch} />
          <NumberButton value={8} dispatch={dispatch} />
          <NumberButton value={9} dispatch={dispatch} />
          <OperatorButton operator={operators.multiply} dispatch={dispatch} />
        </div>
        <div className="calculator-button-row">
          <NumberButton value={4} dispatch={dispatch} />
          <NumberButton value={5} dispatch={dispatch} />
          <NumberButton value={6} dispatch={dispatch} />
          <OperatorButton operator={operators.subtract} dispatch={dispatch} />
        </div>
        <div className="calculator-button-row">
          <NumberButton value={1} dispatch={dispatch} />
          <NumberButton value={2} dispatch={dispatch} />
          <NumberButton value={3} dispatch={dispatch} />
          <OperatorButton operator={operators.add} dispatch={dispatch} />
        </div>
        <div className="calculator-button-row">
          <NumberButton value={0} dispatch={dispatch} />
          <ActionButton actionType={actions.decimalPressed} dispatch={dispatch} />
          <ActionButton actionType={actions.equals} dispatch={dispatch} />
        </div>
      </div>
    </div>
  )
}
