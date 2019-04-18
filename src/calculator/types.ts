export interface CalculatorState {
  firstOperand: number | undefined
  secondOperand: number | undefined
  display: number
  operator: string | undefined
}

export const calculatorInitialState = {
  firstOperand: undefined,
  secondOperand: undefined,
  display: 0,
  operator: undefined
} as CalculatorState
