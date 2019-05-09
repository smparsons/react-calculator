import * as React from 'react'
import { actionCreators, CalculatorAction } from './actions'
import { CalculatorButton } from './calculatorButton'
import { operatorSymbols } from './constants'
import { calculatorReducer, getDisplayKey } from './reducer'
import { calculatorInitialState } from './types'

interface CalculatorActions {
  numberPressed: (value: string) => void
  operatorPressed: (operator: string) => void
  equalsPressed: () => void
  allClear: () => void
  clear: () => void
  decimalPointPressed: () => void
  toggleSign: () => void
  percentPressed: () => void
}

const mapActions = (dispatch: React.Dispatch<CalculatorAction>): CalculatorActions => ({
  numberPressed: (value: string) => dispatch(actionCreators.numberPressed(value)),
  operatorPressed: (operator: string) => dispatch(actionCreators.operatorPressed(operator)),
  equalsPressed: () => dispatch(actionCreators.equalsPressed()),
  allClear: () => dispatch(actionCreators.allClear()),
  clear: () => dispatch(actionCreators.clear()),
  decimalPointPressed: () => dispatch(actionCreators.decimalPointPressed()),
  toggleSign: () => dispatch(actionCreators.toggleSign()),
  percentPressed: () => dispatch(actionCreators.percentPressed())
})

const emptyDisplay: string = '0'

export const Calculator = (): JSX.Element => {
  const [state, dispatch] = React.useReducer(calculatorReducer, calculatorInitialState)
  const {
    numberPressed,
    operatorPressed,
    equalsPressed,
    allClear,
    clear,
    decimalPointPressed,
    toggleSign,
    percentPressed
  } = mapActions(dispatch)

  const { lastUpdatedKey } = state
  const lastUpdated = lastUpdatedKey ? state[lastUpdatedKey] : null

  const displayKey = getDisplayKey(lastUpdatedKey)
  const display = state[displayKey]

  return (
    <div className="calculator-wrapper">
      <div className="calculator-display">{display || emptyDisplay}</div>
      <div className="calculator-buttons">
        <div className="calculator-button-row">
          <CalculatorButton
            text={lastUpdated ? 'C' : 'AC'}
            className="dark-gray"
            onPress={lastUpdated ? clear : allClear}
          />
          <CalculatorButton text="+/-" className="dark-gray" onPress={toggleSign} />
          <CalculatorButton text="%" className="dark-gray" onPress={percentPressed} />
          <CalculatorButton text={operatorSymbols.divide} className="orange" onPress={operatorPressed} />
        </div>
        <div className="calculator-button-row">
          <CalculatorButton text="7" className="gray" onPress={numberPressed} />
          <CalculatorButton text="8" className="gray" onPress={numberPressed} />
          <CalculatorButton text="9" className="gray" onPress={numberPressed} />
          <CalculatorButton text={operatorSymbols.multiply} className="orange" onPress={operatorPressed} />
        </div>
        <div className="calculator-button-row">
          <CalculatorButton text="4" className="gray" onPress={numberPressed} />
          <CalculatorButton text="5" className="gray" onPress={numberPressed} />
          <CalculatorButton text="6" className="gray" onPress={numberPressed} />
          <CalculatorButton text={operatorSymbols.subtract} className="orange" onPress={operatorPressed} />
        </div>
        <div className="calculator-button-row">
          <CalculatorButton text="1" className="gray" onPress={numberPressed} />
          <CalculatorButton text="2" className="gray" onPress={numberPressed} />
          <CalculatorButton text="3" className="gray" onPress={numberPressed} />
          <CalculatorButton text={operatorSymbols.add} className="orange" onPress={operatorPressed} />
        </div>
        <div className="calculator-button-row">
          <CalculatorButton text="0" className="gray wide" onPress={numberPressed} />
          <CalculatorButton text="." className="gray" onPress={decimalPointPressed} />
          <CalculatorButton text="=" className="orange" onPress={equalsPressed} />
        </div>
      </div>
    </div>
  )
}
