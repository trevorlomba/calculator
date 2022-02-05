/* eslint-disable prefer-const */
/* eslint-disable no-tabs */
const handles = require('./event-handlers/handlers')

let y = $('.current-operand')
let x = $('.previous-operand')
let currentOperator = $('.operator-symbol')

let xValue
let yValue
let currentOperatorValue
let buttonClickValue

const isNumber = (value) => /\d/.test(value)
const isEquals = (value) => /[=]/.test(value)
const isAllClear = (value) => /[ac]/.test(value)
const isOperator = (value) => /[*]|[/]|[-]|[+]/.test(value)
const isDecimal = (value) => /[[.]/.test(value)
const isPlusMinus = (value) => /[+-]/.test(value) && value.length > 1

const styleMe = () => {
  xValue = x.attr('value')
  yValue = y.attr('value')
  currentOperatorValue = currentOperator.attr('value')
  if (yValue && !currentOperatorValue && xValue) {
    x.css('color', 'grey')
  } else if (!yValue && !currentOperatorValue && xValue) {
    x.css('color', 'blue')
  } else {
    x.css('color', 'green')
  }
}

const onButtonClick = (event) => {
  let buttonClick = event.target
  buttonClickValue = buttonClick.value

  if (isNumber(buttonClickValue)) {
    // if number is clicked
    handles.handleNumber()
  } else if (isPlusMinus(buttonClickValue)) {
    handles.handlePlusMinus()
  } else if (isAllClear(buttonClickValue)) {
    // if allclear button is clicked
    handles.handleAllClear()
  } else if (isEquals(buttonClickValue)) {
    // handleEquals(buttonClickValue)
    handles.handleEquals()
  } else if (isOperator(buttonClickValue)) {
    // if an operator is clicked
    handles.handleOperator()
  } else if (isDecimal(buttonClickValue)) {
    // if decimal is clicked
    handles.handleDecimal()
  }
  styleMe()
}

module.exports = { onButtonClick }
