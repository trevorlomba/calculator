/* eslint-disable prefer-const */
/* eslint-disable no-tabs */

let y = $('.current-operand')
let x = $('.previous-operand')
let currentOperator = $('.operator-symbol')
let answer

let xValue
let yValue
let currentOperatorValue
let buttonClickValue
let updatedYValue
let previousEquation

const multiply = (x, y) => x * y
const divide = (x, y) => x / y
const add = (x, y) => x + y
const subtract = (x, y) => x - y

const isNumber = (value) => /\d/.test(value)
const isEquals = (value) => /[=]/.test(value)
const isAllClear = (value) => /[ac]/.test(value)
const isOperator = (value) => /[*]|[/]|[-]|[+]/.test(value)
const isDecimal = (value) => /[[.]/.test(value)
const isPlusMinus = (value) => /[+-]/.test(value) && value.length > 1

const swapValues = (first, second = '') => {
  first.attr('value', second)
  first.html(second)
}

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

const calculateAnswer = () => {
  let firstValue = +xValue
  let secondValue = +yValue
  if ((yValue === '0' || xValue === '0') && currentOperatorValue === '/') {
    return
  }
  switch (currentOperatorValue) {
    case '*':
      answer = multiply(firstValue, secondValue, currentOperatorValue)
      break
    case '/':
      answer = divide(firstValue, secondValue, currentOperatorValue)
      break
    case '-':
      answer = subtract(firstValue, secondValue, currentOperatorValue)
      break
    case '+':
      answer = add(firstValue, secondValue, currentOperatorValue)
      break
  }
  previousEquation =
		firstValue + ' ' + currentOperatorValue + ' ' + secondValue + ' = ' + answer
  $('.previous-answers').prepend('<div>' + previousEquation + '</div>')
  swapValues(x, answer)
  swapValues(y)
}

const onButtonClick = (event) => {
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
  if (!yValue) {
    // if (!y)
    updatedYValue = +buttonClickValue
  } else {
    updatedYValue = +(yValue + buttonClickValue)
  }
  swapValues(y, updatedYValue)
}

const handleAllClear = () => {
  if (!yValue && !currentOperatorValue) {
    // if (!y !ov)
    swapValues(x)
  }
  swapValues(currentOperator)
  swapValues(y)
}

const handleDecimal = () => {
  let updatedYValue
  if (!yValue) {
    // if (!y)
    updatedYValue = '0' + buttonClickValue
  } else {
    updatedYValue = yValue + buttonClickValue
  }
  swapValues(y, updatedYValue)
}

const handlePlusMinus = () => {
  if (yValue) {
    // if (y)
    yValue = yValue * -1
    swapValues(y, yValue)
  } else if (xValue) {
    // if (x)
    xValue = +xValue * -1
    swapValues(x, xValue)
  }
}

const handleOperator = () => {
  swapValues(currentOperator, buttonClickValue)
  if (!xValue && !yValue) {
    // if (!x !y)
  } else if (yValue && xValue) {
    // if (y x ov)
    calculateAnswer()
  } else if (yValue) {
    // if (y (!x || !ov))
    swapValues(x, yValue)
    swapValues(y)
  }
}

const handleEquals = () => {
  if (yValue && xValue && currentOperatorValue) {
    // if (x y ov)
    calculateAnswer()
  } else if (yValue) {
    // if (y)
    swapValues(x, yValue)
  }
  swapValues(y)
  swapValues(currentOperator)
}

module.exports = { onButtonClick }
