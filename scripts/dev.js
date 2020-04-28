const shell = require('shelljs')
const { entry, output } = require('./getConfigs')()

const command = `gitbook serve ${entry} ${output}`
shell.exec(command)