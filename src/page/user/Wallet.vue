<template>
<div class="publish" v-loading="loading">
    <!-- <div class="pbbtn_box" @click="applyMoney"><span>{{$t('btn.withdraw')}}</span></div> -->

    <!-- <p v-for="item in balancelist" :key="item.code" @click="applyMoney(item.code,item.amount)">{{item.code}} {{item.amount}}</p> -->
    <p class="billtitle">{{$t('wallet.balance')}}</p>
    <template v-for="item in balancelist">
        <el-card class="box-card" :key="item.code">
            <div class="clearfix">
                <span>{{item.code}} {{item.amount}}</span>
                <el-button @click="applyMoney(item.code,item.amount)" style="float: right; padding: 3px 0" type="text">{{$t('wallet.withdraw')}}</el-button>
            </div>
        </el-card>
    </template>
    <p class="billtitle">{{$t('wallet.record')}}</p>
    <el-table
      :data="listFilter.data"
      style="width: 100%">
      <el-table-column
        prop="created_at"
        :label="$t('wallet.date')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        :label="$t('wallet.type')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="currency_code"
        :label="$t('wallet.currency')">
      </el-table-column>
      <el-table-column
        prop="amount"
        :label="$t('wallet.money')">
      </el-table-column>
    </el-table>
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
        tableData:[]
      };
  },
  computed:{
    ...mapState([
      'host'
    ]),
    listFilter(){
        let list = this.list
        list.forEach(item=>{
            item.type = this.$t(`wallet.${item.inorout}`)
        })
        return {
            data:list
        };
    }
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
    applyMoney(code,amount){
        if(amount==0) return;
        this.$prompt(`${this.$t('wallet.applyMsg')}${code}${amount}`, this.$t('wallet.apply'), {
          confirmButtonText: this.$t('btn.sure'),
          cancelButtonText: this.$t('btn.cancel'),
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: this.$t('wallet.emailerror'),
          inputPlaceholder:this.$t('wallet.email')
        }).then(({ value }) => {
            
            walletApply({
                amount:amount,
                email:value,
                currency_code:code,
                method:'paypal'
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type: 'success',
                        message: this.$t('wallet.success')
                    });   
                    window.location = window.location.href;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.message
                    });   
                }
            })

        }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '取消输入'
        //   });       
        });
    },
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
.billtitle{
    color: #7cd958;
    padding: 20px 10px;
    font-weight: bold;
    font-size: 18px;
}
</style>