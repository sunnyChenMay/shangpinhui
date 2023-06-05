//home模块的小仓库
import { reqCategoryList, reqBannerList } from '@/api'

const state = {
    categoryList: [],
    bannerList: [],
};
const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerList){
        state.bannerList = bannerList;
    }
};
const actions = {
    //通过API里面的接口函数调用，向服务器发送请求，获取服务器数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code == 200){
            commit("CATEGORYLIST", result.data)
        }
    },
    //获取banner数据
    async bannerList({commit}){
        console.log('banner')
        let result = await reqBannerList();
        if(result.code == 200){
            commit('BANNERLIST', result.data);
            console.log('BANNERLIST===', result.data)
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}