<template>
<div>
    <my-search></my-search>
    <div class="userInfoBox">
        <div class="avatar">
            <img v-if="userinfo.headimgurl" :src="userinfo.headimgurl | headfilter" alt="avatar">
            <i class="icon_sex" :class="{'icon_man':userinfo.sex==1}"></i>
        </div>
        <p class="name">{{userinfo.nickname}}</p>
        <p>{{userinfo.graduate_school}}</p>
        <div class="tabBar">
            <div class="box1000 flex_row tabs_wrap">
                <div class="tab_item" :class="{on:type==1}" @click="changeType(1)">{{$t('show.hispublish')}}</div>
                <div class="tab_item" :class="{on:type==2}" @click="changeType(2)">{{$t('show.hisSale')}}</div>
            </div>
        </div>
    </div>
    <div class="box1000">
        <div class="select_box">
            <el-select v-model="category" placeholder="请选择" @change="categoryChange">
                <el-option :label="$t('navs.book')" value="1"></el-option>
                <el-option :label="$t('navs.notes')" value="2"></el-option>
                <el-option v-if="type==1" :label="$t('navs.house')" value="3"></el-option>
            </el-select>
        </div>
        <!-- <div class="list">

        </div> -->
    </div>
    <div v-if="type==1" class="box1000 nopadding" v-loading="loading" style="min-height:200px;">
        <div class="history_item" v-if="category!=3" v-for="item in list" :key="item.goods_id">
            <router-link :to="'/goods/'+item.goods_id">
                <div class="goods_info">
                    <div class="goods_imgs">
                        <img :src="item.images[0] | headfilter" alt="封面">
                    </div>
                    <div class="goods_data">
                        <p class="title">{{item.title}}</p>
                        <p class="desc">{{item.summary}}</p>
                        <p class="price">{{item.currency_symbol}}{{item.shop_price}}</p>
                    </div>
                </div>
            </router-link>
        </div>
        <div class="history_item" v-if="category==3" v-for="item in list" :key="item.lease_id">
            <router-link :to="'/house/'+item.lease_id">
                <div class="post_item">                    
                    <div class="post_user">
                        <img :src="item.images[0] | headfilter" alt="封面">
                    </div>
                    <div class="post_data">
                        <p class="post_title oneHide">{{item.title}}</p>
                        <div class="post_detail">
                        <p class="moreHide">{{item.content}}</p>
                        </div>
                        <div class="post_other">
                        <span>{{item.created_at}}</span>
                        <span class="from"></span>
                        <span class="zan">点赞 {{item.thumbup}}</span>
                        <span class="hr">丨</span>
                        <span class="comment">评论 {{item.comment}}</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
    <div v-if="type==2" class="box1000 nopadding" v-loading="loading" style="min-height:200px;">
        <div class="history_item" v-for="item in salelist" :key="item.order_id">
            <router-link :to="'/goods/'+item.goods_id">
                <div class="goods_info">
                    <div class="goods_imgs">
                        <img v-if="item.goods_info.images[0]" :src="item.goods_info.images[0] | headfilter" alt="封面">
                    </div>
                    <div class="goods_data">
                        <p class="title">{{item.goods_info.title}}</p>
                        <p class="desc">{{item.goods_info.summary}}</p>
                        <p class="price">{{item.goods_info.currency_symbol}}{{item.goods_info.shop_price}}</p>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
    <my-pagination
      :total="total"
      :current-page.sync="pageno"
      @page-change="onPageChange"
    ></my-pagination>
</div>
</template>

<script>
import Search from '../../components/common/Search';
import { getUserInfo,getLeaseList,salelist } from '../../api/api';
import pagination from '../../components/pagination';
import { mapState,mapActions } from 'vuex';
import headfilter from '../../utils/tools';
import config from '../../utils/global';
export default {
  name: 'UserIndex',
  components: {
    'my-search': Search,
    'my-pagination': pagination
  },
  data() {
    return {
      userinfo: {},
      type:1,
      category:'1',
      user_id:'',
      list:[],
      salelist:[],
      total:1,
      pageno:1,
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
  methods:{
      ...mapActions([
          'getBookListData'
      ]),
      changeType(type){
          this.type = type;
          this.pageno = 1;
          this.getListData();
      },
      categoryChange(val){
          this.category = val;
          this.pageno = 1;
          this.getListData();
      },
      getListData(){
        this.loading = true;
        if(this.type == 1){ //他的发布
            if(this.category==3){
                // 租赁
                getLeaseList({
                    user_id:this.user_id,
                    pageno:this.pageno
                }).then(res=>{
                    if(res.code==200){
                        this.list = res.data.leaseList;
                        this.total = res.data.maxpage;
                        this.loading = false;
                    }
                })
            }else{
                // 商品    
                this.getBookListData({
                    user_id:this.user_id,
                    category_id:this.category,
                    pageno:this.pageno
                }).then(res=>{
                    this.list = res.data.goodslist;
                    this.total = res.data.maxpage;
                    this.loading = false;
                })
            }
        }else if(this.type==2){ // 他的卖出
            this.$http.get(config.host+'/mall/order/salelist',{
                params:{
                    user_id:this.user_id,
                    category_id:this.category,
                    pageno:this.pageno
                }
            }).then(res=>{
                this.salelist = res.data.data.orderlist;
                this.total = res.data.data.maxpage;
                this.loading = false;
            })
        }
      },
      onPageChange(pageno){
          this.pageno = pageno;
          this.getListData();
      }
  },
  created(){
      this.user_id = this.$route.params.id;
      getUserInfo({
          user_id:this.user_id
      }).then(res=>{
          if(res.code==200){
              this.userinfo = res.data.userinfo;
          }
      })
      this.getListData()
  }
};

</script>

<style lang="scss" scoped>


.tabBar{
    margin: 40px 0 28px;
    background: #f9f9f9; 
}
.tab_item{
    width: 155px;
    line-height: 68px;
    text-align: center;
    margin: 0 180px;
    font-size: 17px;
    cursor: pointer;
    &.on{
        color: #7cd958;
        border-bottom: 2px solid #7cd958;
    }
}
.tabs_wrap{
    justify-content: space-around;
}
.select_box{
    text-align: right;
    margin-bottom: 14px;
}
.history_item .goods_info .goods_data .title{
    max-width: 800px;
}
</style>