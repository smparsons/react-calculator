export interface CalculatorState {
  firstOperand: string | undefined
  secondOperand: string | undefined
  operator: string | undefined
}

export const calculatorInitialState = {
  firstOperand: undefined,
  secondOperand: undefined,
  operator: undefined
} as CalculatorState
