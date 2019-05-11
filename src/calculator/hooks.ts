import * as React from 'react'
import { clearedDisplay, clearText, flashDuration } from './constants'
import { calculatorActions, canClearLastEntry, getDisplay } from './logic'
import { CalculatorDisplayState, calculatorInitialState, CalculatorState } from './types'

const mapActions = (currentState: CalculatorState, updateCalculator: UpdateCalculatorFunc): CalculatorActions => ({
  appendNumber: (value: string) => updateCalculator(calculatorActions.appendNumber(currentState, value), false),
  setOperator: (operator: string) => updateCalculator(calculatorActions.setOperator(currentState, operator), true),
  calculateTotal: () => updateCalculator(calculatorActions.calculateTotal(currentState), true),
  clear: () => updateCalculator(calculatorActions.clear(currentState), true),
  appendDecimalPoint: () => updateCalculator(calculatorActions.appendDecimalPoint(currentState), false),
  toggleSign: () => updateCalculator(calculatorActions.toggleSign(currentState), true),
  applyPercent: () => updateCalculator(calculatorActions.applyPercent(currentState), true)
})

export const useCalculator = (): CalculatorHookResult => {
  const [internalState, setInternalState] = React.useState(calculatorInitialState)
  const [display, setDisplay] = React.useState(clearedDisplay as string | null)

  const updateCalculator = (newInternalState: CalculatorState, flashDisplay: boolean): void => {
    const newDisplay = getDisplay(newInternalState)

    if (flashDisplay) {
      setInternalState(newInternalState)
      setDisplay(null)
      setTimeout(() => { setDisplay(newDisplay) }, flashDuration)
    } else {
      setInternalState(newInternalState)
      setDisplay(newDisplay)
    }
  }

  const actions = mapActions(internalState, updateCalculator)

  const newDisplayState = {
    display,
    clearText: canClearLastEntry(internalState) ? clearText.clear : clearText.allClear
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

type UpdateCalculatorFunc = (setState: React.SetStateAction<CalculatorState>, flashDisplay: boolean) => void
type CalculatorHookResult = [CalculatorDisplayState, CalculatorActions]
