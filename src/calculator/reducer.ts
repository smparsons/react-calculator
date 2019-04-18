import { CalculatorAction, CLEAR_CALCULATOR, EQUALS_PRESSED, NUMBER_PRESSED, OPERATOR_PRESSED } from './actions'
import { operators } from './constants'
import { calculatorInitialState, CalculatorState } from './types'

const appendNumber = (currentNumber: number | undefined, pressedNumber: number): number =>
  currentNumber ? parseInt(`${currentNumber.toString()}${pressedNumber.toString()}`, 10) : pressedNumber

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

const handleNumberPressed = (state: CalculatorState, pressedNumber: number): CalculatorState => {
  const operandToUpdate = decideOperandToUpdate(state)
  const newOperand = appendNumber(state[operandToUpdate], pressedNumber)

  return {
    ...state,
    [operandToUpdate]: newOperand,
    display: newOperand
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
    const newOperand = calculate(state.firstOperand, secondOperand)
    return {
      operator,
      firstOperand: newOperand,
      secondOperand: undefined,
      display: newOperand
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
    case CLEAR_CALCULATOR:
      return calculatorInitialState
    default:
      return state
  }
}
