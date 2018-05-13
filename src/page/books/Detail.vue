<template>
  <div class="">
      <my-search></my-search>
      <div class="box1000">
          <div class="goods_info" v-loading="loading">
              <div class="goods_imgs">
                  <img v-if="goodsInfo.images[0]" :src="goodsInfo.images[0] | headfilter" alt="封面">
              </div>
              <div class="goods_data">
                  <p class="title">{{goodsInfo.title}}</p>
                  <p class="price">{{goodsInfo.currency_symbol}} {{goodsInfo.shop_price}}</p>
                  <div class="buyBtn_wrap">
                      <router-link :to="'/buy/1/'+goodsInfo.goods_id"><el-button size="small" type="success" round>{{$t('btn.buy')}}</el-button></router-link>
                  </div>
              </div>
              <div class="saler_info">
                  <div class="avatar_wrap">
                      <router-link :to="'/user/'+userinfo.user_id">
                        <img v-if="userinfo.headimgurl" :src="userinfo.headimgurl | headfilter" alt="用户头像">
                        <i class="saler_sex" :class="{'icon_man':userinfo.sex==1}"></i>
                      </router-link>
                  </div>
                  <p>{{$t('show.publisher')}}:{{userinfo.nickname}}</p>
                  <p>{{$t('show.graduated')}}:{{userinfo.graduate_school}}</p>
              </div>
          </div>
          <p class="goods_intro">{{$t('show.abstract')}}</p>
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
import headfilter from '../../utils/tools';
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
  filters:{
      headfilter
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
          if(res.code==200){
              this.goodsInfo = res.data.goodsInfo;
              this.userinfo = res.data.goodsInfo.userinfo;
          }else{
              this.$message.error(res.message);
              this.$router.back();
          }
        this.loading = false;
      })
  }
};

</script>

<style lang="scss" scoped>

</style>