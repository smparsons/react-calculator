import * as React from 'react'

export const Calculator = () => (
  <div className="calculator-wrapper">
    <div className="calculator-display">0</div>
    <div className="calculator-button-row">
      <button className="calculator-button helper">AC</button>
      <button className="calculator-button helper">+/-</button>
      <button className="calculator-button helper">%</button>
      <button className="calculator-button operator">/</button>
    </div>
    <div className="calculator-button-row">
      <button className="calculator-button number">7</button>
      <button className="calculator-button number">8</button>
      <button className="calculator-button number">9</button>
      <button className="calculator-button operator">x</button>
    </div>
    <div className="calculator-button-row">
      <button className="calculator-button number">4</button>
      <button className="calculator-button number">5</button>
      <button className="calculator-button number">6</button>
      <button className="calculator-button operator">-</button>
    </div>
    <div className="calculator-button-row">
      <button className="calculator-button number">1</button>
      <button className="calculator-button number">2</button>
      <button className="calculator-button number">3</button>
      <button className="calculator-button operator">+</button>
    </div>
    <div className="calculator-button-bottom-row">
      <button className="calculator-button number">0</button>
      <button className="calculator-button number">.</button>
      <button className="calculator-button operator">=</button>
    </div>
  </div>
)
