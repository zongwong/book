<template>
<div class="my_order" v-loading="loading">
    <template v-for="(item,index) in list">    
        <div class="order_item" :class="{'yellow':cat==='buy','green':cat==='sale'}" :key="item.order_id">
            <div class="order_header">
                <div class="flex_row order_header-th">
                    <span>{{$t('order.pbtime')}}</span>
                    <span>{{$t('order.ordertime')}}</span>
                    <span>{{$t('order.price')}}</span>
                </div>
                <div class="flex_row order_header-td">
                    <span>{{item.created_at}}</span>
                    <span>{{item.day}}</span>
                    <span class="price">{{item.currency_symbol}} {{item.price}}</span>
                </div>
            </div>
            <div class="order_detail">
                <el-tabs tab-position="right">
                    <el-tab-pane label="商品信息">
                        <div slot="label"><span class="order_tabNav">{{$t('order.orderinfo')}}</span></div>
                        <div class="order_tabContent">
                            <router-link :to="'/buy/2/'+item.order_id">
                                <div class="flex_row orderGoodInfo">
                                    <div class="imgBox">
                                        <img :src="host+item.goods_info.images[0]" alt="封面">
                                    </div>
                                    <div class="row_bd">
                                        <p class="title">{{item.goods_info.title}}</p>
                                        <div class="content">{{$t('order.desc')}}:{{item.goods_info.summary}}</div>
                                    
                                        <div v-if="item.goods_info.category_id==1" style="color:#7cd958;" class="content adr">{{$t('expect.place')}}:{{item.expect_exchange_place}}</div>
                                        <div v-if="item.goods_info.category_id==1" style="color:#7cd958;" class="content adr">{{$t('expect.time')}}:{{item.expect_start_time}}</div>
                                        <div v-if="item.goods_info.category_id==2" style="color:#7cd958;" class="content adr">{{$t('expect.email')}}:{{item.receiver_email}}</div>
                                        <!-- <div class="content adr">{{$t('form.address')}}:{{item.address_info.detail}} / {{item.address_info.city}} / {{item.address_info.province}} / {{item.address_info.country}}</div> -->
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="交易状况">
                        <div slot="label"><span class="order_tabNav">{{$t('order.orderstatus')}}</span></div>
                        <div class="order_tabContent">
                            <p class="title">{{$t('order.orderstatus')}}：</p>
                            <p class="content">{{changeSatus(item.order_status)}}</p>

                            <el-button v-if="cat=='buy' && item.order_status=='order_create'" size="mini" round><router-link :to="'/buy/2/'+item.order_id">{{$t('btn.payNow')}}</router-link></el-button>
                            <el-button v-if="cat=='buy' && item.order_status=='order_create'" size="mini" round  @click="onCancelOrderl(item.order_id,item.goods_id)">{{$t('btn.cancelOrder')}}</el-button>
                            <el-button v-if="cat=='buy' && item.order_status=='order_payed'" size="mini" round  @click="onApplyRefund(item.order_id,item.goods_id)">{{$t('btn.refund')}}</el-button>
                            <el-button v-if="cat=='buy' && item.order_status=='goods_delivered'" size="mini" round  @click="onConfirmDeliver(item.order_id,item.goods_id)">{{$t('btn.receiving')}}</el-button>
                            <el-button v-if="cat=='sale' && item.order_status=='order_payed'" size="mini" round  @click="onSendDeliver(item.order_id,item.goods_id)">{{$t('btn.shipments')}}</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="买家信息">
                        <div slot="label"><span class="order_tabNav">{{cat==='sale'?$t('order.buyer'):$t('order.seller')}}</span></div>
                        <div class="order_tabContent">
                            <div class="flex_row">
                                <div class="userInfoBox">
                                    <div class="avatar">
                                        <img :src="item.userinfo.headimgurl | headfilter" alt="头像"> 
                                        <i class="icon_sex" :class="{'icon_man':item.userinfo.sex==1}"></i>
                                    </div> 
                                </div>
                                <div class="row_bd userInfoP">
                                    <p>{{item.userinfo.name}}</p>
                                    <p>{{item.userinfo.graduate_school}}</p>
                                    <p>{{item.userinfo.mobilephone}}</p>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="评星评价" v-if="evaluateStatus(item.order_status,index)==1||evaluateStatus(item.order_status,index)==3">
                        <div slot="label"><span class="order_tabNav">{{$t('order.star')}}</span></div>
                        <div class="order_tabContent">
                            <div class="evaluate_box evaluate_top">      
                                <div class="flex_row">
                                    <div class="evaluate_label evaluate_rate">{{$t('order.score')}}：</div>
                                    <div class="row_bd">
                                        <el-rate :colors="['#7cd958','#7cd958','#7cd958']" v-model="value1"></el-rate>
                                    </div>
                                </div>
                                <div class="flex_row evaluate_word_row">
                                    <textarea class="pjtextarea" v-model="pjtextarea"></textarea>
                                    <el-button size="mini" round @click="onOrderEvaluate(item.order_id,item.goods_id)">提交</el-button>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!-- 卖家已评 -->
                    <el-tab-pane label="评星评价" v-if="item.evalutelist.seller.length!=0">
                        <div slot="label"><span class="order_tabNav">{{$t('order.salestar')}}</span></div>
                        <div class="order_tabContent">
                            <div class="evaluate_box evaluate_top">      
                                <div class="flex_row">
                                    <div class="evaluate_label evaluate_rate">{{$t('order.score')}}：</div>
                                    <div class="row_bd">
                                        <el-rate disabled :colors="['#7cd958','#7cd958','#7cd958']" v-model="item.evalutelist.seller.star"></el-rate>
                                    </div>
                                </div>
                                <div class="flex_row evaluate_word_row">
                                    <p>{{$t('order.star')}}：</p>
                                    <p>{{item.evalutelist.seller.words}}</p>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <!-- 买家已评 -->
                    <el-tab-pane label="评星评价" v-if="item.evalutelist.buyer.length!=0">
                        <div slot="label"><span class="order_tabNav">{{$t('order.buystar')}}</span></div>
                        <div class="order_tabContent">
                            <div class="evaluate_box evaluate_top">      
                                <div class="flex_row">
                                    <div class="evaluate_label evaluate_rate">{{$t('order.score')}}：</div>
                                    <div class="row_bd">
                                        <el-rate disabled :colors="['#7cd958','#7cd958','#7cd958']" v-model="item.evalutelist.buyer.star"></el-rate>
                                    </div>
                                </div>
                                <div class="flex_row evaluate_word_row">
                                    <p>{{$t('order.star')}}：</p>
                                    <p>{{item.evalutelist.buyer.words}}</p>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </template>
    <!-- <div class="order_item yellow">
        <div class="order_header">
            <div class="flex_row order_header-th">
                <span>发布时间</span>
                <span>交易时间</span>
                <span>价格</span>
            </div>
            <div class="flex_row order_header-td">
                <span>发布时间</span>
                <span>交易时间</span>
                <span class="price">20.00</span>
            </div>
        </div>
        <div class="order_detail">
            <el-tabs tab-position="right">
                <el-tab-pane label="商品信息">
                    <div slot="label"><span class="order_tabNav">商品信息</span></div>
                </el-tab-pane>
                <el-tab-pane label="交易状况">
                    <div slot="label"><span class="order_tabNav">交易状况</span></div>
                </el-tab-pane>
                <el-tab-pane label="买家信息">
                    <div slot="label"><span class="order_tabNav">买家信息</span></div>
                </el-tab-pane>
                <el-tab-pane label="评星评价">
                    <div slot="label"><span class="order_tabNav">评星评价</span></div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div> -->
    <my-pagination
        :total="total"
        :current-page.sync="pageno"
        @page-change="onPageChange"
    ></my-pagination>
