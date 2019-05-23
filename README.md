# xes-template

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#下载模板脚手架
  npm install xes-tem-cli -g
  xtemcli init <项目名>

#  脚手架组件包介绍
  1.xes-start（开始页）(包含所有开始页部分)
    demo:
    <import START from "xes-start";>
    let start = new START(question.one.start,game);
    let startBtn = start.button();
    备注:START参数为开始页字段的数据(详见content.json);

  2.xes-game（游戏页）(包含游戏答题页背景音乐部分和题干图部分)
    demo:
    <import GAME from "xes-game";>
    let game = new GAME(question.sources[0].bgImage,question.sources[0].stemImg);
    let gameBtn = game.button();
    备注:GAME三个参数分别是当前小题的背景图字段数据、题干图部分字段信息(详见content.json);

   3.xes-title（题干音频和文字组合部分）
     demo:
     <import STEMTITLE from 'xes-subtitle';>
     let stemTitle = new STEMTITLE(question.sources[0].subTitle);
	 let stemTitleBtn = stemTitle.button();
	 备注:STEMTITLE参数为当前小题的题干数据信息(详见content.json);
   
   4.xes-tem-end （金币页不带解析）
     xes-tem-anend （金币页带解析）
     备注:详见App.vue
   5.xes-tem-edit 编辑组件包
   6.xes-answer 接口包
     type:0 单选和完成  1 多选  2 填空
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#  脚手架日志
    * type:错误类型
    * msg:错误信息
    * url:错误链接
    * line:错误行数
    js运行过程中，可以捕获一些语法错误，device：可以捕获用户使用设备信息。
#  编辑表单组件包
   xes-tem-edit
   包含开发页、游戏页(公共组件部分)、结果页可配置项部分。
#  编辑器UI库 element-ui

#  开发注意事项

   

