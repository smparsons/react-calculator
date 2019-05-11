export interface CalculatorState {
  total: string | null
  value: string | null
  operator: string | null
  lastUpdatedKey: string | null
}

export const calculatorInitialState = {
  total: null,
  value: null,
  operator: null,
  lastUpdatedKey: null
} as CalculatorState

export interface CalculatorDisplayState {
  display: string | null,
  clearText: string
}
