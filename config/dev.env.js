'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const path = require('path');
let DEFAULT_PATH = path.join(__dirname,'../').replace(/\\/g,'/');
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    DEFAULT_PATH:'"'+DEFAULT_PATH+'"'
});
