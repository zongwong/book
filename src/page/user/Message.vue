<template>
<div class="publish nopadding" v-loading="loading">
    <!-- <div class="pbbtn_box"><span @click="addressFormOpen">新增地址</span></div> -->
            <div class="topic_comment">
                  <div class="comment_item flex_box" v-for="item in list" :key="item.message_id">
                      <div class="comment_avatar">
                          <img :src="item.fromuser.headimgurl | headfilter" alt="头像">
                      </div>
                      <div class="row_bd">
                          <div class="comment_info">
                              <span class="name">{{item.fromuser.nickname}}</span>
                              <span class="time">{{item.created_at}}</span>
                          </div>
                          <div class="comment_data">
                              <span class="reply_btn" @click="replyTo(item.module,item.commentinfo.post_id||item.commentinfo.lease_id,item.comment_id,item.commentinfo.to_id,item.fromuser.nickname)">{{$t('show.reply')}}</span>
                              {{item.commentinfo.content}}
                          </div>
                      </div>
                      <div class="close" @click="delMsg(item.message_id)"></div>
                  </div>
            </div>

</div>
</template>

<script>
import { msgList,msgDel,groupCommentCreate,leaseCommentCreate } from '../../api/api';
import pagination from '../../components/pagination';
import headfilter from '../../utils/tools';
export default {
  name: 'Message',
  components: {
  },
  data() {
    return {
        list:[],
        total:1,
        pas:{
            pageno:1
        },
        dialogVisible:false,
        loading:false,
    }
  },
  filters: {
      headfilter
  },
  methods: {
      getListData(){
          this.loading = true;
          return new Promise((resolve,reject)=>{
            msgList(this.pas).then(res=>{
                if(res.code==200){
                    this.list = res.data.messagelist;
                    // this.total = res.data.maxpage;
                    this.loading = false;
                }else{
                    reject(res)
                }
            })
          })
      },
      replyTo(type,id,cid,tid,name){

        

        this.$prompt('Say Something', this.$t('form.replytips')+name, {
          confirmButtonText: this.$t('btn.sure'),
          cancelButtonText: this.$t('btn.cancel'),
          inputPattern: /\S/,
          inputErrorMessage: this.$t('valid.content')
        }).then(({ value }) => {
          let params = {
            content:value,
            comment_id:tid==0?cid:tid
          }
          params[type+'_id'] = id;
          if(type=='post'){
            groupCommentCreate(params).then(res=>{
                if(res.code==200){
                    this.$message.success(res.message);
                }
            })
          }else{
            leaseCommentCreate(params).then(res=>{
                if(res.code==200){
                    this.$message.success(res.message);
                }
            })
          }

        }).catch(() => {
              
        });
      },
      delMsg(id){
        this.$confirm(this.$t('msg.delOrder'), this.$t('btn.tips'), {
            confirmButtonText: this.$t('btn.sure'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
        }).then(() => {
            msgDel({
                message_id:id,
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type: 'success',
                        message: 'success'
                    });
                    this.getListData();
                }
            })
        }).catch(() => {
        
        });
      }
  },
  created(){
     this.getListData();
  }
};

</script>

<style lang="scss" scoped>
.comment_item{
    background: none;
    position: relative;
    padding: 0 0 30px 0;
    border-bottom:1px solid #e5e5e5;
    margin-top: 30px;
    &:first-child{
        margin-top: 0;
    }
}
.comment_info{
    margin-top: 0;
}
</style>