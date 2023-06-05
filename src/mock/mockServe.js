//先引入mock.js模块
import Mock from "mockjs";
//把JSON数据格式引进来
import banners from './banners.json'
import floors from './floors.json'

//mock数据:第一个参数：请求地址   第二个参数：请求数据
Mock.mock("/mock/banner", {code:200, data: banners}); //模拟首页大的轮播图的数据
Mock.mock("/mock/floor", {code:200, data: floors});