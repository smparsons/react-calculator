export interface CalculatorState {
  total: string | undefined
  value: string | undefined
  operator: string | undefined
}

export const calculatorInitialState = {
  total: undefined,
  value: undefined,
  operator: undefined
} as CalculatorState
