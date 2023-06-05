<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveIndex()" @mouseenter="enterShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 添加过渡动画-->
      <transition name="sort">
        <div class="sort" v-show="isShow">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ bo: currentIndex == index }"
              @mouseenter="changeIndex(index)"
            >
              <h3>
                <a
                  :data-categoryname="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryname="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryname="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle"; //按需引入
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1, //左侧菜单当前经过的索引值，用来添加悬浮样式
      isShow: true, //左侧菜单是否显示（搜索页默认不显示）
    };
  },
  //组件挂载完毕：可以向服务器发送请求(减少请求次数，放在APP.vue中加载)
  mounted() {
    //通知Vuex发请求，获取数据，存储于仓库中(减少请求次数，放在APP.vue中加载)
    // this.$store.dispatch("categoryList");
    //搜索页菜单下拉，不显示
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数就会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据
      //简写：categoryList:state=>state.home.categoryList,
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    //商品分类进入菜单，添加背景色
    // changeIndex(index) {
    //   this.currentIndex = index;
    //   console.log("鼠标进入" + index);
    // },
    //节流写法
    //throttle回调函数别用箭头函数，可能出现上下文this指向错误问题
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    //鼠标移除，取消背景色
    leaveIndex() {
      this.currentIndex = -1;
      // 搜索页，鼠标移除，隐藏菜单
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
    //进行路由跳转的方法
    goSearch(event) {
      //最好的解决方案：编程式导航+事件委托
      //利用时间委托存在一些问题：1、怎么判断点击的是a标签 2、如何区分一级、二级、三级 怎么传递参数

      //1、把子节点当中a标签，加上自定义属性data-categoryname，其余子节点是没有的
      //节点有一个属性dataset，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } = event.target.dataset;

      if (categoryname) {
        //准备路由跳转的参数对象
        let location = { name: "search" };
        location.query = { 
          categoryname: categoryname, 
        };
        if(category1id){//一级目录
          location.query.category1id = category1id;
        }else if(category2id){//二级目录
          location.query.category2id = category2id;
        }else if(category3id){//三级目录
          location.query.category3id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，需要携带传递过去
        if(this.$route.params){
          location.params = this.$route.params
        }

        this.$router.push(location);
      }
    },
    //全部商品分类，进入显示菜单列表
    enterShow() {
      this.isShow = true;
    },
    // test() {
    //   //防抖默写
    //   const debounce = (fn, wait, immediate) => {
    //     let timer = null;
    //     return function (...args) {
    //       if (timer) {
    //         clearTimeout(timer);
    //       }
    //       if (immediate && !timer) {
    //         fn.call(this, args);
    //       }
    //       timer = setTimeout(() => {
    //         fn.call(this, args);
    //       }, wait);
    //     };
    //   };
    //   debounce(
    //     () => {
    //       console.log("防抖");
    //     },
    //     1000,
    //     true
    //   );
    //   //节流
    //   function throttle(fn, wait) {
    //     let pre = 0;
    //     return function (...args) {
    //       let now = Date.now();
    //       if (now - pre >= wait) {
    //         fn.apply(this, args);
    //         pre = now;
    //       }
    //     };
    //   }
    //   throttle(this.changeIndex, 1000);
    // },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .bo {
          background: #ccc;
        }
      }
    }

    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter{
      height: 0px;
    }
    //过渡动画结束状态（进入）
    .sort-enter-to{
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>