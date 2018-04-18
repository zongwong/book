<template>
<div class="publish nopadding">
    <div class="pbbtn_box"><router-link to="/center/publishbook"><span>发布二手笔记</span></router-link></div>
    <div class="history_item">
        <div class="goods_info" v-for="item in myBooks" :key="item.goods_id">
            <div class="goods_imgs">
                <img src="../../assets/image/book.png" alt="">
            </div>
            <div class="goods_data">
                <p class="title">{{item.title}}</p>
                <p class="desc">1231231223qweqweqweqweqwe</p>
                <p class="price">￥20.00</p>
            </div>
            <div class="close"></div>
            <div class="btn_edit"><router-link :to="'/center/publishbook/'+item.goods_id">编辑</router-link></div>
        </div>
    </div>
</div>
</template>

<script>
import { getMyGoods } from '../../api/api';

export default {
  name: 'Pbbook',
  components: {
  },
  data() {
    return {
        myBooks:[]
    }
  },
  created(){
      getMyGoods({
          category_id:1,
          token:this.$store.state.token
      }).then(res=>{
          if(res.code==200){
              this.myBooks = res.data.goodslist
          }
      })
  }
};

</script>

<style lang="scss" scoped>

</style>