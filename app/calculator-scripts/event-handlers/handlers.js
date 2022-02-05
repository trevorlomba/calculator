/* eslint-disable prefer-const */
/* eslint-disable no-tabs */

const ops = require('../operations')

let y, x, currentOperator, xValue, yValue, currentOperatorValue, buttonClickValue, updatedYValue

const handleNumber = () => {
  if (!yValue) {
    // if (!y)
    updatedYValue = +buttonClickValue
  } else {
    updatedYValue = +(yValue + buttonClickValue)
  }
  ops.swapValues(y, updatedYValue)
}

const handleAllClear = () => {
  if (!yValue && !currentOperatorValue) {
    // if (!y !ov)
    ops.swapValues(x)
  }
  ops.swapValues(currentOperator)
  ops.swapValues(y)
}

const handleDecimal = () => {
  let updatedYValue
  if (!yValue) {
    // if (!y)
    updatedYValue = '0' + buttonClickValue
  } else {
    updatedYValue = yValue + buttonClickValue
  }
  ops.swapValues(y, updatedYValue)
}

const handlePlusMinus = () => {
  if (yValue) {
    // if (y)
    yValue = yValue * -1
    ops.swapValues(y, yValue)
  } else if (xValue) {
    // if (x)
    xValue = +xValue * -1
    ops.swapValues(x, xValue)
  }
}

const handleOperator = () => {
  ops.swapValues(currentOperator, buttonClickValue)
  if (!xValue && !yValue) {
    // if (!x !y)
  } else if (yValue && xValue) {
    // if (y x ov)
    ops.calculateAnswer()
  } else if (yValue) {
    // if (y (!x || !ov))
    ops.swapValues(x, yValue)
    ops.swapValues(y)
  }
}

const handleEquals = () => {
  if (yValue && xValue && currentOperatorValue) {
    // if (x y ov)
    ops.calculateAnswer()
  } else if (yValue) {
    // if (y)
    ops.swapValues(x, yValue)
  }
  ops.swapValues(y)
  ops.swapValues(currentOperator)
}

module.exports = {
  handleAllClear,
  handleDecimal,
  handleEquals,
  handleNumber,
  handleOperator,
  handlePlusMinus
}
