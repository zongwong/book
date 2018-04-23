<template>
  <div class="">
      <my-search></my-search>
      <div v-loading="loading">
        <div class="cm_box">
            <div class="box1000">
                <div class="topic_info cm_info" >
                    <div class="topic_header flex_row">
                        <div class="row_bd flex_row cm_data">
                            <img :src="host+info.headimgurl">
                            <div class="row_bd cm_content">
                                <p class="title oneHide">{{info.title}}</p>
                                <p class="desc moreHide">{{info.summary}}</p>
                            </div>
                        </div>
                        <router-link :to="'/user/'+userinfo.user_id">
                            <div class="topic_avatar flex_row">
                                <div class="topic_avatar_wrap">
                                    <img :src="host+userinfo.headimgurl" alt="头像">
                                </div>
                                <div class="">
                                    <p class="nickname"><span>{{userinfo.nickname}}</span><i class="icon_sex"></i></p>
                                    <p class="manger">管理员</p>
                                </div>
                            </div>
                        </router-link>
                    </div>   
                </div>
            </div>
        </div>
        <div class="box1000">
            <div style="margin-bottom:70px;" v-loading="loading2">
                
                <div class="post_item" v-for="item in postList" :key="item.post_id">
                    <router-link :to="'/user/'+item.userinfo.user_id">
                        <div class="post_user">
                            <img :src="host+item.userinfo.headimgurl" alt="头像">
                            <p class="name oneHide">{{item.userinfo.nickname}}</p>
                        </div>
                    </router-link>
                    <div class="post_data">
                        <router-link :to="'/community/post/'+item.post_id">
                            <p class="post_title oneHide">{{item.title}}</p>
                            <div class="post_detail">
                            <img :src="host+item.images[0]" alt="封面">
                            <p class="moreHide">{{item.content}}</p>
                            </div>
                            <div class="post_other">
                            <span class="from" style="margin-left:0;">{{item.created_at}}</span>
                            <!-- <span class="from">来自 陈琳达</span> -->
                            <span class="zan">点赞 {{item.thumbup}}</span>
                            <span class="hr">丨</span>
                            <span class="comment">评论 {{item.comment}}</span>
                            </div>
                        </router-link>
                    </div>
                    
                </div>
            </div>


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
import pagination from '../../components/pagination';
import { getgroupInfo,groupPostList } from '../../api/api';
import { mapState } from 'vuex';
export default {
  name: 'CommunityDetail',
  components: {
    'my-search': Search,
    'my-pagination':pagination
  },
  data() {
    return {
      info: {},
      userinfo:{},
      id:'',
      postList:[],
      total:1,
      pageno:1,
      loading:false,
      loading2:false
    };
  },
  computed:{
      ...mapState([
          'host'
      ])
  },
  methods:{
      onPageChange(){
        this.pageno = currentPage;
        this.getListData();
      },
      getListData(){
        if(!this.loading){
            this.loading2 = true;
        }
        groupPostList({
            association_id:this.id,
            pageno:this.pageno
        }).then(res=>{
            if(res.code==200){
                this.postList = res.data.postlist;
                this.total = res.data.maxpage;
                this.loading2 = false;
            }
        })
      }
  },
  created(){
      this.id = this.$route.params.id;
      this.loading = true;
      getgroupInfo({
          association_id:this.id
      }).then(res=>{
          if(res.code==200){
              this.info = res.data.associationInfo;
              this.userinfo = res.data.associationInfo.userinfo;
              this.loading = false;
          }
      })

      this.getListData();
  }
};

</script>

<style lang="scss" scoped>
.cm_box{
    border-bottom: 1px solid #7cd958;
}
.cm_info{
    .topic_avatar{
        width: 270px;
        background: #f8f8f8;
        padding-bottom: 30px;
        padding-top:30px; 
        justify-content: center;
    }
    .manger{
        color: #7cd958;
        font-size: 13px;
    }
    .cm_data{
        img{
            width: 132px;
            height: 132px;
            display: block;
            margin-right: 24px;
        }
        .cm_content{
            height: 132px;
            padding-right: 20px;
            .title{
                font-size: 25px;
                max-width: 570px;
                margin: 8px 0 12px;
            }
            .desc{
                color: #7d7d7d;
                font-size: 16px;
            }
        }

    }
}

</style>