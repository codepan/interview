const path = require('path')
const fs = require('fs')

const FTPDeployer = require('./FTPDeployer')
const SCPDeployer = require('./SCPDeployer')

const logger = require('../logger')

class Deployer {
  constructor (configs) {
    this.configs = configs
    this.init()
  }

  init () {
    const valid = this.checkConfigs()
    if (!valid) return

    this.processConfigs()
  }

  processConfigs () {
    const mode = this.getMode()
    if (!mode) {
     return logger.error(`--mode 目前只支持${supportModes.join(',')}，${mode}为非法模式`)
    }

    let configs = this.configs

    configs.mode = mode
    configs.output = path.resolve(process.cwd(), configs.output)
    configs.deployPath = path.join(configs.deploy.rootPath, configs.deploy.projectName)
  }

  checkConfigs () {
    const configs = this.configs
    if (!configs.deploy) {
      logger.error('未提供deploy配置项')

      logger.error(`deploy配置项必填参数有：projectName, rootPath, connectOptions{host, user, password}`)

      return false
    }

    const { projectName, rootPath, connectOptions } = configs.deploy
    if (!projectName) {
      logger.error('未提供deploy.projectName配置项')
      return false
    }

    if (!rootPath) {
      logger.error('未提供deploy.rootPath配置项')
      return false
    }

    if (!connectOptions) {
      logger.error('未提供deploy.connectOptions配置项')
      return false
    }

    const { host, user } = connectOptions
    if (!host || !user) {
      logger.error('connectOptions{host, user}为必填项')
      return false
    }

    return true
  }

  getMode () {
    const supportModes = ['scp', 'ftp']
    const params = process.argv.slice(2)
    if(params.includes('--mode')) {
      const modeIndex = params.indexOf('--mode')
      const mode = params[modeIndex + 1]
      if (!supportModes.includes(mode)) {
        return
      }
      return mode
    }

    if (this.configs.mode) {
      const { mode } = this.configs
      if (!supportModes.includes(mode)) {
        return
      }

      return mode
    }
  
    return supportModes[0]
  }

  checkDeployEnv () {
    const { output } = this.configs
    if (!fs.existsSync(output)) {
      logger.error(`将要部署的目录 ${output} 不存在`)
      return false
    }

    return true
  }


  run () {
    if (!this.checkDeployEnv()) {
      return
    }
    let deployer = null
    const { mode } = this.configs
    if (mode === 'ftp') {
      deployer = new FTPDeployer(this.configs)
    }
    if (mode === 'scp') {
      deployer = new SCPDeployer(this.configs)
    }
    
    if (!deployer) {
      return
    }

    deployer.run()
  }
}

module.exports = Deployer