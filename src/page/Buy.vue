<template>
<div>
  <my-search></my-search>
  <div class="buy" v-loading="loading">
      <div class="box1000">
          <div class="goods_info">
              <div class="goods_imgs">
                  <img :src="goodsInfo.post" alt="封面">
              </div>
              <div class="goods_data">
                  <p class="title">{{goodsInfo.title}}</p>
                  <p class="desc">{{goodsInfo.summary}}</p>
                  <p class="price">{{goodsInfo.currency_symbol}} {{goodsInfo.shop_price}}</p>
              </div>
          </div>
      </div>
  </div>
  <div class="box1000">
    <div class="address">
        <p>收件人：{{defaultAddress.recipients}}</p>
        <p>手机：{{defaultAddress.mobilephone}}</p>
        <p>详细地址：{{defaultAddress.detail}} / {{defaultAddress.city}} / {{defaultAddress.province}} / {{defaultAddress.country}}</p>
    </div>
    <p class="pay_title">付款方式</p>
    <div class="pay_box">
        <span @click="selectPayType('zfb')" :class="{on:payType=='zfb'}"><i class="icon icon_zfb"></i>支付宝</span>
        <span @click="selectPayType('wx')" :class="{on:payType=='wx'}"><i class="icon icon_wx"></i>微信</span>
        <span @click="selectPayType('paypal')" :class="{on:payType=='paypal'}"><i class="icon icon_card"></i>PayPal</span>
    </div>
    <div class="btns">
        <el-button size="small" round>取消订单</el-button>
        <el-button size="small" type="success" round @click="makeOrder">立即付款</el-button>
    </div>
  </div>
  <!-- <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <my-address></my-address>
  </el-dialog> -->
  
</div>
</template>

<script>
import Search from '../components/common/Search';
import { getGoodsInfo,createOrder,deleteOrder,payPal,addressList } from '../api/api';
import address from '../page/address/address';
import { mapState } from 'vuex';
export default {
  name: 'Buy',
  components: {
    'my-search': Search,
    'my-address':address
  },
  data() {
    return {
      dialogTableVisible:true,
      goodsInfo:{},
      userinfo:{},
      orderInfo:{},
      defaultAddress:{},
      payType:'paypal',
      loading:false
    }
  },
  computed:{
    ...mapState([
        'host'
    ])
  },
  methods:{
      selectPayType(type){
          this.payType = type;
      },
      makeOrder(){
          createOrder({
              address_id:this.defaultAddress.address_id,
              goods_id:this.goodsInfo.goods_id
          }).then(res=>{
              if(res.code==200){
                  return res.data.order_id 
              }else{
                  this.$alert(res.message, {
                    confirmButtonText: '确定',
                    callback: action => {
                        // this.$message({
                        // type: 'info',
                        // message: `action: ${ action }`
                        // });
                    }
                });
              }
          }).then(res=>{
              alert(res);
              payPal({
                  order_id:res
              }).then(ret=>{
                  window.open(ret.data.approval_link);
              })
          })
      }
  },
  created(){
      this.loading = true;
      getGoodsInfo({
        goods_id:this.$route.params.id,
      }).then(res=>{
        this.goodsInfo = res.data.goodsInfo;
        this.userinfo = res.data.goodsInfo.userinfo;
        this.$set(this.goodsInfo,'post',this.host+res.data.goodsInfo.images[0]);
      });
      addressList(this.pas).then(res=>{
        if(res.code==200){
            const defaddr = res.data.addresslist.filter(item=>{
                return item.is_default == 1
            });
            if(defaddr.length){
                this.defaultAddress = defaddr[0]
            }
            this.loading = false;
        }
      })
  }
};

</script>

<style lang="scss" scoped>
.buy{
    border-bottom: 1px solid #7cd958;
}
.address{
    margin-top: 60px;
    background: #f7f7f7;
    padding: 24px 30px;
    color: #7d7d7d;
    font-size: 20px;
    line-height: 1.8;
}
.pay_title{
    color: #7cd958;
    margin: 30px 0 20px;
}
.pay_box{
    padding-bottom: 50px;
    border-bottom: 1px solid #eee;
    span{
        display: inline-block;
        padding: 8px 40px;
        border: 1px solid #dcdcdc;
        text-align: center;
        color: #7d7d7d;
        border-radius: 50px;
        font-size: 17px;
        cursor: pointer;
        margin-right: 28px;
        &.on{
            border-color: #7cd958;
        }
    }
    .icon{
        display: inline-block;
        vertical-align: middle;
        width: 32px;
        height: 32px;
        background: url(../assets/icon/zfb.png) center / 100% no-repeat;
        margin-right: 10px;
        &.icon_wx{
            background-image: url(../assets/icon/wx.png);
        }
        &.icon_card{
            background-image: url(../assets/icon/bank.png);
        }
    }
}
.btns{
    margin: 50px 0 90px;
    text-align: right;
}
</style>