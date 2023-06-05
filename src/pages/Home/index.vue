<template>
  <div>
    <!-- 三级联动组件，已经注册为全局组件，不需要引入 -->
    <TypeNav></TypeNav>

    <!-- 轮播图列表 -->
    <ListContainer></ListContainer>

    <!-- 今日推荐 -->
    <Recommend></Recommend>

    <!-- 商品排行 -->
    <Rank></Rank>

    <!-- 猜你喜欢 -->
    <Like></Like>

    <!-- 楼层 -->
    <Floor></Floor>
    <Floor></Floor>

    <!-- 商标 -->
    <Brand></Brand>
  </div>
</template>

<script>
//引入其它组件
import ListContainer from "./ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

export default {
  name: "home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  computed: {
  },
  methods:{
    
  }
};
</script>

<style>
</style>