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
import { operators } from './constants'
import { calculatorInitialState, CalculatorState } from './types'

const appendNumber = (currentNumber: string | undefined, pressedNumber: string): string =>
  currentNumber ? `${currentNumber}${pressedNumber}` : pressedNumber

const appendDecimalPoint = (currentNumber: string | undefined): string =>
  currentNumber !== undefined && currentNumber.includes('.') ? currentNumber : `${currentNumber || 0}.`

const toggleSign = (currentNumber: string | undefined): string | undefined =>
  /* prettier-ignore */
  !currentNumber ? currentNumber
    : currentNumber.includes('-') ? currentNumber.substring(1)
      : `-${currentNumber}`

const calculatorFuncs = {
  [operators.add]: (x: number, y: number): number => x + y,
  [operators.subtract]: (x: number, y: number): number => x - y,
  [operators.multiply]: (x: number, y: number): number => x * y,
  [operators.divide]: (x: number, y: number): number => x / y
}

const decideOperandToUpdate = (state: CalculatorState): string => {
  return (state.firstOperand !== undefined && state.secondOperand !== undefined) ||
    (state.firstOperand !== undefined && state.operator && state.secondOperand === undefined)
    ? 'secondOperand'
    : 'firstOperand'
}

const updateOperandReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  const operandToUpdate = decideOperandToUpdate(state)

  switch (action.type) {
    case NUMBER_PRESSED:
      return {
        ...state,
        [operandToUpdate]: appendNumber(state[operandToUpdate], action.payload)
      }
    case DECIMAL_POINT_PRESSED:
      return {
        ...state,
        [operandToUpdate]: appendDecimalPoint(state[operandToUpdate])
      }
    case TOGGLE_SIGN:
      return {
        ...state,
        [operandToUpdate]: toggleSign(state[operandToUpdate])
      }
    case PERCENT_PRESSED:
      return {
        ...state,
        [operandToUpdate]: (parseFloat(state[operandToUpdate]) / 100).toString()
      }
    default:
      return state
  }
}

const updateOperator = (state: CalculatorState, operator: string): CalculatorState => ({
  ...state,
  operator
})

const calculateResult = (state: CalculatorState, operator: string | undefined): CalculatorState => {
  if (state.firstOperand && state.operator) {
    const calculate = calculatorFuncs[state.operator]
    const secondOperand = state.secondOperand === undefined ? state.firstOperand : state.secondOperand
    const newOperand = calculate(parseFloat(state.firstOperand), parseFloat(secondOperand))
    return {
      operator,
      firstOperand: newOperand.toString(),
      secondOperand: undefined
    }
  }
  return state
}

export const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case OPERATOR_PRESSED:
      return state.firstOperand !== undefined && state.secondOperand !== undefined
        ? calculateResult(state, action.payload)
        : updateOperator(state, action.payload)
    case EQUALS_PRESSED:
      return calculateResult(state, undefined)
    case CLEAR_CALCULATOR:
      return calculatorInitialState
    case NUMBER_PRESSED:
    case DECIMAL_POINT_PRESSED:
    case PERCENT_PRESSED:
    case TOGGLE_SIGN:
      return updateOperandReducer(state, action)
    default:
      return state
  }
}
