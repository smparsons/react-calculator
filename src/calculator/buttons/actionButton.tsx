import * as React from 'react'
import { CalculatorAction, clearCalculator, decimalPressed, equalsPressed } from '../actions'
import { actions } from '../constants'

const actionSymbols = {
  [actions.equals]: '=',
  [actions.clear]: 'AC',
  [actions.decimalPressed]: '.'
}

const actionClassNames = {
  [actions.equals]: 'orange',
  [actions.clear]: 'dark-gray',
  [actions.decimalPressed]: 'gray'
}

const actionCreators = {
  [actions.equals]: equalsPressed,
  [actions.clear]: clearCalculator,
  [actions.decimalPressed]: decimalPressed
}

export const ActionButton = ({ actionType, dispatch }: ActionButtonProps): JSX.Element => {
  const baseClass = 'calculator-button'
  const className = `${baseClass} ${actionClassNames[actionType]}`
  const actionCreator = actionCreators[actionType]

  return (
    <button className={className} onClick={() => dispatch(actionCreator())}>
      {actionSymbols[actionType]}
    </button>
  )
}

interface ActionButtonProps {
  actionType: string
  dispatch: (action: CalculatorAction) => void
}
