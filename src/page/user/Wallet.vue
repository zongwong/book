<template>
<div class="publish" v-loading="loading">
    <div class="pbbtn_box" @click="applyMoney"><span>{{$t('btn.withdraw')}}</span></div>

    <p v-for="item in balancelist" :key="item.code">{{item.code}} {{item.amount}}</p>
    <hr>
    <div class="history_item" v-for="item in list" :key="item.cashflow_id">
        <div class="post_item">
          <p>{{item.inorout}}  /  {{item.currency_symbol}}{{item.amount}}   /  {{item.created_at}}</p>
        </div>
    </div>

    <!-- <my-pagination
      :total="total"
      :current-page.sync="pageno"
      @page-change="onPageChange"
    ></my-pagination> -->

    <!-- <el-dialog title="提现申请" :modal="modal" :visible.sync="dialogVisible" width="500px">
        <el-form ref="addressForm" :rules="addressRule" :model="addressForm" label-width="80px">
            <el-form-item label="收件人" prop="name">
                <el-input v-model="addressForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="addressForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="city" prop="city">
                <el-input v-model="addressForm.city"></el-input>
            </el-form-item>
            <el-form-item label="state/省" prop="state">
                <el-input v-model="addressForm.state"></el-input>
            </el-form-item>
            <el-form-item label="country" prop="country">
                <el-input v-model="addressForm.country"></el-input>
            </el-form-item>
            <el-form-item label="收货地址" prop="address">
                <el-input v-model="addressForm.address"></el-input>
            </el-form-item>
            <el-form-item label="default" prop="default">
                <el-switch v-model="addressForm.default"></el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('addressForm')">确 定</el-button>
        </span>
    </el-dialog> -->
</div>
</template>

<script>

import { wallet,walletList,walletApply } from '../../api/api';
import pagination from '../../components/pagination';
import { mapState } from 'vuex';
export default {
  name: 'Wallet',
  components: {
    'my-pagination':pagination
  },
  data() {
    return {
        list:[],
        total:1,
        pageno:1,
        loading:false,
        balancelist:[],
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
          walletList({
            pageno:this.pageno
          }).then(res=>{
              if(res.code==200){
                  this.list = res.data.flowlist;
                  // this.total = res.data.maxpage;
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
    applyMoney(){

    },
    onDelGoods(id,index){
          this.$confirm('此操作将删除该发布, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
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
    wallet().then(res=>{
      this.balancelist = res.data
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