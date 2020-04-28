function getConfigs () {
  let configs = {
    entry: './src',
    output: './docs'
  }
  try {
    const userConfigs = require('../bundler.config')
    if (userConfigs) {
     configs = {
       ...configs,
       ...userConfigs
     }
    }
  } catch (e) {
  }

  return configs
}

module.exports = getConfigs