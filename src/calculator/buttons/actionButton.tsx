import * as React from 'react'
import { CalculatorAction, clearCalculator, decimalPressed, equalsPressed } from '../actions'
import { actions } from '../constants'

const actionSymbols = {
  [actions.equals]: '=',
  [actions.clear]: 'AC',
  [actions.decimalPressed]: '.'
}

// TOOD: Use better class names. This is a little confusing.
const actionClassNames = {
  [actions.equals]: 'operator',
  [actions.clear]: 'action',
  [actions.decimalPressed]: 'number'
}

const actionCreators = {
  [actions.equals]: equalsPressed,
  [actions.clear]: clearCalculator,
  [actions.decimalPressed]: decimalPressed
}

export const ActionButton = ({ actionType, dispatch }: ActionButtonProps) => {
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
