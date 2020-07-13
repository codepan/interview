const shell = require('shelljs')
const logger = require('../logger')

class SCPDeplayer {
  constructor (configs) {
    this.configs = configs
    this.output = configs.output
    this.deployPath = configs.deployPath
    this.connectOptions = configs.deploy.connectOptions
  }

  deploy () {
    const { output, deployPath } = this
    console.log(deployPath)
    const { user, host } = this.connectOptions
    shell.exec(`ssh -T ${user}@${host} "mkdir -p ${deployPath}/"`)
    shell.exec(`scp -r ${output}/* ${user}@${host}:${deployPath}/`)
    logger.success('部署成功')
  }
  
  run () {
    this.deploy()
  }
}


module.exports = SCPDeplayer