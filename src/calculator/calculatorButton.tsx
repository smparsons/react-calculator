import * as React from 'react'

export const CalculatorButton = ({ text, onPress, className }: CalculatorButtonProps): JSX.Element => (
  <button className={`calculator-button ${className}`} onClick={() => onPress(text)}>
    {text}
  </button>
)

interface CalculatorButtonProps {
  text: string
  onPress: (text: string) => void
  className: string
}
