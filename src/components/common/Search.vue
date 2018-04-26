<template>
  <div class="search_bar" :class="className">
    <div class="search_wrap clearfix">
      <div class="search_left">
        <el-input placeholder="请输入内容" v-model="word" @keyup.enter.native="searchEvent"></el-input>
      </div>
      <div class="search_right">
        <el-button class="auto-width" type="success" icon="el-icon-search"  @click="searchEvent">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props:{
    className:{
      type: String,
      required: false
    }
  },
  data() {
    return {
      word:'',
    };
  },
  methods:{
    searchEvent(){
      this.$router.push({
        path:'/search',
        query:{
          word:this.word
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.search_bar{
    width: 100%;
    height: 120px;
    overflow: hidden;
    background: url(../../assets/icon/bg_search.png) 0 0 / cover no-repeat;
    &.nobg{
      background: none;
    }
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