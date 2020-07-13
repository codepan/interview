const logger = require('./logger')

const defaultConfigs = {
  entry: './src',
  output: './dist'
}

function getConfigs () {
  let configs = {...defaultConfigs}
  const configFile = getConfigFile()
  try {
    const userConfigs = require(`../${configFile}`)
    if (userConfigs) {
     configs = {
       ...configs,
       ...userConfigs
     }
    }
  } catch (e) {
    logger.error(`项目根路径下未提供名为 ${configFile} 配置文件`)
    process.exit(0)
  }

  return configs
}

function getConfigFile () {
  let configFile = 'gitbook.config'
  const params = process.argv.slice(2)
  if (params.includes('--config')) {
   configFile = params[params.indexOf('--config') + 1]
  }

  return configFile
}

module.exports = getConfigs