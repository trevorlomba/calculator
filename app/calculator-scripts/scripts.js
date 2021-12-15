// const initValue = ''

function updatePreviousAnswers (firstValue, operatorValue, secondValue, answer) {
  const previousEquation = firstValue + ' ' + operatorValue + ' ' + secondValue + ' = ' + answer
  $('.previous-answers').prepend('<div>' + previousEquation + '</div>')
}
function isNumber (input) {
  if (input === '1' || input === '2' || input === '3' || input === '4' || input === '5' || input === '6' || input === '7' || input === '8' || input === '9' || input === '0' || input === '.') { return true }
}
function isEmpty (input) {
  if (input === '') { return true }
}

// function isOperator (input) {
//   if (input === '*' || input === '/' || input === '+' || input === '-') { return true }
// }

function calculateAnswer (previousOperandAsNumber, currentOperandAsNumber, operatorValue, previousOperand, currentOperand, currentOperator, buttonClickValue) {
  const firstValue = previousOperandAsNumber
  const secondValue = currentOperandAsNumber
  console.log(currentOperandAsNumber)
  if (operatorValue === '*') {
    const answer = firstValue * secondValue
    previousOperand.attr('value', answer)
    previousOperand.html(answer)
  } else if (operatorValue === '/') {
    const answer = firstValue / secondValue
    previousOperand.attr('value', answer)
    previousOperand.html(answer)
  } else if (operatorValue === '-') {
    const answer = firstValue - secondValue
    previousOperand.attr('value', answer)
    previousOperand.html(answer)
  } else if (operatorValue === '+') {
    const answer = firstValue + secondValue
    previousOperand.attr('value', answer)
    previousOperand.html(answer)
  }
  previousOperand.css('color', 'blue')
  previousOperand.css('font-weight', 'bolder')
  currentOperand.html('')
  currentOperand.attr('value', '')
  if (buttonClickValue !== '=') {
    currentOperator.attr('value', buttonClickValue)
    currentOperator.html(buttonClickValue)
  } else {
    currentOperator.attr('value', '')
    currentOperator.html('')
  }
  const answer = previousOperand.attr('value')

  updatePreviousAnswers(firstValue, operatorValue, secondValue, answer)
}

