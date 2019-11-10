import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import toast from "./components/common/toast";
import VueLazyLoad from "vue-lazyload";
Vue.config.productionTip = false;

//使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading:require("./assets/img/loading/loading.jpg")
});


//安装toast插件
Vue.use(toast);

Vue.prototype.$bus=new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
