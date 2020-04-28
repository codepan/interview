const Ftp = require('ftp')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')

const Logger = {
  error (message) {
    console.log(chalk.red(message))
  },
  success (message) {
    console.log(chalk.green(message))
  }
}

class Deployer {
  constructor (config) {
    this.config = config
    this.init(config)
  }

  init (config) {
    const valid = this.checkConfig(config)
    if (!valid) return
    
    this.targetPath = path.resolve(process.cwd(), config.deploy.targetPath || config.output)
    this.deployPath = path.join(config.deploy.rootPath, config.deploy.deployPath || config.deploy.targetPath || config.output)
  }

  checkConfig (config) {
    if (!config.deploy) {
      Logger.error('未提供deploy配置项')

      Logger.error(`deploy配置项必填参数有：rootPath, connectOptions{host, user, password}`)

      return false
    }

    const { rootPath, connectOptions } = config.deploy
    if (!rootPath) {
      Logger.error('未提供deploy.rootPath配置项')
      return false
    }

    if (!connectOptions) {
      Logger.error('未提供deploy.connectOptions配置项')
      return false
    }

    const { host, user, password } = connectOptions
    if (!host || !user || !password) {
      Logger.error('connectOptions{host, user, password}为必填项')
      return false
    }

    return true
  }

  initFtp () {
    const ftp = new Ftp()
    ftp.connect(this.config.deploy.connectOptions)
    this.ftp = ftp
  }

  checkDeployEnv (callback) {
    if (!fs.existsSync(this.targetPath)) {
      return Logger.error(`将要部署的目录 ${this.targetPath} 不存在`)
    }
    this.initFtp()

    const { ftp, deployPath } = this
    ftp.on('ready', () => {
      ftp.list(deployPath, (err, list) => {
        if (err || list.length === 2) {
          return callback()
        }

        inquirer.prompt([
          {
            type: 'confirm',
            name: 'continue',
            message: `远程目录${deployPath}不是一个空目录，继续部署会覆盖掉所有内容，您确定继续吗？`,
            default: false
          }
        ]).then(answer => {
          if (answer.continue) {
            callback()
          }
        })
      })
    })
  }

  getFiles () {
    const dir = this.targetPath
    let files = []
    const walk = dir => {
      try {
        const list = fs.readdirSync(dir)
        list.forEach(file => {
          file = path.resolve(dir, file)
          const stat = fs.statSync(file)
          if (stat && stat.isDirectory()) {
            walk(file)
          } else {
            files.push(file)
          }
        })
      } catch (e) {
        Logger.error(`获取将要部署的目录${dir}内容失败`)
      }
    }
    walk(dir)

    return files
  }

  deploy () {
    const { ftp } = this
    const files = this.getFiles()
    if (!files.length) {
      Logger.error(`不能部署空目录${this.targetPath}，部署失败`)
      ftp.end()
      return
    }

    files.forEach(file => {
      let relativePath = path.relative(this.targetPath, file)
      let { dir, base } = path.parse(relativePath)
      if (!dir) {
        ftp.mkdir(this.deployPath, true, err => {
          if (err) throw err
          ftp.put(file, `${this.deployPath}/${base}`, err => {
            if (err) throw err
          })
          ftp.end()
        })
      } else {
        ftp.mkdir(`${this.deployPath}/${dir}`, true, err => {
          if (err) throw err
          ftp.put(file, `${this.deployPath}/${dir}/${base}`, err => {
            if (err) throw err
          })
          ftp.end()
        })
      }
    })
  }

  run () {
    this.checkDeployEnv(() => {
      this.deploy()
    })
  }
}

module.exports = Deployer