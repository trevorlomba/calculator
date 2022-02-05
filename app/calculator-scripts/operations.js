let yValue, xValue, currentOperatorValue, answer, previousEquation, x, y

const swapValues = (first, second = '') => {
  first.attr('value', second)
  first.html(second)
}

const multiply = (x, y) => x * y
const divide = (x, y) => x / y
const add = (x, y) => x + y
const subtract = (x, y) => x - y

const calculateAnswer = () => {
  const firstValue = +xValue
  const secondValue = +yValue
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
  previousEquation = firstValue + ' ' + currentOperatorValue + ' ' + secondValue + ' = ' + answer
  $('.previous-answers').prepend('<div>' + previousEquation + '</div>')
  swapValues(x, answer)
  swapValues(y)
}

module.exports = {
  multiply,
  subtract,
  divide,
  add,
  calculateAnswer,
  swapValues
}
