const shell = require('shelljs')

const command = `npm run build && git add . && git commit -m 'release' && git push origin -u master`
shell.exec(command)