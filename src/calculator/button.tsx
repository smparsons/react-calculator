import * as React from 'react'

export const Button = ({ text, onClick, className }: ButtonProps): JSX.Element => (
  <button className={`button ${className}`} onClick={() => onClick(text)}>
    {text}
  </button>
)

interface ButtonProps {
  text: string
  onClick: (buttonText: string) => void
  className: string
}