</div>
</template>

<script>
// rder_payed 订单已支付
// order_create 订单已创建
// refund_apply 申请退款
// order_refund 订单已退款
// order_canceled 订单已取消
// goods_delivered 商品已发货
// goods_received 商品已收到
// seller_evaluated 卖家已评价
// buyer_evaluated 卖家已评价
// both_evaluated 已互评
import { salelist,consumelist,applyRefund,sendDeliver,confirmDeliver,orderEvaluate,delOrder } from "../../api/api";
import { mapState } from 'vuex';
import pagination from '../../components/pagination';
import headfilter, { timeFormat } from  '../../utils/tools';
import { orderStatus,isEmptyArr } from '../../utils/tools';
export default {
  name: "Order",
  components: {
      'my-pagination':pagination
  },
  data() {
    return {
      cat:'',
      list: [],
      total: 1,
      pageno:1,
      loading:false,
      value1:5,
      pjtextarea:'',
    };
  },
  watch: {
    '$route' (to, from) {
      this.cat = to.params.cat;
      this.onPageChange(1);
    }
  },
  filters:{
      headfilter,
      timeFormat
  },
  computed:{
    ...mapState([
        'host'
    ])
  },
  methods:{
      evaluateStatus(status,index){
          const obj = this.list[index].evalutelist;
          const arr = ['goods_received','seller_evaluated','buyer_evaluated','both_evaluated'];
          if(arr.indexOf(status)!=-1){
              if(obj.role == 'seller'){
                  if(isEmptyArr(obj.seller)){
                      // 我是卖家,未评
                      return 1;
                  }else{
                      // 我是卖家,已评
                      return 2;
                  }
              }else if(obj.role == 'buyer'){
                  if(isEmptyArr(obj.buyer)){
                       // 我是买家,未评
                      return 3;
                  }else{
                      // 我是买家,已评
                      return 4;
                  }
              }
          }else{
              return 5;
          }
      },
      changeSatus(status){
          return orderStatus(status,this);
      },
      getListData(){
          this.loading = true;
          if(this.cat=='buy'){
              consumelist({
                  pageno:this.pageno
              }).then(res=>{
                    if (res.code == 200) {
                        this.list = res.data.orderlist;
                        this.total = res.data.maxpage;
                        this.loading = false;
                    }
              })
          }else if(this.cat=='sale'){
              salelist({
                  pageno:this.pageno
              }).then(res=>{
                    if (res.code == 200) {
                        this.list = res.data.orderlist;
                        this.total = res.data.maxpage;
                        this.loading = false;
                    }
              })
          }
      },
      onPageChange(currentPage){
          this.pageno = currentPage;
          this.getListData();
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
                        message: this.$t('msg.delok')
                    });
                    this.onPageChange(1);
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
                        message: this.$t('msg.success')
                    });
                    // this.$router.push({
                    //     path:'/home'
                    // })
                    this.onPageChange(1);
                }
            })
        })
      },
      // 标记发货
      onSendDeliver(id,goods_id){
        this.$confirm(this.$t('msg.shipments'), this.$t('btn.tips'), {
            confirmButtonText: this.$t('btn.sure'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
        }).then(() => {
            sendDeliver({
                order_id:id,
                goods_id:goods_id
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type: 'success',
                        message: this.$t('msg.shipmentsok')
                    });
                    this.onPageChange(1);
                }
            })
        }).catch(() => {
        
        });

      },
      // 确认收货
      onConfirmDeliver(id,goods_id){
        this.$confirm(this.$t('msg.receiving'), this.$t('btn.tips'), {
            confirmButtonText: this.$t('btn.sure'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
        }).then(() => {
            confirmDeliver({
                order_id:id,
                goods_id:goods_id
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type: 'success',
                        message: this.$t('msg.receivingok')
                    });
                    this.onPageChange(1);
                }
            })
        }).catch(() => {
        
        });
      },
      // 评价
      onOrderEvaluate(id,goods_id){
        if(!this.value1) return;
        if(!this.pjtextarea) return;
        orderEvaluate({
            order_id:id,
            goods_id:goods_id,
            star:this.value1, 
            words:this.pjtextarea,
        }).then(res=>{
            if(res.code==200){
                this.$message.success('success');
                this.onPageChange(1);
            }
        })
      },

  },
  created() {
    this.cat = this.$route.params.cat;
    this.getListData();
  }
};
</script>

