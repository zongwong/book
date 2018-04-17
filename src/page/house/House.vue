<template>
  <div>
      <my-search></my-search>  
      <div class="post_box">
        <div class="post_item">
          <div class="post_user">
            <img src="../../assets/image/book.png" alt="">
            <p class="name oneHide">气温气温</p>
          </div>
          <div class="post_data">
            <p class="post_title oneHide">12312312323</p>
            <div class="post_detail">
              <img src="../../assets/image/book.png" alt="">
              <p class="moreHide">qweqweqweqwe空气环境为偶好几千胸围和其吻合器未</p>
            </div>
            <div class="post_other">
              <span>2018-1-12 13:22</span>
              <span class="from">来自 陈琳达</span>
              <span class="zan">点赞 23</span>
              <span class="hr">丨</span>
              <span class="comment">评论 345</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Search from '../../components/common/Search';

export default {
  name: 'House',
  components: {
    'my-search': Search
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  created(){
    getLeaseList({
      
    }).then(res=>{

    })
  }
};

</script>

<style lang="scss" scoped>
</style>