/* eslint-disable prefer-const */
/* eslint-disable no-tabs */

//  NAN when divide by zero

let y = $('.current-operand')
let x = $('.previous-operand')
let currentOperator = $('.operator-symbol')
let answer

let xValue
let yValue
let currentOperatorValue
let buttonClickValue

const multiply = (x, y) => x * y
const divide = (x, y) => x / y
const add = (x, y) => x + y
const subtract = (x, y) => x - y

const isNumber = value => /\d/.test(value)
const isEquals = value => /[=]/.test(value)
const isAllClear = value => /[ac]/.test(value)
const isOperator = value => /[*]|[/]|[-]|[+]/.test(value)
const isDecimal = value => /[[.]/.test(value)
const isPlusMinus = value => /[+-]/.test(value) && value.length > 1

const swapValues = (x, y = '') => { x.attr('value', y); x.html(y) }

const styleMe = () => {
  xValue = x.attr('value')
  yValue = y.attr('value')
  currentOperatorValue = currentOperator.attr('value')
  if (xValue && currentOperatorValue) {
    y.css('color', 'red')
    y.css('font-weight', '')
    x.css('color', 'green')
  } else if (yValue && !currentOperatorValue && xValue) {
    x.css('color', 'grey')
    y.css('color', 'red')
    y.css('font-weight', '')
  } else if (!yValue && !currentOperatorValue && xValue) {
    x.css('color', 'blue')
    x.css('font-weight', 'bolder')
  } else if (!xValue && !currentOperatorValue && yValue) {
    y.css('color', 'red')
    y.css('font-weight', '')
  } else if (!xValue && !currentOperatorValue && !yValue) {
    y.css('color', 'red')
    y.css('font-weight', '')
  }
}

const calculateAnswer = () => {
  xValue = x.attr('value')
  yValue = y.attr('value')
  currentOperatorValue = currentOperator.attr('value')
  let firstValue = +xValue
  let secondValue = +yValue
  switch (currentOperatorValue) {
    case '*': answer = multiply(firstValue, secondValue, currentOperatorValue)
      break
    case '/': answer = divide(firstValue, secondValue, currentOperatorValue)
      break
    case '-': answer = subtract(firstValue, secondValue, currentOperatorValue)
      break
    case '+': answer = add(firstValue, secondValue, currentOperatorValue)
      break
  }
  let previousEquation = firstValue + ' ' + currentOperatorValue + ' ' + secondValue + ' = ' + answer
  $('.previous-answers').prepend('<div>' + previousEquation + '</div>')
  swapValues(x, answer)
  swapValues(y)
}

const onButtonClick = (event) => {
  yValue = y.attr('value')
  xValue = x.attr('value')
  currentOperatorValue = currentOperator.attr('value')

  let buttonClick = event.target
  buttonClickValue = buttonClick.value

  if (isNumber(buttonClickValue)) {
    // if number is clicked
    handleNumber()
  } else if (isPlusMinus(buttonClickValue)) {
    handlePlusMinus()
  } else if (isAllClear(buttonClickValue)) {
    // if allclear button is clicked
    handleAllClear()
  } else if (isEquals(buttonClickValue)) {
    // handleEquals(buttonClickValue)
    handleEquals()
  } else if (isOperator(buttonClickValue)) {
    // if an operator is clicked
    handleOperator()
  } else if (isDecimal(buttonClickValue)) {
    // if decimal is clicked
    handleDecimal()
  }
  styleMe()
}

const handleNumber = () => {
  let updatedYValue = yValue + buttonClickValue
  swapValues(y, updatedYValue)
}

const handleAllClear = () => {
  if (
    (xValue && yValue) || (xValue && currentOperatorValue)) {
    // if POV OV exist only, or POV and COV only, clear all but POV and return PO to answer styling
    swapValues(currentOperator)
    swapValues(y)
  } else {
    // otherwise, clear all
    swapValues(x)
    swapValues(currentOperator)
    swapValues(y)
  }
}

const handleDecimal = () => {
  if (yValue.indexOf('.') > 0) {
    // if there is already a decimal in COV do nothing
    return
  }
  if (yValue) {
    // if there is COV value append decimal to end
    let updatedYValue = yValue + buttonClickValue
    swapValues(y, updatedYValue)
  } else {
    // if there is no COV set value to 0.
    let updatedYValue = '0' + buttonClickValue
    swapValues(y, updatedYValue)
  }
}

const handlePlusMinus = () => {
  if (!xValue && !currentOperatorValue && !yValue) {
    console.log('nothing to do')
  } else if (xValue && !currentOperatorValue && !yValue) {
    xValue = +xValue * -1
    swapValues(x, xValue)
  } else if (!xValue && yValue) {
    yValue = +yValue * -1
    swapValues(y, yValue)
  } else if (xValue && yValue) {
    yValue = +yValue * -1
    swapValues(y, yValue)
  }
}

const handleOperator = () => {
  // if COV exists but OV and POV do not
  if (yValue && !currentOperatorValue && !xValue) {
    swapValues(x, yValue)
    swapValues(y)
    swapValues(currentOperator, buttonClickValue)
  }
  // if OV is empty
  if (yValue && xValue && !currentOperatorValue) {
    swapValues(x, yValue)
    swapValues(y)
    swapValues(currentOperator, buttonClickValue)
  }
  // if all empty
  if (yValue && xValue && currentOperatorValue) {
    calculateAnswer(xValue, yValue, currentOperatorValue, buttonClickValue)
    swapValues(currentOperator, buttonClickValue)
  // if COV empty
  } else if (xValue && !yValue) {
    // if POV exists but COV does not,
    swapValues(currentOperator, buttonClickValue)
  }
}

const handleEquals = () => {
  if (yValue && xValue && currentOperatorValue) {
    // if COV OV and POV all exist
    calculateAnswer(xValue, yValue, currentOperatorValue, buttonClickValue)
  } else if (yValue && !currentOperatorValue) {
    swapValues(x, yValue)
    swapValues(y)
    return
  } else if (yValue && !xValue) {
    // if only COV has values, set PO to COV and clear CO and return PO oto answer styling
    swapValues(x, yValue)
    swapValues(y)
    swapValues(currentOperator)
  } else if (currentOperatorValue && !yValue && !xValue) {
    // if  OV has a value only, clear it
    swapValues(currentOperator)
  } else if (yValue && xValue && currentOperatorValue) {
    // if COV OV and POV all exist
    calculateAnswer(xValue, yValue, currentOperatorValue, buttonClickValue
    )
  }
  if (xValue && currentOperatorValue && !yValue) {
    // if COV is empty but OV and POV are not, reset OV and restyle POV as answer
    swapValues(currentOperator)
  }
  swapValues(y)
  swapValues(currentOperator)
}

module.exports = { onButtonClick }
