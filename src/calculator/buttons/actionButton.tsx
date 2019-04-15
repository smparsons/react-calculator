import * as React from 'react'
import { CalculatorAction, clearCalculator, equalsPressed } from '../actions'
import { actions } from '../constants'

const actionSymbols = {
  [actions.equals]: '=',
  [actions.clear]: 'AC'
}

export const ActionButton = ({ actionType, dispatch }: ActionButtonProps) => {
  const baseClass = 'calculator-button'
  const className = actionType === actions.equals ? `${baseClass} operator` : `${baseClass} action`
  const actionCreator = actionType === actions.equals ? equalsPressed : clearCalculator

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
