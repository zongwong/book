<template>
  <div class="">
      <my-search></my-search>
      <div class="sort_box">
        <div class="sort_type on">
          按热度排序
          <div class="caret-wrapper">
            <i class="sort-caret ascending on"></i>
            <i class="sort-caret descending"></i>
          </div>
        </div>
        <div class="sort_type">
          按价格排序
          <div class="caret-wrapper">
            <i class="sort-caret ascending"></i>
            <i class="sort-caret descending"></i>
          </div>
        </div>
      </div>
      <div class="container container1000">
        <div class="flex_box">
          
          <div class="good_card" v-for="item in list" :key="item.goods_id">
            <router-link :to="'/goods/'+item.goods_id">
              <div class="good_card-img">
                <img :src="'http://api.dedele.net'+item.post" alt="">
              </div>
              <p class="good_card-title">{{item.title}}</p>
              <p class="good_card-price">￥{{item.shop_price}}</p>
            </router-link>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import Search from '../../components/common/Search';
import { getGoodsList } from '../../api/api';
export default {
  name: 'Book',
  components: {
    'my-search': Search
  },
  computed:{

  },
  data() {
    return {
      list:[]
    };
  },
  created(){
    getGoodsList({
      category_id:1
    }).then(res=>{
      res.data.goodslist.forEach(item => {
        item.post = item.images
      })
      this.list = res.data.goodslist
    })
  }
};

</script>

<style lang="scss" scoped>
.container1000{
  width: 1000px;
  margin: 60px auto;
}
.good_card{
  width: 196px;
  margin-right: 72px;
  .good_card-img{
    height: 258px;
  }
  &:nth-child(4n){
    margin-right: 0;
  }
}
</style>