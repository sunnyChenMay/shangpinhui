//API进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest";

//首页三级联动接口
//http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList  get  无参数
//发请求：axios发请求返回结果——Promise对象
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
});

//获取banner轮播数据
export const reqBannerList = () => mockRequests.get('/banner');