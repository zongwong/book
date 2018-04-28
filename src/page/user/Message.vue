<template>
<div class="publish nopadding" v-loading="loading">
    <!-- <div class="pbbtn_box"><span @click="addressFormOpen">新增地址</span></div> -->
    <div class="history_item" v-for="(item,index) in list" :key="item.address_id">
        <div class="goods_info" >
            <div class="goods_data">
                <p class="desc">收件人：{{item.recipients}} - {{item.mobilephone}}</p>
                <p class="desc">详细地址：{{item.detail}} / {{item.city}} / {{item.province}} / {{item.country}}</p>
            </div>
            <div class="close"></div>
        </div>
        <div class="btnsBox">
            <span class="defaultAdr" @click="setDefault(item)"><i v-if="item.is_default==1" class="el-icon-success"></i>设置默认</span><span @click="editAdr(item.address_id,index)" class="btn_edit">编辑</span>
        </div>
    </div>

</div>
</template>

<script>
import { msgList,msgDel } from '../../api/api';
import pagination from '../../components/pagination';
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