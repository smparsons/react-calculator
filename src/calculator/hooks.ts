import * as React from 'react'
import { clearedDisplay } from './constants'
import { calculatorActions, canClearLastEntry, getDisplay } from './logic'
import { CalculatorDisplayState, calculatorInitialState, CalculatorState } from './types'

const flashDuration = 75
const clearText = { allClear: 'AC', clear: 'C' }

export const useCalculator = (): CalculatorHookResult => {
  const [internalState, setInternalState] = React.useState(calculatorInitialState)
  const [display, setDisplay] = React.useState(clearedDisplay as string | null)

  const update = (newInternalState: CalculatorState): void => {
    const newDisplay = getDisplay(newInternalState)
    setInternalState(newInternalState)
    setDisplay(newDisplay)
  }

  const updateWithDisplayFlash = (newInternalState: CalculatorState): void => {
    const newDisplay = getDisplay(newInternalState)
    setInternalState(newInternalState)
    setDisplay(null)
    setTimeout(() => { setDisplay(newDisplay) }, flashDuration)
  }

  const newDisplayState = {
    display,
    clearText: canClearLastEntry(internalState) ? clearText.clear : clearText.allClear
  }

  const actions = {
    appendNumber: (value: string) => update(calculatorActions.appendNumber(internalState, value)),
    setOperator: (operator: string) => updateWithDisplayFlash(calculatorActions.setOperator(internalState, operator)),
    calculateTotal: () => updateWithDisplayFlash(calculatorActions.calculateTotal(internalState)),
    clear: () => updateWithDisplayFlash(calculatorActions.clear(internalState)),
    appendDecimalPoint: () => update(calculatorActions.appendDecimalPoint(internalState)),
    toggleSign: () => updateWithDisplayFlash(calculatorActions.toggleSign(internalState)),
    applyPercent: () => updateWithDisplayFlash(calculatorActions.applyPercent(internalState))
  }

  return [newDisplayState, actions]
}

interface CalculatorActions {
  appendNumber: (value: string) => void
  setOperator: (operator: string) => void
  calculateTotal: () => void
  clear: () => void
  appendDecimalPoint: () => void
  toggleSign: () => void
  applyPercent: () => void
}

type CalculatorHookResult = [CalculatorDisplayState, CalculatorActions]
