import Vue from "vue";
import Vuex from "vuex";
//需要使用一次
Vue.use(Vuex);

// //state:仓库存储数据的地方
// const state = {
//     count: 1,
// };

// //mutations:修改state的唯一手段
// const mutations = {
//     ADD(state){
//         state.count++;
//     }
// };

// //actions:处理action，可以书写自己的业务逻辑，也可以处理异步
// const actions = {
//     add({commit}){
//         commit('ADD')
//     }
// };

// //getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// const getters = {};

//对外暴露Store类的一个实例
// export default new Vuex.Store({
//     state,
//     mutations,
//     actions,
//     getters,
// })

//引入小仓库
import home from "./home";
import search from "./search";

export default new Vuex.Store({
  //实现Vuex仓库模块式开发存储数据
  modules:{
    home,
    search
  }
})