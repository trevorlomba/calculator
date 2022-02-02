/* eslint-disable prefer-const */
/* eslint-disable no-tabs */

let currentOperand = $('.current-operand')
let previousOperand = $('.previous-operand')
let currentOperator = $('.operator-symbol')

let isNumber = (value) => { return /\d/.test(value) }
let isEquals = (value) => { return /[=]/.test(value) }
let isAllClear = (value) => { return /[ac]/.test(value) }
let isOperator = (value) => { return /[*]|[/]|[-]|[+]/.test(value) }
let isDecimal = (value) => { return /[[.]/.test(value) }

let clearValues = (elem) => { elem.attr('value', ''); elem.html('') }
let updateValues = (first, second) => { first.attr('value', second); first.html(second) }
let setValuesToZero = (elem) => { elem.attr('value', 0); elem.html('0') }

let styleAnswer = (elem) => { elem.css('color', 'blue'); elem.css('font-weight', 'bolder') }
let styleProblem = (first, second) => { first.css('color', 'red'); first.css('font-weight', ''); second.css('color', 'green') }
let styleGrey = (elem) => { elem.css('color', 'grey') }

function calculateAnswer (previousOperandValue, currentOperandValue, operatorValue) {
  let firstValue = +previousOperandValue
  let secondValue = +currentOperandValue
  switch (operatorValue) {
    case '*': updateAnswer((firstValue * secondValue), firstValue, operatorValue, secondValue)
      break
    case '/': updateAnswer((firstValue / secondValue), firstValue, operatorValue, secondValue)
      break
    case '-': updateAnswer((firstValue - secondValue), firstValue, operatorValue, secondValue)
      break
    case '+': updateAnswer((firstValue + secondValue), firstValue, operatorValue, secondValue)
      break
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

function onButtonClick (event) {
  let currentOperandValue = currentOperand.attr('value')
  let previousOperandValue = previousOperand.attr('value')
  let operatorValue = currentOperator.attr('value')

  styleProblem(currentOperand, previousOperand)

  let buttonClick = event.target
  let buttonClickValue = buttonClick.value

  if (isNumber(buttonClickValue)) {
    // if number is clicked
    handleNumber(buttonClickValue, currentOperandValue, previousOperandValue, operatorValue)
  }
  if (isAllClear(buttonClickValue)) {
    // if allclear button is clicked
    handleAllClear(previousOperandValue, currentOperandValue, operatorValue, buttonClickValue)
  }
  if (isEquals(buttonClickValue)) {
    // handleEquals(buttonClickValue)
    handleEquals(previousOperandValue, currentOperandValue, operatorValue, buttonClickValue)
  }
  if (isOperator(buttonClickValue)) {
    // if an operator is clicked
    handleOperator(buttonClickValue, currentOperandValue, previousOperandValue, operatorValue)
  }
  if (isDecimal(buttonClickValue)) {
    // if decimal is clicked
    handleDecimal(buttonClickValue, currentOperandValue, previousOperandValue, operatorValue)
  }
}

function handleAllClear (previousOperandValue, currentOperandValue, operatorValue) {
  if (
    (previousOperandValue && currentOperandValue) || (previousOperandValue && operatorValue)) {
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

function handleNumber (buttonClickValue, currentOperandValue, previousOperandValue, operatorValue) {
  if (previousOperandValue && !operatorValue) {
    // if POV is not empty and OV is empty, set POV to grey
    styleGrey(previousOperand)
  }
  // otherwise, append button value to end of COV
  let updatedCurrentOperandValue = currentOperandValue + buttonClickValue
  updateValues(currentOperand, updatedCurrentOperandValue)
}

function handleDecimal (buttonClickValue, currentOperandValue, previousOperandValue, operatorValue) {
  if (previousOperandValue && !operatorValue) {
    // if POV is not empty and OV is empty, set POV to grey
    styleGrey(previousOperand)
  }
  if (currentOperandValue.indexOf('.') > 0) {
    // if there is already a decimal in COV do nothing
    return
  }
  if (currentOperandValue) {
    // if there is COV value append decimal to end
    let updatedCurrentOperandValue = currentOperandValue + buttonClickValue
    updateValues(currentOperand, updatedCurrentOperandValue)
  } else {
    // if there is no COV set value to 0.
    let updatedCurrentOperandValue = '0' + buttonClickValue
    updateValues(currentOperand, updatedCurrentOperandValue)
  }
}

function handleOperator (buttonClickValue, currentOperandValue, previousOperandValue, operatorValue) {
  let operator = buttonClickValue

  // if operator +-
  if (operator === '+-') {
    if (previousOperandValue && !operatorValue && !currentOperandValue) {
      if (previousOperandValue.indexOf('-') >= 0) {
        let oppositeOperandValue = previousOperandValue.replace('-', '')
        updateValues(previousOperand, oppositeOperandValue)
      } else {
        let oppositeOperandValue = previousOperandValue.replace('', '-')
        updateValues(previousOperand, oppositeOperandValue)
      }
    } else if (currentOperandValue.indexOf('-') >= 0) {
      // if '-' exists in COV, make it positive
      let oppositeOperandValue = currentOperandValue.replace('-', '')
      updateValues(currentOperand, oppositeOperandValue)
    } else {
      // else make COV negative
      let oppositeOperandValue = '-' + currentOperand.attr('value')
      updateValues(currentOperand, oppositeOperandValue)
    }
    return
  }
  // if COV exists but OV and POV do not
  if (currentOperandValue && !operatorValue && !previousOperandValue) {
    if (currentOperandValue === '-') {
      // if COV is '-', convert to 0
      setValuesToZero(previousOperand)
    } else {
      // else, set POV to COV
      updateValues(previousOperand, currentOperandValue)
    }
    clearValues(currentOperand)
    updateValues(currentOperator, operator)
    return
  }
  // if OV is empty
  if (currentOperandValue && previousOperandValue && !operatorValue) {
    updateValues(previousOperand, currentOperandValue)
    styleAnswer(previousOperand)
    clearValues(currentOperand)
    updateValues(currentOperator, operator)
  }
  // if all empty
  if (currentOperandValue && previousOperandValue && operatorValue) {
  // if COV POV and OV are not empty...
    if (currentOperandValue === '-') {
    // if COV is '-', do nothing
      return
    }
    calculateAnswer(previousOperandValue, currentOperandValue, operatorValue, buttonClickValue)
  // if COV empty
  } else if (previousOperandValue && !currentOperandValue) {
    // if POV exists but COV does not,
    updateValues(currentOperator, operator)
  }
}

function handleEquals (previousOperandValue, currentOperandValue, operatorValue, buttonClickValue) {
  styleAnswer(previousOperand)
  // if equals button is clicked
  if (currentOperandValue === '-') {
    // if COV is '-', do nothing
    return
  }
  if (currentOperandValue && previousOperandValue && operatorValue) {
    // if COV OV and POV all exist
    calculateAnswer(previousOperandValue, currentOperandValue, operatorValue, buttonClickValue)
  } else if (currentOperandValue && !operatorValue) {
    updateValues(previousOperand, currentOperandValue)
    styleAnswer(previousOperand)
    clearValues(currentOperand)
    return
  } else if (currentOperandValue && !previousOperandValue) {
    // if only COV has values, set PO to COV and clear CO and return PO oto answer styling
    updateValues(previousOperand, currentOperandValue)
    styleAnswer(previousOperand)
    clearValues(currentOperand)
    clearValues(currentOperator)
  } else if (operatorValue && !currentOperandValue && !previousOperandValue) {
    // if  OV has a value only, clear it
    clearValues(currentOperator)
  } else if (currentOperandValue && previousOperandValue && operatorValue) {
    // if COV OV and POV all exist
    calculateAnswer(previousOperandValue, currentOperandValue, operatorValue, buttonClickValue
    )
  }
  if (previousOperandValue && operatorValue && !currentOperandValue) {
    // if COV is empty but OV and POV are not, reset OV and restyle POV as answer
    clearValues(currentOperator)
    styleAnswer(previousOperand)
  }
  clearValues(currentOperand)
  clearValues(currentOperator)
}

module.exports = { onButtonClick }