function onButtonClick (event) {
  // console.log('button clicked!')
  const currentOperand = $('.current-operand')
  const previousOperand = $('.previous-operand')
  let currentOperandValue = currentOperand.attr('value')
  const previousOperandValue = previousOperand.attr('value')
  previousOperand.css('color', 'red')
  previousOperand.css('font-weight', '')
  currentOperand.css('color', 'green')
  const currentOperandAsNumber = parseFloat(currentOperandValue, 10)
  const previousOperandAsNumber = parseFloat(previousOperand.attr('value'), 10)
  const buttonClick = event.target
  const buttonClickValue = buttonClick.value
  const buttonClickClass = buttonClick.className
  // console.log(buttonClickClass)
  // console.log(currentOperandValue)
  // console.log(buttonClickValue)
  // const clickedButton = buttonClick
  // console.log(isNumber(buttonClickValue))
  const currentOperator = $('.operator-symbol')
  const operatorValue = currentOperator.attr('value')

  if (isNumber(buttonClickValue)) {
    // if number is clicked
    if (!isEmpty(previousOperandValue) && isEmpty(operatorValue)) {
      // if POV is not empty and OV is empty, set POV to grey
      previousOperand.css('color', 'grey')
    }
    if (buttonClickClass === 'decimal') {
      // if decimal button is clicked...
      console.log('is a decimal')
      if (currentOperandValue.indexOf('.') > 0) {
        // if there is already a decimal in COV do nothing
        return
      } if (!isEmpty(currentOperandValue)) {
        // if there is no COV set value to 0.
        console.log('no decimal in COV')
        console.log('current operand is not empty')
        console.log(currentOperandValue)
        currentOperand.attr('value', currentOperandValue + buttonClickValue)
        currentOperand.html(currentOperandValue + buttonClickValue)
      } else {
        // if there is COV value append decimal to end
        console.log('no decimal in COV')
        console.log('current operand is empty')
        console.log(currentOperandValue)
        currentOperand.attr('value', '0' + buttonClickValue)
        currentOperand.html('0' + buttonClickValue)
      }
      return

      // if COV and POV exist
      // if (!isEmpty(currentOperandValue) && !isEmpty(previousOperandValue)) {
      //   // console.log('if neither are empty')
      //   // console.log(buttonClickValue)
      //   // const value = parseFloat(buttonClickValue, 10)
      //   // console.log(value)
      //   // const value = parseFloat(buttonClickValue, 10)
      //   const newCalculator = currentOperand.attr('value', currentOperandValue + buttonClickValue)
      //   const newCurrentOperandValue = newCalculator.attr('value')
      //   // console.log(newCalculator)
      //   // console.log(newCurrentOperandValue)
      //   currentOperand.html(newCurrentOperandValue)

      //   // // console.log(newCurrentOperandValue)
      //   return newCurrentOperandValue
    } else {
      // otherwise, append button value to end of COV
      // console.log('if one is not empty or not a number')
      currentOperand.html('')
      currentOperand.attr('value', currentOperandValue + buttonClickValue)
      currentOperand.html(currentOperandValue + buttonClickValue)
      // // console.log(newCurrentOperandValue)
      return
    }
  }

  if (buttonClickClass === 'all-clear') {
    // if allclear button is clicked...
    if (!isEmpty(previousOperandValue) && !isEmpty(currentOperandValue) && !isEmpty(operatorValue)) {
      // if POV COV and OV all exist, clear COV
      console.log('POV OV COV all exist')
      console.log('currentOperandValue is ' + currentOperandValue)
      currentOperandValue = ''
      currentOperand.attr('value', '')
      currentOperand.html('')
      return
    } else if (!isEmpty(previousOperandValue) && ((isEmpty(currentOperandValue) && !isEmpty(operatorValue)) || ((!isEmpty(currentOperandValue) && isEmpty(operatorValue))))) {
      // if POV OV exist only, or POV and COV only, clear all but POV and return PO to answer styling
      console.log('POV OV exist, COV does not')
      previousOperand.css('color', 'blue')
      previousOperand.css('font-weight', 'bolder')
      currentOperator.attr('value', '')
      currentOperator.html('')
      currentOperand.attr('value', '')
      currentOperand.html('')
      return
    } else {
      // otherwise, clear all
      previousOperand.attr('value', '')
      previousOperand.html('')
      currentOperand.html('')
      currentOperand.attr('value', '')
      currentOperator.attr('value', '')
      currentOperator.html('')
      return
    }
  }
  if (buttonClickClass === 'equals-operator') {
    previousOperand.css('color', 'blue')
    previousOperand.css('font-weight', 'bolder')
    currentOperator.attr('value', '')
    currentOperator.html('')
    currentOperand.attr('value', '')
    currentOperand.html('')
    // if equals button is clicked
    if (currentOperandValue === '-') {
      // if COV is '-', do nothing
      return
    }
    if (!isEmpty(currentOperandValue) && isEmpty(operatorValue)) {
      // if POV and COV have values but not OV, set PO to COV and clear CO and return PO oto answer styling.
      // console.log('equals called but no operator')
      // if (currentOperandValue === '-') {
      //   // if COV is '-', convert to 0
      //   previousOperand.attr('value', 0)
      //   previousOperand.html('0')
      // } else {
      previousOperand.attr('value', currentOperandAsNumber)
      previousOperand.html(currentOperandAsNumber)
      // }
      previousOperand.css('color', 'blue')
      previousOperand.css('font-weight', 'bolder')
      currentOperand.attr('value', '')
      currentOperand.html('')
      return
    } else if (!isEmpty(currentOperandValue) && isEmpty(previousOperandValue)) {
      // if only COV has values, set PO to COV and clear CO and return PO oto answer styling
      // console.log('equals called but no operator')
      previousOperand.attr('value', currentOperandAsNumber)
      previousOperand.html(currentOperandAsNumber)
      previousOperand.css('color', 'blue')
      previousOperand.css('font-weight', 'bolder')
      currentOperand.attr('value', '')
      currentOperand.html('')
      currentOperator.attr('value', '')
      currentOperator.html('')
    } else if (isEmpty(currentOperandValue) && isEmpty(previousOperandValue) && !isEmpty(operatorValue)) {
      // if  OV has a value only, clear it
      currentOperator.attr('value', '')
      currentOperator.html('')
    } else if (!isEmpty(currentOperandValue) && !isEmpty(previousOperandValue) && !isEmpty(operatorValue)) {
      // if COV OV and POV all exist
      calculateAnswer(previousOperandAsNumber, currentOperandAsNumber, operatorValue, previousOperand, currentOperand, currentOperator, buttonClickValue)
    }
    if (isEmpty(currentOperandValue) && !isEmpty(previousOperandValue) && !isEmpty(operatorValue)) {
      // if COV is empty but OV and POV are not, reset OV and restyle POV as answer
      currentOperator.attr('value', '')
      currentOperator.html('')
      previousOperand.css('color', 'blue')
      previousOperand.css('font-weight', 'bolder')
      return
    }
  }
  if (buttonClickClass === 'operator') {
    // if an operator is clicked
    // console.log('this is an operator')
    const operator = buttonClickValue
    if (operator === '+-') {
      if (!isEmpty(previousOperandValue) && isEmpty(operatorValue)) {
        // if POV is not empty and OV is empty, set POV to grey
        previousOperand.css('color', 'grey')
      }
      if (currentOperandValue.indexOf('-') >= 0) {
        // if '-' exists in COV, make it positive
        console.log('more than zero -s')
        const oppositeOperandValue = currentOperandValue.replace('-', '')
        currentOperand.attr('value', oppositeOperandValue)
        currentOperand.html(oppositeOperandValue)
        return
      } else {
        // else make COV negative
        const oppositeOperandValue = '-' + currentOperandValue
        currentOperand.attr('value', oppositeOperandValue)
        currentOperand.html(oppositeOperandValue)
        return
      }
    }
    if (!isEmpty(currentOperandValue) && !isEmpty(previousOperandValue) && isEmpty(operatorValue)) {
      previousOperand.attr('value', currentOperandAsNumber)
      previousOperand.html(currentOperandAsNumber)
      previousOperand.css('color', 'blue')
      previousOperand.css('font-weight', 'bolder')
      currentOperand.attr('value', '')
      currentOperand.html('')
      currentOperator.attr('value', operator)
      currentOperator.html(operator)
    }
    if (!isEmpty(currentOperandValue) && !isEmpty(previousOperandValue) && !isEmpty(operatorValue)) {
      // if COV POV and OV are not empty...
      // console.log('this is an answer')
      if (currentOperandValue === '-') {
        // if COV is '-', do nothing
        return
      }
      calculateAnswer(previousOperandAsNumber, currentOperandAsNumber, operatorValue, previousOperand, currentOperand, currentOperator, buttonClickValue)
    }
    // if ((isEmpty(currentOperandValue) || isOperator(currentOperandValue)) && isEmpty(previousOperandValue)) {
    //   // if POV OV and COV are all empty, return
    //   currentOperand.html('')
    //   currentOperand.attr('value', '')
    //   return
    // }
    if (!isEmpty(currentOperandValue) && isEmpty(operatorValue) && isEmpty(previousOperandValue)) {
      // if COV exists but OV and POV does not, set POV and clear COV
      // console.log('already had a number')
      if (currentOperandValue === '-') {
        // if COV is '-', convert to 0
        previousOperand.attr('value', 0)
        previousOperand.html('0')
      } else {
        // else, set COV as POV
        previousOperand.attr('value', currentOperandAsNumber)
        previousOperand.html(currentOperandAsNumber)
      }
      currentOperand.html('')
      currentOperand.attr('value', '')
      currentOperator.attr('value', operator)
      currentOperator.html(operator)
      // console.log('previous value is ' + currentOperandAsNumber)
      // console.log(currentOperandAsNumber)
    } else if (isEmpty(currentOperandValue) && !isEmpty(previousOperandValue)) {
      // if POV exists but COV does not,
      // console.log('previous filled current empty')
      currentOperator.attr('value', operator)
      currentOperator.html(operator)
    }
    // if there is not a current operand value but there is a previous operand value and a button is clicked
  }
}

module.exports = { onButtonClick }
