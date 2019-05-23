'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
let publicPath = path.join(__dirname,'../static/').replace(/\\/g,'/');
fs.readFile(publicPath+'myConfig.json',{encoding:"utf-8"}, function (err, fr) {
    let data = JSON.parse(fr);
    let version = data.version.split('.');
    let version1 = parseInt(version[0]);
    let version2 = parseInt(version[1]);
    let version3 = parseInt(version[2]);
    if(version3>=20){
        version3 = 0;
        version2 += 1;
    }else{
        version3++;
    }
    if(version2>=20){
        version2 = 0;
        version1 += 1;
    }
    data.version = version1+'.'+version2+'.'+version3;
    fs.writeFile(publicPath+'myConfig.json', JSON.stringify(data),function () {

    });
});
const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
