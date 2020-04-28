const path = require('path')

const config = require(path.resolve(process.cwd(), 'bundler.config.js'))

const Deployer = require('./bundler/Deployer')

const deployer = new Deployer(config)
deployer.run()