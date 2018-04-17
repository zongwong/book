<template>
  <div class="">
      <my-search></my-search>
      <div class="box1000">
          <div class="goods_info">
              <div class="goods_imgs">
                  <img src="../../assets/image/book.png" alt="">
              </div>
              <div class="goods_data">
                  <p class="title">{{goodsInfo.title}}</p>
                  <p class="price">￥{{goodsInfo.shop_price}}</p>
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
                  <p>发布者:{{userinfo.name}}</p>
                  <p>毕业于:{{userinfo.country}}</p>
              </div>
          </div>
          <p class="goods_intro">简介</p>
          <div class="goods_content">
              {{goodsInfo.summary}}
          </div>
      </div>
  </div>
</template>

<script>
import Search from '../../components/common/Search';
import { getGoodsInfo } from '../../api/api';
export default {
  name: 'BookDetail',
  components: {
    'my-search': Search
  },
  data() {
    return {
      goodsInfo: {},
      userinfo: {}
    };
  },
  created(){
      getGoodsInfo({
          goods_id:this.$route.params.id,
          token: this.$store.state.token
      }).then(res=>{
        this.goodsInfo = res.data.goodsInfo
        this.userinfo = res.data.goodsInfo.userinfo
      })
  }
};

</script>

<style lang="scss" scoped>

</style>