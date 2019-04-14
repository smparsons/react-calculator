import { inputSteps } from './constants'

export interface CalculatorState {
  firstOperand: number | undefined
  secondOperand: number | undefined
  display: number
  operator: string | undefined
  currentInputStep: string
}

export const calculatorInitialState = {
  firstOperand: undefined,
  secondOperand: undefined,
  display: 0,
  operator: undefined,
  currentInputStep: inputSteps.waitingForFirstOperand
} as CalculatorState
