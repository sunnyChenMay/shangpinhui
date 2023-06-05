import Vue from 'vue'
import App from './App.vue'

//三级联动组件（分类导航）--全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);

Vue.config.productionTip = false

//引入路由
import router from '@/router'
//引入仓库
import store from './store';
//引入mockjs
import '@/mock/mockServe';
//引入swiper样式
import 'swiper/css/swiper.css';

new Vue({
  render: h => h(App),
  //注册路由：底下的写法KV一直，省略V[router小写的]
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route和$router属性
  //每个路由组件都有$route属性，全局只有一个$router属性
  router,
  //注册仓库：组件实例的身上会多出一个$store属性
  store,
}).$mount('#app')
