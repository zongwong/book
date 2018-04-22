<template>
<div class="publish">
    <div class="pbbtn_box"><router-link to="/center/publishhouse"><span>发布租赁</span></router-link></div>
    <div class="history_item" v-for="item in list" :key="item.lease_id">
        <div class="post_item">
          <div class="post_user">
            <img src="../../assets/image/book.png" alt="">
          </div>
          <div class="post_data">
            <p class="post_title oneHide">{{item.address}}</p>
            <div class="post_detail">
              <p class="moreHide">{{item.content}}</p>
            </div>
            <div class="post_other">
              <span>{{item.created_at}}</span>
              <span class="from"></span>
              <span class="zan">点赞 {{item.comment}}</span>
              <span class="hr">丨</span>
              <span class="comment">评论 345</span>
            </div>
          </div>
          <div class="close"></div>
          <!-- <div class="btn_edit">编辑</div> -->
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

import { myLeaseList } from '../../api/api';
import pagination from '../../components/pagination';
export default {
  name: 'Pbhouse',
  components: {
    'my-pagination':pagination
  },
  data() {
    return {
        list:[],
        total:1,
        pageno:1
      };
  },
  methods:{
    getListData(){
        return new Promise((resolve,reject)=>{
          myLeaseList({
            pageno:this.pageno
          }).then(res=>{
              if(res.code==200){
                  this.list = res.data.leaseList;
                  this.total = res.data.maxpage
              }else{
                  reject(res)
              }
          })
        })
    },
    onPageChange(pageno){
      this.pageno = pageno;
      this.getListData()
    }
  },
  created(){
    this.getListData()
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