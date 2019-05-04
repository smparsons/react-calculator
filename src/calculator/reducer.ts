import Big from 'big.js'
import {
  CalculatorAction,
  CLEAR_CALCULATOR,
  DECIMAL_POINT_PRESSED,
  EQUALS_PRESSED,
  NUMBER_PRESSED,
  OPERATOR_PRESSED,
  PERCENT_PRESSED,
  TOGGLE_SIGN
} from './actions'
import { operatorSymbols } from './constants'
import { calculatorInitialState, CalculatorState } from './types'

const calculatorFuncs = {
  [operatorSymbols.add]: (x: number, y: number): Big => new Big(x).plus(y),
  [operatorSymbols.subtract]: (x: number, y: number): Big => new Big(x).minus(y),
  [operatorSymbols.multiply]: (x: number, y: number): Big => new Big(x).times(y),
  [operatorSymbols.divide]: (x: number, y: number): Big => new Big(x).div(y)
}

const appendNumber = (currentNumber: string | undefined, pressedNumber: string): string =>
  currentNumber ? `${currentNumber}${pressedNumber}` : pressedNumber

const appendDecimalPoint = (currentNumber: string | undefined): string =>
  currentNumber !== undefined && currentNumber.includes('.') ? currentNumber : `${currentNumber || 0}.`

const toggleSign = (currentNumber: string | undefined): string | undefined =>
  currentNumber ? (-1 * parseFloat(currentNumber)).toString() : currentNumber

const asPercentage = (currentNumber: string | undefined): string => {
  const value = parseFloat(currentNumber || '0')
  const result = value === Infinity || value === -Infinity ? value : new Big(value).div(100)
  return result.toString()
}

const calculateResult = (total: string | undefined, value: string | undefined, operator: string): string => {
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

export const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case OPERATOR_PRESSED:
      return state.operator && state.value
        ? {
            operator: action.payload,
            total: calculateResult(state.total, state.value, state.operator),
            value: undefined
          }
        : {
            operator: action.payload,
            total: state.value || state.total,
            value: undefined
          }
    case EQUALS_PRESSED:
      return state.operator
        ? {
            ...calculatorInitialState,
            total: calculateResult(state.total, state.value, state.operator)
          }
        : state
    case CLEAR_CALCULATOR:
      return calculatorInitialState
    case NUMBER_PRESSED:
      return {
        ...state,
        value: appendNumber(state.value, action.payload)
      }
    case DECIMAL_POINT_PRESSED:
      return {
        ...state,
        value: appendDecimalPoint(state.value)
      }
    case TOGGLE_SIGN:
      return state.value
        ? {
            ...state,
            value: toggleSign(state.value)
          }
        : {
            ...state,
            total: toggleSign(state.total)
          }
    case PERCENT_PRESSED:
      return state.value
        ? {
            ...state,
            value: asPercentage(state.value)
          }
        : {
            ...state,
            total: asPercentage(state.total)
          }
    default:
      return state
  }
}