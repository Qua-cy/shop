// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import 'swiper/dist/css/swiper.css';
import 'assets/scss/index.scss';

fastclick.attach(document.body);

// 全局应用vue-lazyload插件
Vue.use(VueLazyload, {
  preLoad: 1,
  error: require('assets/img/error.png'),
  loading:require('assets/img/loading.gif'),
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
