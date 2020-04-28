const path = require('path')
const shell = require('shelljs')

class Bundler {
  constructor (config) {
    this.config = config
  }
  _resolve (dir) {
    return path.resolve(process.cwd(), dir)
  }

  run () {
    let {entry = './src', output = './_book'} = this.config
    entry = this._resolve(entry)
    output = this._resolve(output)
    const command = `gitbook build ${entry} ${output} && gulp`
    shell.exec(command)
  }
}

module.exports = Bundler