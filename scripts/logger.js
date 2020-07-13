const chalk = require('chalk')

const logger = {
  error (message) {
    console.log(chalk.red(message))
  },
  success (message) {
    console.log(chalk.green(message))
  }
}

module.exports = logger