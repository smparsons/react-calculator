import Big from 'big.js'
import {
  ALL_CLEAR,
  CalculatorAction,
  CLEAR,
  DECIMAL_POINT_PRESSED,
  EQUALS_PRESSED,
  NUMBER_PRESSED,
  OPERATOR_PRESSED,
  PERCENT_PRESSED,
  TOGGLE_SIGN
} from './actions'
import { operatorSymbols, stateKeys } from './constants'
import { calculatorInitialState, CalculatorState } from './types'

const calculatorFuncs = {
  [operatorSymbols.add]: (x: number, y: number): Big => new Big(x).plus(y),
  [operatorSymbols.subtract]: (x: number, y: number): Big => new Big(x).minus(y),
  [operatorSymbols.multiply]: (x: number, y: number): Big => new Big(x).times(y),
  [operatorSymbols.divide]: (x: number, y: number): Big => new Big(x).div(y)
}

const appendNumber = (currentNumber: string | null, pressedNumber: string): string =>
  currentNumber && currentNumber !== '0' ? `${currentNumber}${pressedNumber}` : pressedNumber

const appendDecimalPoint = (currentNumber: string | null): string =>
  currentNumber !== null && currentNumber.includes('.') ? currentNumber : `${currentNumber || 0}.`

const toggleSign = (currentNumber: string | null): string | null =>
  currentNumber ? (-1 * parseFloat(currentNumber)).toString() : currentNumber

const asPercentage = (currentNumber: string | null): string => {
  const value = parseFloat(currentNumber || '0')
  const result = value === Infinity || value === -Infinity ? value : new Big(value).div(100)
  return result.toString()
}

const calculateResult = (total: string | null, value: string | null, operator: string): string => {
  const calculate = calculatorFuncs[operator]
  const firstOperand = parseFloat(total || '0')
  const secondOperand = parseFloat(value || total || '0')
  const newTotal =
    operator === operatorSymbols.divide && secondOperand === 0
      ? Infinity
      : firstOperand === Infinity || firstOperand === -Infinity
      ? firstOperand
      : calculate(firstOperand, secondOperand)
  return newTotal.toString()
}

export const getDisplayKey = (lastUpdatedKey: string | null): string =>
  lastUpdatedKey ? (lastUpdatedKey === stateKeys.value ? stateKeys.value : stateKeys.total) : stateKeys.value

export const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case OPERATOR_PRESSED:
      return {
        operator: action.payload,
        total:
          state.operator && state.value
            ? calculateResult(state.total, state.value, state.operator)
            : state.value || state.total,
        value: null,
        lastUpdatedKey: stateKeys.operator
      }
    case EQUALS_PRESSED:
      return state.operator
        ? {
            ...calculatorInitialState,
            total: calculateResult(state.total, state.value, state.operator),
            lastUpdatedKey: stateKeys.total
          }
        : state
    case NUMBER_PRESSED:
      return {
        ...state,
        value: appendNumber(state.value, action.payload),
        lastUpdatedKey: stateKeys.value
      }
    case DECIMAL_POINT_PRESSED:
      return {
        ...state,
        value: appendDecimalPoint(state.value),
        lastUpdatedKey: stateKeys.value
      }
    case ALL_CLEAR:
      return calculatorInitialState
    case CLEAR: {
      const stateKey = state.lastUpdatedKey
      return stateKey ? { ...state, [stateKey]: null } : state
    }
    case TOGGLE_SIGN: {
      const stateKey = getDisplayKey(state.lastUpdatedKey)
      return { ...state, [stateKey]: toggleSign(state[stateKey]) }
    }
    case PERCENT_PRESSED: {
      const stateKey = getDisplayKey(state.lastUpdatedKey)
      return { ...state, [stateKey]: asPercentage(state[stateKey]) }
    }
    default:
      return state
  }
}
