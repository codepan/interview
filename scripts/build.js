const shell = require('shelljs')

const { entry, output } = require('./getConfigs')()

const command = `gitbook build ${entry} ${output} && gulp`
shell.exec(command)