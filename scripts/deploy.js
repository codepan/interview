const config = require('./getConfigs')()
const Deployer = require('./bundler/Deployer')

const deployer = new Deployer(config)
deployer.run()