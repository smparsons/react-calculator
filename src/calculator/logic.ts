import BigNumber from 'bignumber.js'
import { clearedDisplay, operatorSymbols } from './constants'
import { calculatorInitialState, CalculatorState } from './types'

const maxDigitsToEnter = 20

const stateKeys = {
  total: 'total',
  value: 'value',
  operator: 'operator'
}

const calculatorFuncs = {
  [operatorSymbols.add]: (x: number, y: number): BigNumber => new BigNumber(x).plus(y),
  [operatorSymbols.subtract]: (x: number, y: number): BigNumber => new BigNumber(x).minus(y),
  [operatorSymbols.multiply]: (x: number, y: number): BigNumber => new BigNumber(x).times(y),
  [operatorSymbols.divide]: (x: number, y: number): BigNumber => new BigNumber(x).div(y)
}

const calculate = (total: string | null, value: string | null, operator: string): string => {
  const firstOperand = parseFloat(total || '0')
  const secondOperand = parseFloat(value || total || '0')

  const calculationFunc = calculatorFuncs[operator]
  const newTotal = calculationFunc(firstOperand, secondOperand)

  return newTotal.toNumber().toString()
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

const append = (currentNumber: string, characterToAppend: string): string =>
  currentNumber.length < maxDigitsToEnter ? `${currentNumber}${characterToAppend}` : currentNumber

const appendNumber = (state: CalculatorState, pressedNumber: string): CalculatorState => {
  const currentNumber = state.value
  return {
    ...state,
    value: currentNumber && currentNumber !== '0' ? append(currentNumber, pressedNumber) : pressedNumber,
    lastUpdatedKey: stateKeys.value
  }
}

const appendDecimalPoint = (state: CalculatorState): CalculatorState => {
  const currentNumber = state.value
  return {
    ...state,
    value: currentNumber && !currentNumber.includes('.') ? append(currentNumber, '.') : currentNumber,
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
  const result = new BigNumber(parsedValue).div(100)
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
