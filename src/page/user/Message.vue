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
                              <span class="reply_btn" @click="replyTo(item.comment_id,item.fromuser.nickname)">{{$t('show.reply')}}</span>
                              {{item.commentinfo.content}}
                          </div>
                      </div>
                  </div>
            </div>

</div>
</template>

<script>
import { msgList,msgDel } from '../../api/api';
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
      replyTo(){

      }
  },
  created(){
     this.getListData();
  }
};

</script>

<style lang="scss" scoped>
.publish .btn_edit{
    position: relative;
    margin-left: 20px;
    cursor: pointer;
}
.btnsBox{
    text-align: right;
}
.defaultAdr{
    color: #7cd958;
    cursor: pointer;
}
</style>