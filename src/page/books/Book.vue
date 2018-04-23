<template>
  <div class="">
      <my-search></my-search>
      <div class="sort_box">
        <div class="sort_type" :class="{on:pas.orderby=='click'}" @click="onOrderByChange('click')">
          按热度排序
          <div class="caret-wrapper">
            <i class="sort-caret ascending" :class="{on:pas.orderby=='click'&&pas.sort=='desc'}" @click.stop="onSortChange('desc')"></i>
            <i class="sort-caret descending" :class="{on:pas.orderby=='click'&&pas.sort=='asc'}" @click.stop="onSortChange('asc')"></i>
          </div>
        </div>
        <div class="sort_type" :class="{on:pas.orderby=='price'}" @click="onOrderByChange('price')">
          按价格排序
          <div class="caret-wrapper">
            <i class="sort-caret ascending" :class="{on:pas.orderby=='price'&&pas.sort=='desc'}" @click.stop="onSortChange('desc')"></i>
            <i class="sort-caret descending" :class="{on:pas.orderby=='price'&&pas.sort=='asc'}" @click.stop="onSortChange('asc')"></i>
          </div>
        </div>
      </div>
      <div class="container container1000">
        <div class="flex_box">
          
          <div class="good_card" v-for="item in list" :key="item.goods_id">
            <router-link :to="'/goods/'+item.goods_id">
              <div class="good_card-img">
                <img :src="host+item.images[0]" alt="商品封面">
              </div>
              <p class="good_card-title oneHide">{{item.title}}</p>
              <p class="good_card-price">￥{{item.shop_price}}</p>
            </router-link>
          </div>

        </div>
      </div>
      <my-pagination
        :total="total"
        :current-page.sync="pas.pageno"
        @page-change="onPageChange"
      ></my-pagination>
  </div>
</template>

<script>
import Search from '../../components/common/Search';
import Pagination from '../../components/pagination';
import { mapState,mapMutations, mapActions } from 'vuex';
import { getGoodsList } from '../../api/api';
export default {
  name: 'Book',
  components: {
    'my-search': Search,
    'my-pagination': Pagination
  },
  computed:{
   
  },
  data() {
    return {
      list:[],
      total:1,
      pas:{
        orderby:'click',
        sort:'desc',
        // campus_id:this.nowCampu.campus_id,
        category_id:1,
        pageno:1,
      }
    };
  },
  computed:{
    ...mapState([
      'host',
      'nowCampu'
    ])
  },
  watch:{
    nowCampu(){
      this.pas.campus_id = this.nowCampu.campus_id || '';
      this.pas.pageno = 1;
      this.getListData();
    }
  },
  methods:{
    ...mapMutations([
      'Login_MUTATION'
    ]),
    ...mapActions([
      'getBookListData'
    ]),
    onPageChange(currentPage){
      this.pas.pageno = currentPage;
      this.getListData();
    },
    getListData() {
      // orderby 排序依据] 热度click 价格 price
      // [sort 排序方式] asc 升序 desc 降序
      // 默认以id降序排序
      // [campus_id]校区id
      this.pas.campus_id = this.nowCampu.campus_id || '';
      this.getBookListData(this.pas).then(res=>{
        this.list = res.data.goodslist;
        this.total = res.data.maxpage;
      })
    },
    onOrderByChange(type){
      if(this.pas.orderby === type){
        this.pas.sort = this.pas.sort==='desc'?'asc':'desc';
      }else{
        this.pas.orderby = type;
      }
      this.pas.pageno = 1;
      this.getListData();
    },
    onSortChange(type){
      this.pas.sort = type;
      this.pas.pageno = 1;
      this.getListData();
    },
  },
  created(){
    this.getListData()
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