<template>
  <div id="app">
    <router-view/>
    <End v-if="$store.state.isShow"/>
    <Pend v-if="pisShow"/>
    <!-- <div class="text"  v-if="$store.state.isShow"></div> -->
  </div>
</template>
<script>

  import {Container,Sprite,Graphics} from 'pixi.js';
  import End from 'xes-tem-end';//不带解析结果页
  //import End from 'xes-tem-anend';//带解析结果页
  import Pend from 'xes-tem-pend';//平台结果页
  // import End from './components/End'
  require('./store/index.js');
  export default {
    name: 'App',
    data () {
      return {
      }
    },
    components:{
       End,
       Pend
    },
    computed:{
      isShow(val,value){
        return store.state.isShow
    },
    pisShow(val,value){
        return store.state.pisShow
    }
  },
    mounted() {
      console.log("APP组件加载完成");
    }
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: black;
  }

  #app {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .text{
    width:19.2rem;
    height:10.8rem;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-9.6rem;
    margin-top:-5.4rem;
    background:red;
  }
</style>
