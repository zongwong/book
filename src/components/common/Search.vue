<template>
  <div class="search_bar">
    <div class="search_wrap clearfix">
      <div class="search_left">
        <el-input placeholder="请输入内容"></el-input>
      </div>
      <div class="search_right">
        <el-button class="auto-width" type="success" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.search_bar{
    width: 100%;
    height: 120px;
    background: url(../../assets/icon/bg_search.png) 0 0 / cover no-repeat;
    overflow: hidden;
}
.search_wrap{
  width: 950px;
  margin: 40px auto;
}
.search_left{
  float: left;
  width:770px;
}
.search_right{
  float: right;
  width:160px;
}
</style>