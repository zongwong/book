<template>
<div class="publish nopadding" v-loading="loading">
    <div class="pbbtn_box"><router-link to="/center/publish/2"><span>{{$t('btn.publishnote')}}</span></router-link></div>
    <div class="history_item" v-for="(item,index) in list" :key="item.goods_id">
        <div class="goods_info">
            <div class="goods_imgs">
                <img :src="host+item.images[0]" alt="封面">
            </div>
            <div class="goods_data">
                <p class="title">{{item.title}}</p>
                <p class="desc">{{item.summary}}</p>
                <p class="price">{{item.currency_symbol}} {{item.shop_price}}</p>
            </div>
            <div class="close" @click="onDelGoods(item.goods_id,index)"></div>
            <div class="btn_edit"><router-link :to="'/center/publish/2/'+item.goods_id">{{$t('btn.edit')}}</router-link></div>
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
import { getMyGoods,delGoods } from '../../api/api';
import pagination from '../../components/pagination';
import { mapState } from 'vuex';
export default {
  name: 'Pbnote',
  components: {
      'my-pagination':pagination
  },
  data() {
    return {
        list:[],
        total:1,
        pas:{
            category_id:2,
            // campus_id:2,
            pageno:1
        },
        loading:false
    }
  },
  computed:{
    ...mapState([
        'host'
    ])
  },
  methods: {
      getListData(){
          this.loading = true;
          return new Promise((resolve,reject)=>{
            getMyGoods(this.pas).then(res=>{
                if(res.code==200){
                    this.list = res.data.goodslist;
                    this.total = res.data.maxpage;
                    this.loading = false;
                }else{
                    reject(res)
                }
            })
          })
      },
      onPageChange(pageno){
          this.pageno = pageno;
          this.getListData()
      },
      onDelGoods(id,index){
            this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delGoods({
                    goods_id:id
                }).then(res=>{
                    if(res.code==200){
                        this.list.splice(index,1);
                        this.$message.success(res.message);
                    }else{
                        this.$message.error(res.message);
                    }
                })
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });          
            });

      }
  },
  created(){
      this.getListData()
  }
};

</script>

<style lang="scss" scoped>

</style>