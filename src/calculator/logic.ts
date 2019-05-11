import Big from 'big.js'
import { clearedDisplay, operatorSymbols, stateKeys } from './constants'
import { calculatorInitialState, CalculatorState } from './types'

const calculatorFuncs = {
  [operatorSymbols.add]: (x: number, y: number): Big => new Big(x).plus(y),
  [operatorSymbols.subtract]: (x: number, y: number): Big => new Big(x).minus(y),
  [operatorSymbols.multiply]: (x: number, y: number): Big => new Big(x).times(y),
  [operatorSymbols.divide]: (x: number, y: number): Big => new Big(x).div(y)
}

const calculate = (total: string | null, value: string | null, operator: string): string => {
  const calculationFunc = calculatorFuncs[operator]
  const firstOperand = parseFloat(total || '0')
  const secondOperand = parseFloat(value || total || '0')
  const newTotal = operator === operatorSymbols.divide && secondOperand === 0 ? Infinity
    : firstOperand === Infinity || firstOperand === -Infinity ? firstOperand
      : calculationFunc(firstOperand, secondOperand)
  return newTotal.toString()
}

const setOperator = (state: CalculatorState, operator: string): CalculatorState => ({
  operator,
  total: state.operator && state.value
    ? calculate(state.total, state.value, state.operator)
    : state.value || state.total,
  value: null,
  lastUpdatedKey: stateKeys.operator
})

const calculateTotal = (state: CalculatorState): CalculatorState => {
  return state.operator
    ? {
      ...calculatorInitialState,
      total: calculate(state.total, state.value, state.operator),
      lastUpdatedKey: stateKeys.total
    }
    : state
}

const appendNumber = (state: CalculatorState, pressedNumber: string): CalculatorState => {
  const currentNumber = state.value
  return {
    ...state,
    value: currentNumber && currentNumber !== '0'
      ? `${currentNumber}${pressedNumber}`
      : pressedNumber,
    lastUpdatedKey: stateKeys.value
  }
}

const appendDecimalPoint = (state: CalculatorState): CalculatorState => {
  const currentNumber = state.value
  return {
    ...state,
    value: currentNumber !== null && currentNumber.includes('.')
      ? currentNumber
      : `${currentNumber || 0}.`,
    lastUpdatedKey: stateKeys.value
  }
}

const clearLastEntry = (state: CalculatorState): CalculatorState => {
  const stateKey = state.lastUpdatedKey
  return stateKey ? { ...state, [stateKey]: null } : state
}

const getDisplayKey = (lastUpdatedKey: string | null): string =>
  lastUpdatedKey
    ? (lastUpdatedKey === stateKeys.value ? stateKeys.value : stateKeys.total)
    : stateKeys.value

const toggleSign = (state: CalculatorState): CalculatorState => {
  const stateKey = getDisplayKey(state.lastUpdatedKey)
  const value = state[stateKey]
  const signToggledValue = value ? (-1 * parseFloat(value)).toString() : value
  return { ...state, [stateKey]: signToggledValue }
}

const applyPercent = (state: CalculatorState): CalculatorState => {
  const stateKey = getDisplayKey(state.lastUpdatedKey)
  const parsedValue = parseFloat(state[stateKey] || '0')
  const result = parsedValue === Infinity || parsedValue === -Infinity
    ? parsedValue
    : new Big(parsedValue).div(100)
  return { ...state, [stateKey]: result.toString() }
}

export const canClearLastEntry = (state: CalculatorState): boolean => {
  const { lastUpdatedKey } = state
  const lastUpdatedValue = lastUpdatedKey ? state[lastUpdatedKey] : null
  return !!lastUpdatedValue
}

export const getDisplay = (state: CalculatorState): string => {
  const displayKey = getDisplayKey(state.lastUpdatedKey)
  return state[displayKey] || clearedDisplay
}

export const calculatorActions = {
  setOperator,
  calculateTotal,
  appendNumber,
  appendDecimalPoint,
  clear: (state: CalculatorState): CalculatorState => canClearLastEntry(state)
    ? clearLastEntry(state)
    : calculatorInitialState,
  toggleSign,
  applyPercent
}
