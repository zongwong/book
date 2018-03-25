<template>
  <div class="">
      <my-search></my-search>
      <div class="box1000">
          <div class="goods_info">
              <div class="goods_imgs">
                  <img src="../../assets/image/book.png" alt="">
              </div>
              <div class="goods_data">
                  <p class="title">请问请问亲我额去</p>
                  <p class="price">￥20.00</p>
                  <div class="buyBtn_wrap">
                      <router-link to="/buy"><el-button size="small" type="success" round>立即购买</el-button></router-link>
                  </div>
              </div>
              <div class="saler_info">
                  <div class="avatar_wrap">
                      <router-link to="/user/1">
                        <img src="../../assets/image/book.png" alt="">
                        <i class="saler_sex"></i>
                      </router-link>
                  </div>
                  <p>发布者:123123</p>
                  <p>毕业于:123123123123</p>
              </div>
          </div>
          <p class="goods_intro">简介</p>
          <div class="goods_content">
              qweqweq weqwe
          </div>
      </div>
  </div>
</template>

<script>
import Search from '../../components/common/Search';

export default {
  name: 'BookDetail',
  components: {
    'my-search': Search
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};

</script>

<style lang="scss" scoped>

</style>