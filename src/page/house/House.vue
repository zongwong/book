<template>
  <div>
      <my-search></my-search>  
      <div class="post_box">
        <div class="post_item" v-for="item in list" :key="item.lease_id">
          <div class="post_user">
            <router-link :to="'/user/'+item.userinfo.user_id">
            <img :src="host+item.userinfo.headimgurl" alt="用户头像">
            <p class="name oneHide">{{item.userinfo.nickname}}</p>
            </router-link>
          </div>
          <div class="post_data">
            <router-link :to="'/house/'+item.lease_id">
              <p class="post_title oneHide">{{item.address}}</p>
              <div class="post_detail">
                <img src="../../assets/image/book.png" alt="封面">
                <p class="moreHide">{{item.content}}</p>
              </div>
              <div class="post_other">
                <span class="from">{{item.updated_at}}</span>
                <!-- <span class="from">来自 陈琳达</span> -->
                <span class="zan">点赞 23</span>
                <span class="hr">丨</span>
                <span class="comment">评论 345</span>
              </div>
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
import { getLeaseList } from '../../api/api';
import { mapState,mapActions } from 'vuex';
export default {
  name: 'House',
  components: {
    'my-search': Search,
    'my-pagination': Pagination
  },
  data() {
    return {
      list:[],
      total:1,
      pas:{
        orderby:'click',
        sort:'desc',
        campus_id:'',
        category_id:1,
        pageno:1,
      }
    };
  },
  computed:{
    ...mapState([
      'host'
    ])
  },
  methods:{
    getListData(){
      return new Promise((resolve,reject)=>{
        getLeaseList(this.pas).then(res=>{
          if(res.code==200){
            this.list = res.data.leaseList;
            this.total = res.data.maxpage;
            resolve(res.data);
          }else{
            reject(res);
          }
        })
      })
    },
    onPageChange(currentPage){
      this.pas.pageno = currentPage;
      this.getListData();
    }
  },
  created(){
    this.getListData();
  }
};

</script>

<style lang="scss" scoped>
.post_box{
  margin-bottom: 40px;
}
.post_other .from{
  margin-left: 0;
}

</style>