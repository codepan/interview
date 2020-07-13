const config = require('./getConfigs')()
const Deployer = require('./deployer/Deployer')

const deployer = new Deployer(config)
deployer.run()