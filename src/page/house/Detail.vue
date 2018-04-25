<template>
  <div class="">
      <my-search></my-search>
      <div class="box1000">
          <div class="topic_info" v-loading="loading">
              <div class="topic_header flex_row">
                <div class="row_bd">
                    <h3 class="topic_title">{{leaseInfo.title}}</h3>
                    <p class="topic_time">{{leaseInfo.created_at}}</p>
                </div>
                <router-link :to="'/user/'+userinfo.user_id">
                    <div class="topic_avatar flex_row"> 
                        <div class="topic_avatar_wrap">
                            <img :src="host+userinfo.headimgurl" alt="头像">
                        </div>
                        <div class="row_bd">
                            <p class="nickname"><span>{{userinfo.nickname}}</span><i class="icon_sex"></i></p>
                            <p class="school">{{userinfo.nickname}}</p>
                        </div>
                    </div>
                </router-link>
              </div>
              <div class="topic_content">
                  {{leaseInfo.content}}
                  <img class="images"  v-for="(url,index) in leaseInfo.images"  :key="index" :src="host+url" alt="图片">
              </div>
              <div class="topic_btn">
                  <span class="zan" @click="onZanEvent">点赞 {{leaseInfo.thumbup}}</span>
                  <span class="hr">丨</span>
                  <span class="comment">评论 {{leaseInfo.comment}}</span>
              </div>
              <div class="topic_comment"  v-loading="loading2">
                  <div class="comment_item flex_box" v-for="item in commentList" :key="item.comment_id">
                      <div class="comment_avatar">
                          <router-link :to="'/user/'+item.user_id">
                            <img :src="host+item.headimgurl" alt="头像">
                          </router-link>
                      </div>
                      <div class="row_bd">
                          <div class="comment_info">
                              <span class="name">{{item.nickname}}</span>
                              <span class="time">{{item.created_at}}</span>
                          </div>
                          <div class="comment_data">
                              <span class="reply_btn" @click="replyTo(item.comment_id,item.nickname)">回复</span>
                              {{item.content}}
                          </div>
                          <div class="reply_comment">
                              <div  v-for="son in item.sonComments" :key="son.comment_id"><router-link :to="'/user/'+son.user_id">{{son.nickname}}</router-link>：{{son.content}}</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="reply_box">
                  <textarea class="reply_textarea" v-model="comment" :placeholder="placeholder"></textarea>
                  <el-button size="mini" type="success" @click="toReply">发送</el-button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Search from '../../components/common/Search';
import { getLeaseInfo,leaseCommentList,leaseCommentCreate,leaseUnZan,leaseZan } from '../../api/api';
import { mapState } from 'vuex';
export default {
  name: 'HouseDetail',
  components: {
    'my-search': Search
  },
  data() {
    return {
      userinfo:{},
      leaseInfo:{},
      lease_id:'',
      last_id:'',
      comment:'',
      commentList:[],
      placeholder:'评论',
      comment_id:'',
      hasThumbuped:'',
      isPublisher:'',
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
      toReply(){
          if(!this.comment) return;
          leaseCommentCreate({
              comment_id:this.comment_id,
              lease_id:this.lease_id,
              content:this.comment 
          }).then(res=>{
              if(res.code==200){
                  this.leaseInfo.comment = res.data.comments;
                  this.last_id = '';
                  this.getComment();
                  this.comment = '';
                  this.placeholder = '评论';
                  this.$message.success(res.message);
              }
          })
      },
      replyTo(id,name){
        this.comment = '';
        this.comment_id = id;
        this.placeholder = `回复 ${name}：`;
      },
      onZanEvent(){
          if(this.hasThumbuped){
              leaseUnZan({
                  lease_id:this.lease_id
              }).then(res=>{
                  if(res.code==200){
                    this.hasThumbuped = res.data.hasThumbuped;
                    this.leaseInfo.thumbup = res.data.thumbup;
                    this.$message.success(res.message)
                  }
              })
          }else{
              leaseZan({
                  lease_id:this.lease_id
              }).then(res=>{
                  if(res.code==200){
                    this.hasThumbuped = res.data.hasThumbuped;
                    this.leaseInfo.thumbup = res.data.thumbup;
                    this.$message.success(res.message)
                  }
              })
          }
      },
      getComment(){
        if(!this.loading){
            this.loading2 = true;
        }
        leaseCommentList({
            lease_id:this.lease_id,
            last_id:this.last_id
        }).then(res=>{
            if(res.code==200){
                this.commentList = res.data.comments;
                this.last_id = res.data.last_id;
                this.loading2 = false;
            }
        })
      }
  },
  created(){
      this.lease_id = this.$route.params.id;
      this.loading = true;
      getLeaseInfo({
          lease_id:this.$route.params.id,
      }).then(res=>{
        this.leaseInfo = res.data.leaseinfo;
        this.userinfo = res.data.userinfo;
        this.hasThumbuped = res.data.hasThumbuped;
        this.isPublisher = res.data.isPublisher;
        this.loading = false;
      })

      this.getComment();
  }
};

</script>

<style lang="scss" scoped>

</style>