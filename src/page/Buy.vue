<template>
<div>
  <my-search></my-search>
  <div v-loading="loading">
    <div class="buy">
        <div class="box1000">
            <div class="goods_info">
                <div class="goods_imgs">
                    <img  :src="goodsInfo.images[0] | headfilter" alt="封面">
                </div>
                <div class="goods_data">
                    <p class="title">{{goodsInfo.title}}</p>
                    <p class="desc moreHide">{{goodsInfo.summary}}</p>
                    <p class="price">{{goodsInfo.currency_symbol}} {{goodsInfo.shop_price}}</p>
                    <!-- <p v-if="goodsInfo.on_sale==1 && cat==1" class="status">{{goodsInfo.on_sale==1?'已售':''}}</p> -->
                </div>
            </div>
        </div>
    </div>
    <div class="box1000">
        <!-- <div class="address">
            <p>{{$t('form.recipients')}}：{{defaultAddress.recipients}}</p>
            <p>{{$t('form.phone')}}：{{defaultAddress.mobilephone}}</p>
            <p>{{$t('form.address')}}：{{defaultAddress.detail}} / {{defaultAddress.city}} / {{defaultAddress.province}} / {{defaultAddress.country}}</p>
        </div> -->
        <div v-if="cat==1">
            <el-form :inline="true" :model="formInline" ref="formInline" class="formBox" :rules="rules">

                <!-- <el-form-item label="期望交易区域" prop="place">
                    <el-input v-model="formInline.place"  style="width: 300px;"></el-input>
                </el-form-item> -->
                <el-form-item :label="$t('expect.place')" prop="place">
                    <el-select v-model="formInline.place" :placeholder="$t('expect.select')"  style="width: 300px;">
                        <el-option
                        v-for="item in [ 'At bookstore Entrance', 'At Starbuck Entrance', 'At Langson Library Entrance']"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('expect.time')" prop="time" style="margin-left:40px;">
                    <el-cascader
                        :placeholder="$t('expect.select')"
                        style="width: 300px;"
                        expand-trigger="hover"
                        :options="timeGroupLang.data"
                        v-model="formInline.time"
                        @change="handleChange">
                    </el-cascader>
                    <!-- <el-date-picker
                        v-model="formInline.time"
                        format="MM-dd-yyyy HH:mm"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker> -->
                </el-form-item>
            </el-form>
        </div>
        <p class="pay_title" v-if="(cat==2 && orderInfo.order_status==='order_create')">{{$t('show.payType')}}</p>
        <div class="pay_box" v-if="(cat==1 || (cat==2 && orderInfo.order_status==='order_create'))" style="margin-top:50px;">
            <!-- <span @click="selectPayType('zfb')" :class="{on:payType=='zfb'}"><i class="icon icon_zfb"></i>支付宝</span> -->
            <span @click="selectPayType('wx')" :class="{on:payType=='wx'}"><i class="icon icon_visa"></i>VISA</span>
            <span @click="selectPayType('paypal')" :class="{on:payType=='paypal'}"><i class="icon icon_card"></i>PayPal</span>
        </div>
        <p class="pay_title" v-if="cat==2">{{$t('show.orderState')}}</p>
        <div class="address" v-if="cat==2">
            <p>{{orderStatus(orderInfo.order_status)}}</p>
        </div>
        <div class="btns">
            <p v-if="cat==1 && goodsInfo.status>0">{{$t('show.saleOut')}}</p>
            <el-button v-if="cat==1 && goodsInfo.status==0" size="small" type="success" round @click="makeOrder">{{$t('btn.buy')}}</el-button>
            <el-button v-if="cat==2 && orderInfo.order_status=='order_create'" size="small" round @click="onCancelOrderl(orderInfo.order_id,goodsInfo.goods_id)">{{$t('btn.cancelOrder')}}</el-button>
            <el-button v-if="cat==2 && orderInfo.order_status=='order_create'" size="small" type="success" round @click="makePay(order_id)">{{$t('btn.payNow')}}</el-button>
            <el-button v-if="cat==2 && orderInfo.order_status=='order_payed'" size="small" type="success" round @click="onApplyRefund(order_id)">{{$t('btn.refund')}}</el-button>
        </div>
         <!-- <form action="https://www.risuntechs.com/visa/pay?order_id=1" method="POST" style="opacity:0;">
            <input type="hidden" name="_token" value="1XHBPEUpBvssBgqUxoyigct7MaFAr5LTbc9n1mJP">
            <script
                    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
                    data-key="pk_test_hHCR1t7CrgapGB4vqs1qLF4G"
                    data-amount="1999"
                    data-name="Wahcampus"
                    data-description="Online course about integrating Stripe"
                    data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
                    data-locale="auto"
                    data-currency="usd">
            </script>
        </form> -->
    </div>
  </div>
  <!-- <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <my-address></my-address>
  </el-dialog> -->
  <el-dialog
    :title="$t('show.tips')"
    :visible.sync="dialogVisible"
    @close="onPayEvent"
    :close-on-click-modal="showClose"
    :close-on-press-escape="showClose"
    :show-close="showClose"
    width="30%">
    <span>{{$t('msg.pay')}}</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="onPayEvent">{{$t('btn.payed')}}</el-button>
        <el-button type="primary" @click="onPayEvent">{{$t('btn.obstacle')}}</el-button>
    </span>
 </el-dialog>

