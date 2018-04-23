<template>
  <div class="">
      <my-search></my-search>
      <div class="box1000">
          <div class="goods_info" v-loading="loading">
              <div class="goods_imgs">
                  <img v-if="goodsInfo.images[0]" :src="host + goodsInfo.images[0] " alt="封面">
              </div>
              <div class="goods_data">
                  <p class="title">{{goodsInfo.title}}</p>
                  <p class="price">{{goodsInfo.currency_symbol}} {{goodsInfo.shop_price}}</p>
                  <div class="buyBtn_wrap">
                      <router-link :to="'/buy/'+goodsInfo.goods_id"><el-button size="small" type="success" round>立即购买</el-button></router-link>
                  </div>
              </div>
              <div class="saler_info">
                  <div class="avatar_wrap">
                      <router-link :to="'/user/'+userinfo.user_id">
                        <img :src="host+userinfo.headimgurl" alt="用户头像">
                        <i class="saler_sex"></i>
                      </router-link>
                  </div>
                  <p>发布者:{{userinfo.nickname}}</p>
                  <p>毕业于:{{userinfo.graduate_school}}</p>
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
import { mapState } from 'vuex';
export default {
  name: 'BookDetail',
  components: {
    'my-search': Search
  },
  data() {
    return {
      goods_id:'',
      goodsInfo: {
          images:[]
      },
      userinfo: {
          headimgurl:''
      },
      loading:false
    };
  },
  computed:{
      ...mapState([
          'host'
      ])
  },
  created(){
      this.goods_id = this.$route.params.id;
      this.loading = true;
      getGoodsInfo({
          goods_id:this.goods_id,
      }).then(res=>{
        this.goodsInfo = res.data.goodsInfo;
        this.userinfo = res.data.goodsInfo.userinfo;
        this.loading = false;
      })
  }
};

</script>

<style lang="scss" scoped>

</style>