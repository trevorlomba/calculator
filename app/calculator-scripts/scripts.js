/* eslint-disable prefer-const */
/* eslint-disable no-tabs */

let currentOperand = $('.current-operand')
let previousOperand = $('.previous-operand')
let currentOperator = $('.operator-symbol')

function clearValues (input) {
  input.attr('value', '')
  input.html('')
}

function updateValues (first, second) {
  first.attr('value', second)
  first.html(second)
}

function setValuesToZero (input) {
  input.attr('value', 0)
  input.html('0')
}
function styleAnswer (input) {
  input.css('color', 'blue')
  input.css('font-weight', 'bolder')
}
function styleProblem (first, second) {
  first.css('color', 'red')
  first.css('font-weight', '')
  second.css('color', 'green')
}
function onButtonClick (event) {
  let currentOperandValue = currentOperand.attr('value')
  let previousOperandValue = previousOperand.attr('value')
  let operatorValue = currentOperator.attr('value')

  styleProblem(currentOperand, previousOperand)

  let buttonClick = event.target
  let buttonClickValue = buttonClick.value
  let buttonClickClass = buttonClick.className

  if (isNumber(buttonClickValue)) {
    // if number is clicked
    whenNumber(buttonClickValue)
  }

  if (buttonClickClass === 'all-clear') {
    // if allclear button is clicked...
    allClear(previousOperandValue, currentOperandValue, operatorValue, buttonClickValue)
  }

  if (buttonClickClass === 'equals-operator') {
    // whenEquals(buttonClickValue)
    whenEquals(previousOperandValue, currentOperandValue, operatorValue, buttonClickValue)
  }
  if (buttonClickClass === 'operator') {
    // if an operator is clicked
    whenOperator(buttonClickValue, currentOperandValue, previousOperandValue, operatorValue)
  }
}
function allClear (
  previousOperandValue,
  currentOperandValue,
  operatorValue
  // currentOperator
) {
  if (
    (!isEmpty(previousOperandValue) && !isEmpty(currentOperandValue)) || (!isEmpty(previousOperandValue) && !isEmpty(operatorValue))) {
    // if POV OV exist only, or POV and COV only, clear all but POV and return PO to answer styling
    styleAnswer(previousOperand)
    clearValues(currentOperator)
    clearValues(currentOperand)
  } else {
    // otherwise, clear all
    clearValues(previousOperand)
    clearValues(currentOperator)
    clearValues(currentOperand)
  }
}
function isNumber (input) {
  if (
    input === '1' ||
		input === '2' ||
		input === '3' ||
		input === '4' ||
		input === '5' ||
		input === '6' ||
		input === '7' ||
		input === '8' ||
		input === '9' ||
		input === '0' ||
		input === '.'
  ) { return true }
}
function isEmpty (input) {
  if (input === '') { return true }
}
function whenNumber (buttonClickValue) {
  let currentOperandValue = currentOperand.attr('value')
  let previousOperandValue = previousOperand.attr('value')
  let buttonClick = event.target
  let buttonClickClass = buttonClick.className
  let operatorValue = currentOperator.attr('value')

  if (!isEmpty(previousOperandValue) && isEmpty(operatorValue)) {
    // if POV is not empty and OV is empty, set POV to grey
    previousOperand.css('color', 'grey')
  }
  if (buttonClickClass === 'decimal') {
    // if decimal button is clicked...
    if (currentOperandValue.indexOf('.') > 0) {
      // if there is already a decimal in COV do nothing
      return
    }
    if (!isEmpty(currentOperandValue)) {
      // if there is COV value append decimal to end
      let updatedCurrentOperandValue = currentOperandValue + buttonClickValue
      updateValues(currentOperand, updatedCurrentOperandValue)
    } else {
      // if there is no COV set value to 0.
      let updatedCurrentOperandValue = '0' + buttonClickValue
      updateValues(currentOperand, updatedCurrentOperandValue)
    }
  } else {
    // otherwise, append button value to end of COV
    let updatedCurrentOperandValue = currentOperandValue + buttonClickValue
    updateValues(currentOperand, updatedCurrentOperandValue)
  }
}
function whenOperator (buttonClickValue, currentOperandValue, previousOperandValue, operatorValue) {
  let operator = buttonClickValue

  // if operator +-
  if (operator === '+-') {
    if (!isEmpty(previousOperandValue) && isEmpty(operatorValue) && isEmpty(currentOperandValue)) {
      console.log(previousOperandValue)
      console.log(operatorValue)
      console.log(currentOperandValue)
      if (previousOperandValue.indexOf('-') >= 0) {
        let oppositeOperandValue = previousOperandValue.replace('-', '')
        updateValues(previousOperand, oppositeOperandValue)
      } else {
        let oppositeOperandValue = previousOperandValue.replace('', '-')
        updateValues(previousOperand, oppositeOperandValue)
      }
      return
    } else if (currentOperandValue.indexOf('-') >= 0) {
      // if '-' exists in COV, make it positive
      let oppositeOperandValue = currentOperandValue.replace('-', '')
      updateValues(currentOperand, oppositeOperandValue)
    } else {
      // else make COV negative
      let oppositeOperandValue = '-' + currentOperand.attr('value')
      updateValues(currentOperand, oppositeOperandValue)
    }
  }
  // if COV is empty
  if (!isEmpty(currentOperandValue) && isEmpty(operatorValue) && isEmpty(previousOperandValue)) {
    // if COV exists but OV and POV does not, set POV and clear COV
    if (currentOperandValue === '-') {
      // if COV is '-', convert to 0
      setValuesToZero(previousOperand)
    } else {
      // else, set COV as POV
      updateValues(previousOperand, currentOperandValue)
    }
    clearValues(currentOperand)
    updateValues(currentOperator, operator)
  }
  // if OV is empty
  if (!isEmpty(currentOperandValue) && !isEmpty(previousOperandValue) && isEmpty(operatorValue)) {
    updateValues(previousOperand, currentOperandValue)
    styleAnswer(previousOperand)
    clearValues(currentOperand)
    updateValues(currentOperator, operator)
  }
  // if all empty
  if (!isEmpty(currentOperandValue) && !isEmpty(previousOperandValue) && !isEmpty(operatorValue)) {
  // if COV POV and OV are not empty...
    if (currentOperandValue === '-') {
    // if COV is '-', do nothing
      return
    }
    calculateAnswer(previousOperandValue, currentOperandValue, operatorValue, buttonClickValue)
  // if COV empty
  } else if (isEmpty(currentOperandValue) && !isEmpty(previousOperandValue)) {
    // if POV exists but COV does not,
    updateValues(currentOperator, operator)
  }
  // if there is not a current operand value but there is a previous operand value and a button is clicked
}
function whenEquals (previousOperandValue, currentOperandValue, operatorValue, buttonClickValue) {
  styleAnswer(previousOperand)
  // if equals button is clicked
  if (currentOperandValue === '-') {
    // if COV is '-', do nothing
    return
  }
  if (!isEmpty(currentOperandValue) && !isEmpty(previousOperandValue) && !isEmpty(operatorValue)) {
    // if COV OV and POV all exist
    calculateAnswer(previousOperandValue, currentOperandValue, operatorValue, buttonClickValue)
  } else if (!isEmpty(currentOperandValue) && isEmpty(operatorValue)) {
    updateValues(previousOperand, currentOperandValue)
    styleAnswer(previousOperand)
    clearValues(currentOperand)
    return
  } else if (!isEmpty(currentOperandValue) && isEmpty(previousOperandValue)) {
    // if only COV has values, set PO to COV and clear CO and return PO oto answer styling
    updateValues(previousOperand, currentOperandValue)
    styleAnswer(previousOperand)
    clearValues(currentOperand)
    clearValues(currentOperator)
  } else if (isEmpty(currentOperandValue) && isEmpty(previousOperandValue) && !isEmpty(operatorValue)
  ) {
    // if  OV has a value only, clear it
    clearValues(currentOperator)
  } else if (!isEmpty(currentOperandValue) && !isEmpty(previousOperandValue) && !isEmpty(operatorValue)
  ) {
    // if COV OV and POV all exist
    calculateAnswer(previousOperandValue, currentOperandValue, operatorValue, buttonClickValue
    )
  }
  if (isEmpty(currentOperandValue) && !isEmpty(previousOperandValue) && !isEmpty(operatorValue)) {
    // if COV is empty but OV and POV are not, reset OV and restyle POV as answer
    clearValues(currentOperator)
    styleAnswer(previousOperand)
  }
  clearValues(currentOperand)
  clearValues(currentOperator)
}
function calculateAnswer (previousOperandValue, currentOperandValue, operatorValue, buttonClickValue) {
  let firstValue = parseFloat(previousOperandValue, 10)
  let secondValue = parseFloat(currentOperandValue, 10)
  if (operatorValue === '*' || operatorValue === '/' || operatorValue === '-' || operatorValue === '+') {
    if (operatorValue === '*') {
      let answer = firstValue * secondValue
      updateAnswer(answer, firstValue, operatorValue, secondValue)
    } else if (operatorValue === '/') {
      let answer = firstValue / secondValue
      updateAnswer(answer, firstValue, operatorValue, secondValue)
    } else if (operatorValue === '-') {
      let answer = firstValue - secondValue
      updateAnswer(answer, firstValue, operatorValue, secondValue)
    } else if (operatorValue === '+') {
      let answer = firstValue + secondValue
      updateAnswer(answer, firstValue, operatorValue, secondValue)
    }
  }
  if (buttonClickValue !== '=') {
    updateValues(currentOperator, buttonClickValue)
  } else {
    clearValues(currentOperator)
  }
}
function updateAnswer (answer, firstValue, operatorValue, secondValue) {
  updatePreviousAnswers(firstValue, operatorValue, secondValue, answer)
  updateValues(previousOperand, answer)
  styleAnswer(previousOperand)
  clearValues(currentOperand)
}
function updatePreviousAnswers (firstValue, operatorValue, secondValue, answer) {
  let previousEquation = firstValue + ' ' + operatorValue + ' ' + secondValue + ' = ' + answer
  $('.previous-answers').prepend('<div>' + previousEquation + '</div>')
}

module.exports = { onButtonClick }
