<template>
<div class="publish nopadding">
    <div class="pbbtn_box"><router-link to="/center/publish?category_id=1"><span>发布二手书籍</span></router-link></div>
    <div class="history_item">
        <div class="goods_info" v-for="item in list" :key="item.goods_id">
            <div class="goods_imgs">
                <img src="../../assets/image/book.png" alt="">
            </div>
            <div class="goods_data">
                <p class="title">{{item.title}}</p>
                <p class="desc">1231231223qweqweqweqweqwe</p>
                <p class="price">￥20.00</p>
            </div>
            <div class="close"></div>
            <div class="btn_edit"><router-link :to="'/center/publish/'+item.goods_id">编辑</router-link></div>
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
import { getMyGoods } from '../../api/api';
import pagination from '../../components/pagination';
export default {
  name: 'Pbbook',
  components: {
      'my-pagination':pagination
  },
  data() {
    return {
        list:[],
        total:1,
        pas:{
            category_id:1,
            // campus_id:2,
            pageno:1
        }
    }
  },
  methods: {
      getListData(){
          return new Promise((resolve,reject)=>{
            getMyGoods(this.pas).then(res=>{
                if(res.code==200){
                    this.list = res.data.goodslist;
                    this.total = res.data.maxpage
                }else{
                    reject(res)
                }
            })
          })
      },
      onPageChange(pageno){
          this.pageno = pageno;
          this.getListData()
      }
  },
  created(){
      this.getListData()
  }
};

</script>

<style lang="scss" scoped>

</style>