import * as React from 'react'
import { Button } from './button'
import { operatorSymbols } from './constants'
import { Display } from './display'
import { useCalculator } from './hooks'

export const Calculator = (): JSX.Element => {
  const [displayState, actions] = useCalculator()
  const { display, clearText } = displayState
  const {
    appendNumber,
    setOperator,
    calculateTotal,
    clear,
    appendDecimalPoint,
    toggleSign,
    applyPercent
  } = actions

  return (
    <div className="calculator">
      <Display>{display}</Display>
      <div className="keypad">
        <Button text={clearText} className="dark-gray" onClick={clear} />
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
