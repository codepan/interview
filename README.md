# 项目介绍
这是一个使用gitbook构建静态网站，并自动化部署到自己服务器上的一个模板项目

# 项目技术
* markdown
* gitbook
* gulp
* ftp
* ssh、scp

# 项目目录介绍
* src 源码目录 目录中的内容实际上就是使用gitbook init生成的内容
* gitbook.config.js 项目构建部署配置文件，填写了一些默认项，其它的需要开发者自行补充
* gulpfile.js gulp配置文件
* package.json
* README.md

# gitbook.config.js 配置文件介绍
```js
module.exports = {
  mode: 'scp', // 部署模式，有ftp和scp两种取值，必填配置，否则执行deploy命令会报错
  entry: './src', // gitbook build时的入口目录，可选配置，默认为./src
  output: './dist', // gitbook build时的输出目录，可选配置，默认为./dist
  deploy: { // 部署相关的配置
    projectName: 'xxx', // 部署到服务器的项目名称，即文件夹名称
    rootPath: 'xxx', // 欲部署到服务器的路径
    connectOptions: { // 与服务器建立链接的相关配置 对于ftp模式，以下配置即为ftp模块 ftp.connect()方法的参数
      host: 'xxx', // 主机
      user: 'xxx', // 用户名
      password: 'xxx' // 密码
    }
  },
  devServer: { // 开发服务器相关配置
    port: 4000, // 端口号，默认为4000
    open: false, // 是否自动打开浏览器，默认false
    watch: true, // 是否监听文件的变化，自动刷新，默认true
  }
}
```
# 运行脚本
```shell
# 开发预览
npm run dev
```

```shell
# 项目构建
npm run build
```

```shell
# 项目发布
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
