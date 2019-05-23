// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'xes-edit-https'
import qs from 'qs';
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.qs = qs;
//
// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();
// export default vConsole;
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  components: {App},
  store,
  template: '<App/>'
});