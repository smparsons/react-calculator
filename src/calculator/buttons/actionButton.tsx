import * as React from 'react'
import {
  CalculatorAction,
  clearCalculator,
  decimalPressed,
  equalsPressed,
  percentagePressed,
  toggleSign
} from '../actions'
import { actions } from '../constants'

const actionDetailsDictionary = {
  [actions.equals]: { symbol: '=', className: 'orange', actionCreator: equalsPressed },
  [actions.clear]: { symbol: 'AC', className: 'dark-gray', actionCreator: clearCalculator },
  [actions.decimalPressed]: { symbol: '.', className: 'gray', actionCreator: decimalPressed },
  [actions.toggleSign]: { symbol: '+/-', className: 'dark-gray', actionCreator: toggleSign },
  [actions.percentagePressed]: { symbol: '%', className: 'dark-gray', actionCreator: percentagePressed }
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
