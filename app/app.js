// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const calculatorScripts = require('./calculator-scripts/scripts.js')

$(() => {
  $('.calculator-keys').on('click', function (event) {
    const buttonClick = event.target
    if (buttonClick.type === 'button') {
      calculatorScripts.onButtonClick(event)
    }
  })
})
