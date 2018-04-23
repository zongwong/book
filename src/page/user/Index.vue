<template>
<div>
    <my-search></my-search>
    <div class="userInfoBox">
        <div class="avatar">
            <img :src="host+userinfo.graduate_school" alt="avatar">
            <i class="icon_sex"></i>
        </div>
        <p class="name">{{userinfo.nickname}}</p>
        <p>{{userinfo.graduate_school}}</p>
        <div class="tabBar">
            <div class="box1000 flex_row tabs_wrap">
                <div class="tab_item" :class="{on:type==1}" @click="changeType(1)">TA的发布</div>
                <div class="tab_item" :class="{on:type==2}" @click="changeType(2)">TA的卖出</div>
            </div>
        </div>
    </div>
    <div class="box1000">
        <div class="select_box">
            <el-select v-model="category" placeholder="请选择" @change="categoryChange">
                <el-option label="二手书籍" value="1"></el-option>
                <el-option label="二手笔记" value="2"></el-option>
                <el-option label="房屋租赁" value="3"></el-option>
            </el-select>
        </div>
        <div class="list">

        </div>
    </div>
    <div class="box1000 nopadding">
        <div class="history_item" v-for="item in list" :key="item.goods_id">
            <router-link :to="'/goods/'+item.goods_id">
                <div class="goods_info">
                    <div class="goods_imgs">
                        <img :src="host+item.images[0]" alt="封面">
                    </div>
                    <div class="goods_data">
                        <p class="title">{{item.title}}</p>
                        <p class="desc">{{item.summary}}</p>
                        <p class="price">{{item.currency_symbol}}{{item.shop_price}}</p>
                    </div>
                </div>
            </router-link>
        </div>
        <!-- <div class="history_item">
            <div class="post_item">
            <div class="post_user">
                <img src="../../assets/image/book.png" alt="">
            </div>
            <div class="post_data">
                <p class="post_title oneHide">12312312323</p>
                <div class="post_detail">
                <p class="moreHide">qweqweqweqwe空气环境为偶好环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围几千胸围和其吻合器未</p>
                </div>
                <div class="post_other">
                <span>2018-1-12 13:22</span>
                <span class="from"></span>
                <span class="zan">点赞 23</span>
                <span class="hr">丨</span>
                <span class="comment">评论 345</span>
                </div>
            </div>
            </div>
        </div> -->
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
import { getUserInfo } from '../../api/api';
import pagination from '../../components/pagination';
import { mapState,mapActions } from 'vuex';
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
      total:1,
      pageno:1
    };
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
        if(this.type==1){
            this.getBookListData({
                user_id:this.user_id,
                category_id:this.category
            }).then(res=>{
                this.list = res.data.goodslist;
                this.total = res.data.maxpage;
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
</style>