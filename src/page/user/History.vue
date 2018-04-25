<template>
<div class="history" v-loading="loading">
    <div class="history_item" v-for="item in list" :key="item.order_id">
        <div class="goods_info">
            <div class="goods_imgs">
                <img :src="host+item.goods_info.images[0]" alt="封面">
            </div>
            <div class="goods_data">
                <p class="title">{{item.goods_info.title}}</p>
                <p class="desc">{{item.goods_info.summary}}</p>
                <p class="price">{{item.currency_symbol}} {{item.price}}</p>
            </div>
        </div>
        <div class="evaluate_box evaluate_top">      
            <div class="flex_row">
                <div class="evaluate_label evaluate_rate">本次交易评分：</div>
                <div class="row_bd">
                    <el-rate :colors="['#7cd958','#7cd958','#7cd958']" v-model="value1"></el-rate>
                </div>
            </div>
            <div class="flex_row evaluate_word_row">
                <div class="evaluate_label">买家评价：</div>
                <p class="row_bd evaluate_word">
                    气温气温去
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import { evaluateList } from '../../api/api';
import pagination from '../../components/pagination';
import { mapState } from 'vuex';
export default {
  name: 'History',
  components: {
  },
  data() {
    return {
        list:[],
        total:1,
        pageno:1,
        loading:false,
        value1:3
    };
  },
  computed:{
      ...mapState([
          'host'
      ])
  },
  methods:{
    getListData(){
        this.loading = true;
        return new Promise((resolve,reject)=>{
          evaluateList({
            pageno:this.pageno
          }).then(res=>{
              if(res.code==200){
                  this.list = res.data.orderlist;
                  // this.total = res.data.maxpage;
                  this.loading = false;
              }else{
                  reject(res)
              }
          })
        })
    },
  },
  created(){
      this.getListData();
  }
};

</script>

<style lang="scss" scoped>

</style>