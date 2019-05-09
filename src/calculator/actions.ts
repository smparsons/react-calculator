export const NUMBER_PRESSED = 'NUMBER_PRESSED'
export const OPERATOR_PRESSED = 'OPERATOR_PRESSED'
export const EQUALS_PRESSED = 'EQUALS_PRESSED'
export const ALL_CLEAR = 'ALL_CLEAR'
export const CLEAR = 'CLEAR'
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

interface AllClearAction {
  type: typeof ALL_CLEAR
}

interface ClearAction {
  type: typeof CLEAR
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

const allClear = (): AllClearAction => ({
  type: ALL_CLEAR
})

const clear = (): ClearAction => ({
  type: CLEAR
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
  allClear,
  clear,
  decimalPointPressed,
  toggleSign,
  percentPressed
}

export type CalculatorAction =
  | NumberPressedAction
  | OperatorPressedAction
  | EqualsPressedAction
  | AllClearAction
  | ClearAction
  | DecimalPointPressedAction
  | ToggleSignAction
  | PercentPressedAction
