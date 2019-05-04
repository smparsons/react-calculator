import * as React from 'react'

export const CalculatorButton = ({ text, handleClick, className }: CalculatorButtonProps): JSX.Element => (
  <button className={`calculator-button ${className}`} onClick={() => handleClick(text)}>
    {text}
  </button>
)

interface CalculatorButtonProps {
  text: string
  handleClick: (text: string) => void
  className: string
}
