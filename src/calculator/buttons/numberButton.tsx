import * as React from 'react'
import { CalculatorAction, numberPressed } from '../actions'

export const NumberButton = ({ value, dispatch }: NumberButtonProps): JSX.Element => {
  const baseClass = 'calculator-button gray'
  const className = !value ? `${baseClass} zero` : baseClass

  return (
    <button className={className} onClick={() => dispatch(numberPressed(value.toString()))}>
      {value}
    </button>
  )
}

interface NumberButtonProps {
  value: number
  dispatch: (action: CalculatorAction) => void
}
