export const NUMBER_PRESSED = 'NUMBER_PRESSED'
export const OPERATOR_PRESSED = 'OPERATOR_PRESSED'
export const EQUALS_PRESSED = 'EQUALS_PRESSED'
export const CLEAR_CALCULATOR = 'CLEAR_CALCULATOR'

interface NumberPressedAction {
  type: typeof NUMBER_PRESSED
  payload: number
}

interface OperatorPressedAction {
  type: typeof OPERATOR_PRESSED
  payload: string
}

interface EqualsPressedAction {
  type: typeof EQUALS_PRESSED
}

interface ClearCalculatorAction {
  type: typeof CLEAR_CALCULATOR
}

export const numberPressed = (value: number): NumberPressedAction => ({
  type: NUMBER_PRESSED,
  payload: value
})

export const operatorPressed = (operator: string): OperatorPressedAction => ({
  type: OPERATOR_PRESSED,
  payload: operator
})

export const equalsPressed = (): EqualsPressedAction => ({
  type: EQUALS_PRESSED
})

export const clearCalculator = (): ClearCalculatorAction => ({
  type: CLEAR_CALCULATOR
})

export type CalculatorAction = NumberPressedAction | OperatorPressedAction | EqualsPressedAction | ClearCalculatorAction
