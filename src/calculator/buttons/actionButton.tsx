import * as React from 'react'
import {
  CalculatorAction,
  clearCalculator,
  decimalPointPressed,
  equalsPressed,
  percentPressed,
  toggleSign
} from '../actions'
import { actions } from '../constants'

const actionDetailsDictionary = {
  [actions.equals]: { symbol: '=', className: 'orange', actionCreator: equalsPressed },
  [actions.clear]: { symbol: 'AC', className: 'dark-gray', actionCreator: clearCalculator },
  [actions.decimalPointPressed]: { symbol: '.', className: 'gray', actionCreator: decimalPointPressed },
  [actions.toggleSign]: { symbol: '+/-', className: 'dark-gray', actionCreator: toggleSign },
  [actions.percentPressed]: { symbol: '%', className: 'dark-gray', actionCreator: percentPressed }
} as ActionDetailsDictionary

export const ActionButton = ({ actionType, dispatch }: ActionButtonProps): JSX.Element => {
  const baseClass = 'calculator-button'
  const { symbol, className, actionCreator } = actionDetailsDictionary[actionType]

  return (
    <button className={`${baseClass} ${className}`} onClick={() => dispatch(actionCreator())}>
      {symbol}
    </button>
  )
}

interface ActionDetails {
  symbol: string
  className: string
  actionCreator: () => CalculatorAction
}

interface ActionDetailsDictionary {
  [actionType: string]: ActionDetails
}

interface ActionButtonProps {
  actionType: string
  dispatch: (action: CalculatorAction) => void
}
