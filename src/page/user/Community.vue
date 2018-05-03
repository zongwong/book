<template>
<div class="publish" v-loading="loading">
    <div class="pbbtn_box"><router-link to="/center/publishpost"><span>{{$t('btn.publishpost')}}</span></router-link></div>
    <div class="history_item" v-for="(item,index) in list" :key="item.post_id">
        <div class="post_item">
          <router-link :to="'/community/post/'+item.post_id">
            <div class="post_user">
              <img :src="host+item.images[0]" alt="封面">
            </div>
          </router-link>
          <div class="post_data">
            <router-link :to="'/community/post/'+item.post_id"><p class="post_title oneHide">{{item.title}}</p></router-link>
            <div class="post_detail">
              <div class="content moreHide">{{item.content}}</div>
            </div>
            <div class="post_other">
              <span>{{item.created_at}}</span>
              <span class="from"></span>
              <!-- <span class="zan">点赞 {{item.thumbup}}</span> -->
              <!-- <span class="hr">丨</span> -->
              <div class="btn_edit"><router-link :to="'/center/publishpost/'+item.post_id">{{$t('btn.edit')}}</router-link></div>
            </div>
          </div>
          <div class="close" @click="onDelGoods(item.post_id,index)"></div>
          <!-- <div class="btn_edit">编辑</div> -->
        </div>
    </div>
    <div v-if="noCreate">
      <span>请先填写社团信息</span>
    </div>
    <div v-if="!noCreate">
      <my-pagination
          :total="total"
          :current-page.sync="pageno"
          @page-change="onPageChange"
        ></my-pagination>
    </div>
</div>
</template>

<script>

import { myPostList,delgroupPost,myGroupList } from '../../api/api';
import pagination from '../../components/pagination';
import { mapState } from 'vuex';
export default {
  name: 'PbCommunity',
  components: {
    'my-pagination':pagination
  },
  data() {
    return {
        list:[],
        total:1,
        pageno:1,
        loading:false,
        noCreate:false,
        mygroup_id:''
      };
  },
  // beforeRouteEnter (to, from, next) {
  //   if(this.noCreate){
  //     this.$message.error('请先填写社团资料')
  //     next({
  //       path:'/center/info'
  //     })
  //   }else{
  //     next();
  //   }
  // },
  computed:{
    ...mapState([
      'host'
    ])
  },
  methods:{
    getListData(){
        this.loading = true;
        return new Promise((resolve,reject)=>{
          myPostList({
            pageno:this.pageno
          }).then(res=>{
              if(res.code==200){
                  this.list = res.data.postlist;
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
          this.$confirm('此操作将删除该发布, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              delgroupPost({
                  post_id:id
              }).then(res=>{
                  if(res.code==200){
                      this.list.splice(index,1);
                      this.$message.success(res.message);
                  }else{
                      this.$message.error(res.message);
                  }
              })
          })

    }
  },
  created(){

    myGroupList().then(res=>{
      if(res.code==200){
        if(res.data.associations.length){
          this.mygroup_id = res.data.associations[0].association_id;
          this.getListData()
        }else{
          this.noCreate = true;
          this.$message.error('请先填写社团资料,才能发帖');
          this.$router.push({
            path:'/center/info'
          })
        }
      }
    })
  }
};

</script>

<style lang="scss" scoped>
.form_title{
    margin-bottom: 20px;
    .text{
        color: #7cd958;
        margin-right: 8px;
        font-size: 20px;
    }
    .hr{
        background: #7cd958;
        height: 1px;
    }
    .btn_save{
        background: #7cd958;
        color: #fff;
        border-radius: 50px;
        line-height: 30px;
        padding: 0 20px;
    }
}
</style>