<style lang="scss" scoped>
.order_item {
  font-size: 17px;
  margin-bottom: 30px;
  .order_header-th {
    color: #fff;
    line-height: 40px;
  }
  .order_header-td {
    line-height: 38px;
    color: #7d7d7d;
  }
  .price {
    color: #ff4e4e;
  }
  .order_tabNav {
    border-radius: 50px;
    padding: 6px 20px;
    text-align: center;
    width: 130px;
    display: block;
    line-height: 1;
    box-sizing: border-box;
  }
  .el-tabs__item.is-active .order_tabNav {
    color: #fff;
  }
  &.green {
    border: 1px solid #7cd958;
    .order_header-th {
      background: #7cd958;
    }
    .order_header-td {
      border-bottom: 1px solid #7cd958;
    }
    .order_tabNav {
      border: 1px solid #7cd958;
      color: #7cd958;
    }
    .el-tabs__item.is-active .order_tabNav {
      background: #7cd958;
    }
  }
  &.yellow {
    border: 1px solid #f2c700;
    .order_header-th {
      background: #f2c700;
    }
    .order_header-td {
      border-bottom: 1px solid #f2c700;
    }
    .order_tabNav {
      border: 1px solid #f2c700;
      color: #f2c700;
    }
    .el-tabs__item.is-active .order_tabNav {
      background: #f2c700;
    }
  }
}
.order_header {
}
.flex_row > span {
  flex: 1;
  text-align: center;
}

.order_detail {
  padding: 10px 0;
}
.order_tabContent {
  padding: 10px 20px;
  .title {
    font-size: 20px;
    margin-bottom: 12px;
  }
  .content {
    color: #7d7d7d;
    font-size: 17px;
    margin-bottom: 8px;
  }
  .content.adr{
      font-size: 15px;
  }
  .userInfoBox {
    padding-top: 0;
    margin-right: 20px;
  }
  .userInfoP {
    color: #747474;
    font-size: 15px;
    p {
      margin-bottom: 10px;
      word-break: break-all;
    }
  }
}
.orderGoodInfo {
  align-items: flex-start;
  .imgBox {
    width: 115px;
    height: 115px;
    overflow: hidden;
    margin-right: 15px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.pjtextarea{
    width: 420px;
    height: 70px;
    border: none;
    outline: none;
    resize:none;
    margin-right: 10px;
}
</style>