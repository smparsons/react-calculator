import * as React from 'react'
import { CalculatorAction, operatorPressed } from '../actions'
import { operators } from '../constants'

const operatorSymbols = {
  [operators.add]: '+',
  [operators.subtract]: '-',
  [operators.multiply]: 'x',
  [operators.divide]: '/'
}

export const OperatorButton = ({ operator, dispatch }: OperatorButtonProps): JSX.Element => (
  <button className="calculator-button operator" onClick={() => dispatch(operatorPressed(operator))}>
    {operatorSymbols[operator]}
  </button>
)

interface OperatorButtonProps {
  operator: string
  dispatch: (action: CalculatorAction) => void
}
