export const NUMBER_PRESSED = 'NUMBER_PRESSED'
export const OPERATOR_PRESSED = 'OPERATOR_PRESSED'
export const EQUALS_PRESSED = 'EQUALS_PRESSED'
export const CLEAR_CALCULATOR = 'CLEAR_CALCULATOR'
export const DECIMAL_POINT_PRESSED = 'DECIMAL_POINT_PRESSED'
export const TOGGLE_SIGN = 'TOGGLE_SIGN'
export const PERCENT_PRESSED = 'PERCENT_PRESSED'

interface NumberPressedAction {
  type: typeof NUMBER_PRESSED
  payload: string
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

interface DecimalPointPressedAction {
  type: typeof DECIMAL_POINT_PRESSED
}

interface ToggleSignAction {
  type: typeof TOGGLE_SIGN
}

interface PercentPressedAction {
  type: typeof PERCENT_PRESSED
}

const numberPressed = (value: string): NumberPressedAction => ({
  type: NUMBER_PRESSED,
  payload: value
})

const operatorPressed = (operator: string): OperatorPressedAction => ({
  type: OPERATOR_PRESSED,
  payload: operator
})

const equalsPressed = (): EqualsPressedAction => ({
  type: EQUALS_PRESSED
})

const clearCalculator = (): ClearCalculatorAction => ({
  type: CLEAR_CALCULATOR
})

const decimalPointPressed = (): DecimalPointPressedAction => ({
  type: DECIMAL_POINT_PRESSED
})

const toggleSign = (): ToggleSignAction => ({
  type: TOGGLE_SIGN
})

const percentPressed = (): PercentPressedAction => ({
  type: PERCENT_PRESSED
})

export const actionCreators = {
  numberPressed,
  operatorPressed,
  equalsPressed,
  clearCalculator,
  decimalPointPressed,
  toggleSign,
  percentPressed
}

export type CalculatorAction =
  | NumberPressedAction
  | OperatorPressedAction
  | EqualsPressedAction
  | ClearCalculatorAction
  | DecimalPointPressedAction
  | ToggleSignAction
  | PercentPressedAction