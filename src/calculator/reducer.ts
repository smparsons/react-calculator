import {
  CalculatorAction,
  CLEAR_CALCULATOR,
  DECIMAL_PRESSED,
  EQUALS_PRESSED,
  NUMBER_PRESSED,
  OPERATOR_PRESSED
} from './actions'
import { operators } from './constants'
import { calculatorInitialState, CalculatorState } from './types'

const appendNumber = (currentNumber: string | undefined, pressedNumber: string): string =>
  currentNumber ? `${currentNumber}${pressedNumber}` : pressedNumber

const appendDecimal = (currentNumber: string | undefined): string =>
  currentNumber !== undefined && currentNumber.includes('.') ? currentNumber : `${currentNumber || 0}.`

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

const handleNumberPressed = (state: CalculatorState, pressedNumber: string): CalculatorState => {
  const operandToUpdate = decideOperandToUpdate(state)
  return {
    ...state,
    [operandToUpdate]: appendNumber(state[operandToUpdate], pressedNumber)
  }
}

const handleDecimalPressed = (state: CalculatorState): CalculatorState => {
  const operandToUpdate = decideOperandToUpdate(state)
  return {
    ...state,
    [operandToUpdate]: appendDecimal(state[operandToUpdate])
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

const handleOperatorPressed = (state: CalculatorState, operator: string): CalculatorState => {
  return state.firstOperand !== undefined && state.secondOperand !== undefined
    ? calculateResult(state, operator)
    : updateOperator(state, operator)
}

export const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case NUMBER_PRESSED:
      return handleNumberPressed(state, action.payload)
    case OPERATOR_PRESSED:
      return handleOperatorPressed(state, action.payload)
    case EQUALS_PRESSED:
      return calculateResult(state, undefined)
    case DECIMAL_PRESSED:
      return handleDecimalPressed(state)
    case CLEAR_CALCULATOR:
      return calculatorInitialState
    default:
      return state
  }
}
