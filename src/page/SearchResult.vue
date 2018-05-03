<template>
  <div class="">
      <my-search></my-search>
      <p class="searchTitle">{{$t('show.result')}}</p>
      <div v-if="list.length>0" class="container container1000" v-loading="loading">
        <div class="flex_box">
          
          <div class="good_card" v-for="item in list" :key="item.goods_id">
            <router-link :to="'/goods/'+item.goods_id">
              <div class="good_card-img">
                <img :src="host+item.images[0]" alt="商品封面">
              </div>
              <p class="good_card-title oneHide">{{item.title}}</p>
              <p class="good_card-price">{{item.currency_symbol}} {{item.shop_price}}</p>
            </router-link>
          </div>

        </div>
      </div>

      <div v-if="postList.length>0" class="post_box" v-loading="loading">
        <div class="post_item" v-for="item in postList" :key="item.lease_id">
          <div class="post_user">
            <router-link :to="'/user/'+item.userinfo.user_id">
            <img :src="item.userinfo.headimgurl | headfilter" alt="用户头像">
            <p class="name oneHide">{{item.userinfo.nickname}}</p>
            </router-link>
          </div>
          <div class="post_data">
            <router-link :to="'/house/'+item.lease_id">
              <p class="post_title oneHide">{{item.title}}</p>
              <div class="post_detail">
                <img :src="item.images[0] | headfilter" alt="封面">
                <p class="moreHide">{{item.content}}</p>
              </div>
              <div class="post_other">
                <span class="from">{{item.updated_at}}</span>
                <span class="zan">{{$t('show.zan')}} {{item.thumbup}}</span>
                <span class="hr">丨</span>
                <span class="comment">{{$t('show.comment')}} {{item.comment}}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- <my-pagination
        :total="total"
        :current-page.sync="pas.pageno"
        @page-change="onPageChange"
      ></my-pagination> -->

  </div>
</template>

<script>
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Search from '../components/common/Search';
import Pagination from '../components/pagination';
import { mapState,mapMutations, mapActions } from 'vuex';
import { searchGoods,getLeaseList,groupPostList } from '../api/api';
import headfilter from '../utils/tools';
export default {
  name: 'SearchResult',
  components: {
    'my-search': Search,
    'my-pagination': Pagination,
    'my-header': Header,
    'my-footer': Footer,
  },
  filters:{
    headfilter
  },
  computed:{
   
  },
  data() {
    return {
      list:[],
      postList:[],
      postList2:[],
      loading:false,
      total:1,
      pas:{
        // orderby:'click',
        // sort:'desc',
        // campus_id:this.nowCampu.campus_id,
        // category_id:1,
        pageno:1,
        q:''
      },      
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
      // this.pas.campus_id = this.nowCampu.campus_id || '';
      this.pas.pageno = 1;
      this.getListData();
    },
    '$route'(to, from){
      this.pas.q = to.query.word;
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
      this.loading = true;
      searchGoods(this.pas).then(res=>{
        this.list = res.data.goodslist;
        this.total = res.data.maxpage;
        this.loading = false;
      })
    },
    onGetLeaseList(){
      getLeaseList(this.pas).then(res=>{
        this.postList = this.postList.concat(res.data.leaseList);
      })
    },
    onGetPostInfo(){
      groupPostList(this.pas).then(res=>{
        this.postList2 = this.postList2.concat(res.data.leaseList);
      })
    }
  },
  created(){
    this.pas.q = this.$route.query.word;
    this.getListData();
    this.onGetLeaseList();
    this.onGetPostInfo();
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
.searchTitle{
  text-align: center;
  color: #7cd958;
  margin-top: 30px;
  font-size: 28px;
  font-weight: bold;
}
.post_box{
  margin-bottom: 40px;
  min-height: 200px;
}
.post_other .from{
  margin-left: 0;
}
.post_title{
  max-width: 900px;
}
.post_detail{
  .moreHide{
    width: 760px;
  }
}
</style>