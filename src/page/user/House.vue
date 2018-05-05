<template>
<div class="publish" v-loading="loading">
    <div class="pbbtn_box"><router-link to="/center/publishhouse"><span>{{$t('btn.publishlease')}}</span></router-link></div>
    <div class="history_item" v-for="(item,index) in list" :key="item.lease_id">
        <div class="post_item">
          <router-link :to="'/house/'+item.lease_id">
            <div class="post_user">
              <img :src="host+item.images[0]" alt="封面">
            </div>
          </router-link>
          <div class="post_data">
            <router-link :to="'/house/'+item.lease_id"><p class="post_title oneHide">{{item.title}}</p></router-link>
            <div class="post_detail">
              <div class="content moreHide">{{item.content}}</div>
            </div>
            <div class="post_other">
              <span>{{item.created_at}}</span>
              <span class="from"></span>
              <!-- <span class="zan">点赞 {{item.thumbup}}</span> -->
              <!-- <span class="hr">丨</span> -->
              <div class="btn_edit"><router-link :to="'/center/publishhouse/'+item.lease_id">{{$t('btn.edit')}}</router-link></div>
            </div>
          </div>
          <div class="close" @click="onDelGoods(item.lease_id,index)"></div>
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

import { myLeaseList,delLease } from '../../api/api';
import pagination from '../../components/pagination';
import { mapState } from 'vuex';
export default {
  name: 'Pbhouse',
  components: {
    'my-pagination':pagination
  },
  data() {
    return {
        list:[],
        total:1,
        pageno:1,
        loading:false,
      };
  },
  computed:{
    ...mapState([
      'host'
    ])
  },
  methods:{
    getListData(){
        this.loading = true;
        return new Promise((resolve,reject)=>{
          myLeaseList({
            pageno:this.pageno
          }).then(res=>{
              if(res.code==200){
                  this.list = res.data.leaseList;
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
          this.$confirm(this.$t('msg.delPost'), this.$t('btn.tips'), {
              confirmButtonText: this.$t('btn.sure'),
              cancelButtonText: this.$t('btn.cancel'),
              type: 'warning'
          }).then(() => {
              delLease({
                  lease_id:id
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