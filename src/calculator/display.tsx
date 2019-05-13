import * as React from 'react'

export const Display = ({ children }: DisplayProps): JSX.Element => {
  const displayLength = children ? children.length : 0
  const fontSizeClass = displayLength <= 9 ? 'display-lg'
    : displayLength <= 13 ? 'display-md'
      : 'display-sm'

  return (
    <div className={`display ${fontSizeClass}`}>{children}</div>
  )
}

interface DisplayProps {
  children: string | null
}