</div>
</template>

<script>
// 商品状态0待售1下单锁定2支付3发货4收货5评价
import Search from '../components/common/Search';
import { getGoodsInfo,createOrder,orderInfo,delOrder,payPal,addressList,applyRefund,visaPay } from '../api/api';
import address from '../page/address/address';
import { mapState } from 'vuex';
import headfilter from '../utils/tools';
export default {
  name: 'Buy',
  components: {
    'my-search': Search,
    'my-address':address
  },
  data() {
    return {
      timeGroup:[],
      dialogTableVisible:true,
      fullscreenLoading:false,
      order_id:'',
      goods_id:'',
      goodsInfo:{
          images:[]
      },
      userinfo:{},
      orderInfo:{},
      defaultAddress:{},
      payType:'paypal',
      loading:false,
      dialogVisible:false,
      newWin:'',
      cat:'',
      showClose:false,
      formInline: {
        place: '',
        time: []
      }
    }
  },
  filters:{
      headfilter
  },
  computed:{
    timeGroupLang(){
        let timeGroup = this.timeGroup;
        timeGroup.forEach(item=>{
            item.label = this.$t(`week.${item.t}`);
            item.value = this.$t(`week.${item.t}`);
        })
        return {
            data:[...timeGroup]
        }
    },
    ...mapState([
        'host'
    ]),
    rules(){
      return {
          place: [
            { required: true, message: this.$t('valid.place'), trigger: 'change' },
          ],
          time: [
            { required: true, message: this.$t('valid.time'), trigger: 'change' }
          ],
      }
    }
  },
  methods:{
    handleChange(){

    },
    orderStatus(status){
        switch(status){
            case 'order_payed':
            return this.$t('order.order_payed');
                case 'order_create':
            return this.$t('order.order_create');
                case 'refund_apply':
            return this.$t('order.refund_apply');
                case 'order_refunded':
            return this.$t('order.order_refund');
                case 'order_canceled':
            return this.$t('order.order_canceled');
                case 'goods_delivered':
            return this.$t('order.goods_delivered');
                case 'goods_received':
            return this.$t('order.goods_received');
                case 'buyer_evaluated':
            return this.$t('order.buyer_evaluated');
            case 'seller_evaluated':
            return this.$t('order.seller_evaluated');
                case 'both_evaluated':
            return this.$t('order.both_evaluated');
                case 'outoftime':
            return this.$t('order.outoftime');
        }
      },
      selectPayType(type){
          this.payType = type;
      },
      makeOrder(){
          let that = this;
          this.$refs['formInline'].validate((valid) => {
            if (valid) {

                this.loading = true;
                if(this.payType==='paypal'){
                    this.newWin = window.open('/loading');
                    createOrder({
                        // address_id:this.defaultAddress.address_id,
                        goods_id:this.goodsInfo.goods_id,
                        expect_exchange_place:this.formInline.place,
                        expect_start_time:this.formInline.time[0]+'-'+this.formInline.time[1],
                        expect_end_time:0,
                    }).then(res=>{
                        if(res.code==200){
                            return res.data.order_id; 
                        }else{
                            window.close(this.newWin);
                            this.$alert(res.message, {
                                confirmButtonText: '确定',
                                callback: action => {
                                }
                            });
                            this.loading = false;
                        }
                    }).then(res=>{
                        if(res){
                            this.order_id = res;
                            this.makePay(res);
                        }
                        this.loading = false;
                    })
                }else{
                    createOrder({
                        // address_id:this.defaultAddress.address_id,
                        goods_id:this.goodsInfo.goods_id,
                        expect_exchange_place:this.formInline.place,
                        expect_start_time:this.formInline.time[0]+'-'+this.formInline.time[1],
                        expect_end_time:0,
                    }).then(res=>{
                        if(res.code==200){
                            return res.data; 
                        }else{
                            this.loading = false;
                            this.$alert(res.message, {
                                confirmButtonText: '确定',
                                callback: action => {
                                }
                            });
                        }
                    }).then(res=>{
                        if(res){
                            that.order_id = res.order_id;
                            
                            console.log(that.$checkout)
                            that.$checkout.open({
                                name: this.goodsInfo.title,
                                currency: res.rescurrency_code,
                                amount: res.shop_price,
                                token: (token) => {
                                    console.log(token)
                                    token.stripeEmail = token.email;
                                    token.stripeToken = token.id;
                                    visaPay(token,res.order_id).then(res=>{
                                        console.log(res)
                                        this.loading = false;
                                        if(res.code==200){
                                            this.$message.success(res.message);
                                            this.$router.replace({
                                                path:'/center/order/buy'
                                            })
                                            // window.location = window.location.href;
                                        }else{
                                            this.$message.error(res.message);
                                        }
                                    })

                                } 
                            },()=>{
                                this.loading = false;
                            });
                        }
                        
                    })

                }

            } else {
                console.log('error submit!!');
                return false;
            }
          });
        
 

      },
      // 取消订单
      onCancelOrderl(id,goods_id){
        this.$confirm(this.$t('msg.delOrder'), this.$t('btn.tips'), {
            confirmButtonText: this.$t('btn.sure'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
        }).then(() => {
            delOrder({
                order_id:id,
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type: 'success',
                        message: 'success!'
                    });
                    // this.$set(orderInfo,'order_status','order_canceled');
                    this.$router.replace({
                        path:'/home'
                    })
                }
            })
        }).catch(() => {
        
        });
      },
      // 申请退款
      onApplyRefund(id,goods_id){
        this.$confirm(this.$t('msg.reOrder'), this.$t('btn.tips'), {
            confirmButtonText: this.$t('btn.sure'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
        }).then(() => {
            applyRefund({
                order_id:id,
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type: 'success',
                        message: 'success!'
                    });
                    window.location = window.location.href;
                    // this.$router.push({
                    //     path:'/home'
                    // })
                }
            })
        })
      },
      makePay(id){
     
          if(this.payType === 'paypal'){
              if(!this.newWin){
                  this.newWin = window.open('/loading');
              }
              this.dialogVisible = true;
              payPal({
                  order_id:id
              }).then(ret=>{
                  this.newWin.location.href = ret.data.approval_link;
                  this.newWin = '';
              })
          }else{
                this.loading = true;
                this.$checkout.open({
                    name: this.goodsInfo.title,
                    currency: this.orderInfo.currency_code,
                    amount: this.orderInfo.price*100,
                    token: (token) => {
                        console.log(token)
                        token.stripeEmail = token.email;
                        token.stripeToken = token.id;
                        visaPay(token,this.orderInfo.order_id).then(res=>{
                            console.log(res)
                            this.loading = false;
                            if(res.code==200){
                                this.$message.success(res.message);
                                window.location = window.location.href;
                            }else{
                                this.$message.error(res.message);
                            }
                        })

                    } 
                },()=>{
                    this.loading = false;
                });
          }
      },
      onPayEvent(){
        // this.$router.push({
        //     path:`/buy/2/${this.order_id}`,
        // })
        window.location = `/buy/2/${this.order_id}`;
      },
      handleClose(){

      },
      dataTrans(obj){
        //   value: 'zhinan',
        //   label: '指南',
        //   children: [{
        let arr = []
        for(let key in obj){
            if(obj[key].length){
                let time = {label:key,value:key,children:[],t:key}
                obj[key].forEach(item=>{
                    const rangTime = `${item.startTime}-${item.endTime}`;
                    time.children.push(
                        {label:rangTime,value:rangTime}
                    )
                })
                arr.push(time);
            }
        }
        return arr;
      }
  },
  created(){
      this.loading = true;
      this.cat = this.$route.params.cat;
      if(this.cat==1){
          // 未下单
        this.goods_id = this.$route.params.id
        // 商品信息
        getGoodsInfo({
            goods_id:this.$route.params.id,
        }).then(res=>{
            this.goodsInfo = res.data.goodsInfo;
            this.userinfo = res.data.goodsInfo.userinfo;
            this.timeGroup = this.dataTrans(JSON.parse(res.data.goodsInfo.expect_start_time));
            this.$set(this.goodsInfo,'post',this.host+res.data.goodsInfo.images[0]);
            this.loading = false;
        });
        // 默认地址
        // addressList(this.pas).then(res=>{
        //     if(res.code==200){
        //         const defaddr = res.data.addresslist.filter(item=>{
        //             return item.is_default == 1
        //         });
        //         if(defaddr.length){
        //             this.defaultAddress = defaddr[0]
        //         }else{
        //             this.$message.error('请先填写收货地址');
        //             this.$router.push({
        //                 path:'/center/address',
        //                 query:{
        //                     redirect: this.$route.fullPath
        //                 }
        //             })
        //         }
        //         this.loading = false;
        //     }
        // })
      }else{
            // 已下单
            this.order_id = this.$route.params.id
            orderInfo({
                order_id:this.$route.params.id,
            }).then(res=>{
                if(res.code==200){
                    this.orderInfo = res.data.orderInfo;
                    this.goodsInfo = res.data.orderInfo.goods_info;
                    this.userinfo = res.data.orderInfo.userinfo;
                    this.defaultAddress= res.data.orderInfo.address_info;
                    this.loading = false;
                }else{
                    this.$router.push({
                        path:'/home'
                    })
                }
            });
      }

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
        &.icon_visa{
            background-image: url(../assets/icon/visa.jpg);
        }
    }
}
.btns{
    margin: 50px 0 90px;
    text-align: right;
}
.goods_data{
    .desc{
        -webkit-line-clamp: 5;
        height: 104px;
        margin-bottom:22px;

    }
}

</style>