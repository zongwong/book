<template>
  <div class="">
      <my-search></my-search>
      <div class="box1000">
          <div class="topic_info" v-loading="loading">
              <div class="topic_header flex_row">
                <div class="row_bd">
                    <h3 class="topic_title">{{postInfo.title}}</h3>
                    <p class="topic_time">{{postInfo.created_at}}</p>
                </div>
                <router-link :to="'/user/'+userinfo.user_id">
                    <div class="topic_avatar flex_row">
                        <div class="topic_avatar_wrap">
                            <img v-if="userinfo.headimgurl" :src="userinfo.headimgurl | headfilter" alt="头像">
                        </div>
                        <div class="row_bd">
                            <p class="nickname"><span>{{userinfo.nickname}}</span><i class="icon_sex"></i></p>
                            <p class="school">{{userinfo.nickname}}</p>
                        </div>
                    </div>
                </router-link>
              </div>
              <div class="topic_content">
                  {{postInfo.content}}
                  <img class="images"  v-for="(url,index) in postInfo.images"  :key="index" :src="url | headfilter" alt="图片">
              </div>
              <div class="topic_btn">
                  <span class="zan" @click="postZan">点赞 {{postInfo.thumbup}}</span>
                  <span class="hr">丨</span>
                  <span class="comment">评论 {{postInfo.comment}}</span>
              </div>
              <div class="topic_comment" v-loading="loading2">
                  <div class="comment_item flex_box" v-for="item in commentList" :key="item.comment_id">
                      <div class="comment_avatar">
                          <img :src="item.headimgurl | headfilter" alt="头像">
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
                              <div  v-for="son in item.sonComments" :key="son.comment_id">{{son.nickname}}：{{son.content}}</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="reply_box">
                  <textarea class="reply_textarea" ref="focus"  v-model="comment" :placeholder="placeholder"></textarea>
                  <el-button size="mini" type="success" @click="toReply">发送</el-button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Search from '../../components/common/Search';
import { groupCommentList,groupCommentCreate,getPostInfo,groupPostZan,groupPostUnZan } from '../../api/api';
import { mapState } from 'vuex';
import headfilter from '../../utils/tools';
export default {
  name: 'PostDetail',
  components: {
    'my-search': Search
  },
  data() {
    return {
      userinfo:{},
      post_id:'',
      last_id:'',
      comment:'',
      commentList:[],
      placeholder:'评论',
      comment_id:'',
      postInfo:{},
      hasThumbuped:0,
      isPublisher:false,
      loading:false,
      loading2:false,
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
      toReply(){
          if(!this.comment) return;
          groupCommentCreate({
              comment_id:this.comment_id,
              post_id:this.post_id,
              content:this.comment 
          }).then(res=>{
              if(res.code==200){
                  this.postInfo.comment = res.data.postComments;
                  this.last_id = '';
                  this.getComment();
                  this.comment = '';
                  this.placeholder = '评论';
                  this.$message.success(res.message);
              }else{
                  this.$message.error(res.message);
              }
          })
      },
      replyTo(id,name){
        this.comment = '';
        this.comment_id = id;
        this.placeholder = `回复 ${name}：`;
        document.documentElement.scrollTop = document.body.offsetHeight - window.innerHeight;
        this.$refs['focus'].focus()
      },
      postZan(){
          if(this.hasThumbuped==0){
              groupPostZan({
                  post_id:this.post_id
              }).then(res=>{
                  if(res.code==200){
                      this.postInfo.thumbup = res.data.thumbup;
                      this.hasThumbuped = res.data.hasThumbuped;
                      this.$message.success(res.message)
                  };
              })
          }else{
              groupPostUnZan({
                  post_id:this.post_id
              }).then(res=>{
                  if(res.code==200){
                      this.postInfo.thumbup = res.data.thumbup;
                      this.hasThumbuped = res.data.hasThumbuped;
                      this.$message.success(res.message)
                  };
              })
          }
      },
      getComment(){
        if(!this.loading){
            this.loading2 = true;
        }
        groupCommentList({
            post_id:this.post_id,
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
      this.post_id = this.$route.params.id;
      this.loading = true;
      getPostInfo({
          post_id:this.$route.params.id,
      }).then(res=>{
        this.postInfo = res.data.postInfo;
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