const path = require('path')

const config = require(path.resolve(process.cwd(), 'bundler.config.js'))

const Bundler = require('./bundler/Bundler')

const bundler = new Bundler(config)
bundler.run()