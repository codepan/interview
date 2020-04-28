# 项目介绍
这是一个使用gitbook构建静态网站，并自动化部署到自己的服务器上的一个模板项目

# 项目技术
* markdown
* gitbook
* gulp
* ftp

# 项目目录介绍
* bundler 项目构建工具目录
  * Bundler.js 项目构建工具
  * Deployer.js 项目部署工具
* src 源码目录 目录中的内容实际上就是使用gitbook init生成的内容
* build.js 构建时被node执行的文件
* bundler.config.js 项目构建部署配置文件
* deploy.js 部署时被node执行的文件
* gulpfile.js gulp配置文件
* package.json
* README.md
* yarn.lock

# bundler.config.js
```js
module.exports = {
  entry: './src', // gitbook build时的入口目录
  output: './dist', // gitbook build是的输出目录
  deploy: { // 部署相关的配置
    rootPath: 'xxx', // 部署服务器根路径
    targetPath: 'dist', // 指定要将本地的哪个目录上传至服务器，如果不配置，默认为output指定的目录
    deployPath: 'dist', // 指定要上传到服务器的哪个目录中，如果不配置，默认为 rootPath/targetPath。当然如果targetPath没有给出，则就会上传到rootPath/output
    connectOptions: { // ftp模块 ftp.connect()方法的参数
      host: 'xxx,
      user: 'xxx',
      password: 'xxx'
    }
  }
}
```
# 运行脚本
```shell
# 开发预览
yarn run dev
or
npm run dev
```

```shell
# 项目构建
yarn run build
or
npm run build
```

```shell
# 项目发布
yarn run deploy
or
npm run deploy
```

# 相关参考
* [ftp 模块](https://www.npmjs.com/package/ftp)
* [chalk 模块](https://www.npmjs.com/package/chalk)
* [shelljs 模块](https://www.npmjs.com/package/shelljs)
* [gitbook 模块](https://www.npmjs.com/package/gitbook)
* [inquirer 模块](https://www.npmjs.com/package/inquirer)
* [gulp 模块](https://www.npmjs.com/package/gulp)
* [gulp 官网](https://gulpjs.com/)
