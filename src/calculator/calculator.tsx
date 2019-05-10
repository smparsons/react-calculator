import * as React from 'react'
import { Button } from './button'
import { operatorSymbols } from './constants'
import { calculatorActions, getDisplayKey } from './logic'
import { calculatorInitialState, CalculatorState } from './types'

const mapActions = (currentState: CalculatorState, setState: SetStateFunc): CalculatorActions => ({
  appendNumber: (value: string) => setState(calculatorActions.appendNumber(currentState, value)),
  setOperator: (operator: string) => setState(calculatorActions.setOperator(currentState, operator)),
  calculateTotal: () => setState(calculatorActions.calculateTotal(currentState)),
  allClear: () => calculatorInitialState,
  clear: () => setState(calculatorActions.clear(currentState)),
  appendDecimalPoint: () => setState(calculatorActions.appendDecimalPoint(currentState)),
  toggleSign: () => setState(calculatorActions.toggleSign(currentState)),
  applyPercent: () => setState(calculatorActions.applyPercent(currentState))
})

const getDisplay = (state: CalculatorState): string => {
  const displayKey = getDisplayKey(state.lastUpdatedKey)
  const display = state[displayKey]
  return display || '0'
}

export const Calculator = (): JSX.Element => {
  const [state, setState] = React.useState(calculatorInitialState)
  const {
    appendNumber,
    setOperator,
    calculateTotal,
    allClear,
    clear,
    appendDecimalPoint,
    toggleSign,
    applyPercent
  } = mapActions(state, setState)

  const { lastUpdatedKey } = state
  const lastUpdated = lastUpdatedKey ? state[lastUpdatedKey] : null

  return (
    <div className="calculator">
      <div className="display">{getDisplay(state)}</div>
      <div className="keypad">
        <Button text={lastUpdated ? 'C' : 'AC'} className="dark-gray" onClick={lastUpdated ? clear : allClear} />
        <Button text="+/-" className="dark-gray" onClick={toggleSign} />
        <Button text="%" className="dark-gray" onClick={applyPercent} />
        <Button text={operatorSymbols.divide} className="orange" onClick={setOperator} />
        <Button text="7" className="gray" onClick={appendNumber} />
        <Button text="8" className="gray" onClick={appendNumber} />
        <Button text="9" className="gray" onClick={appendNumber} />
        <Button text={operatorSymbols.multiply} className="orange" onClick={setOperator} />
        <Button text="4" className="gray" onClick={appendNumber} />
        <Button text="5" className="gray" onClick={appendNumber} />
        <Button text="6" className="gray" onClick={appendNumber} />
        <Button text={operatorSymbols.subtract} className="orange" onClick={setOperator} />
        <Button text="1" className="gray" onClick={appendNumber} />
        <Button text="2" className="gray" onClick={appendNumber} />
        <Button text="3" className="gray" onClick={appendNumber} />
        <Button text={operatorSymbols.add} className="orange" onClick={setOperator} />
        <Button text="0" className="gray wide" onClick={appendNumber} />
        <Button text="." className="gray" onClick={appendDecimalPoint} />
        <Button text="=" className="orange" onClick={calculateTotal} />
      </div>
    </div>
  )
}

interface CalculatorActions {
  appendNumber: (value: string) => void
  setOperator: (operator: string) => void
  calculateTotal: () => void
  allClear: () => void
  clear: () => void
  appendDecimalPoint: () => void
  toggleSign: () => void
  applyPercent: () => void
}

type SetStateFunc = React.Dispatch<React.SetStateAction<CalculatorState>>
