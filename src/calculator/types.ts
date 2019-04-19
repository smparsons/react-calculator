export interface CalculatorState {
  firstOperand: number | undefined
  secondOperand: number | undefined
  operator: string | undefined
}

export const calculatorInitialState = {
  firstOperand: undefined,
  secondOperand: undefined,
  operator: undefined
} as CalculatorState
