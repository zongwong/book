<template>
<div class="my_order" v-loading="loading">
    <template v-for="item in list">    
        <div class="order_item" :class="{'yellow':cat==='buy','green':cat==='sale'}" :key="item.order_id">
            <div class="order_header">
                <div class="flex_row order_header-th">
                    <span>发布时间</span>
                    <span>交易时间</span>
                    <span>价格</span>
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
                        <div slot="label"><span class="order_tabNav">订单信息</span></div>
                        <div class="order_tabContent">
                            <router-link :to="'/buy/2/'+item.order_id">
                                <div class="flex_row orderGoodInfo">
                                    <div class="imgBox">
                                        <img :src="host+item.goods_info.images[0]" alt="封面">
                                    </div>
                                    <div class="row_bd">
                                        <p class="title">{{item.goods_info.title}}</p>
                                        <div class="content">简介:{{item.goods_info.summary}}</div>
                                    
                                        <div class="content adr">收货人:{{item.address_info.recipients}}</div>
                                        <div class="content adr">手机号:{{item.address_info.mobilephone}}</div>
                                        <div class="content adr">收货地址:{{item.address_info.detail}} / {{item.address_info.city}} / {{item.address_info.province}} / {{item.address_info.country}}</div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="交易状况">
                        <div slot="label"><span class="order_tabNav">交易状况</span></div>
                        <div class="order_tabContent">
                            <p class="title">交易状况：</p>
                            <p class="content">{{item.show_order_status}}</p>
                            <!-- onCancelOrderl
                            onApplyRefund
                            onSendDeliver
                            onConfirmDeliver
                            onOrderEvaluate -->
                            <el-button v-if="cat=='buy' && item.order_status=='order_create'" size="mini" round>立即付款</el-button>
                            <el-button v-if="cat=='buy' && item.order_status=='order_create'" size="mini" round  @click="onCancelOrderl(item.order_id,item.goods_id)">取消订单</el-button>
                            <el-button v-if="cat=='buy' && item.order_status=='order_payed'" size="mini" round  @click="onApplyRefund(item.order_id,item.goods_id)">申请退款</el-button>
                            <el-button v-if="cat=='buy' && item.order_status=='goods_delivered'" size="mini" round  @click="onConfirmDeliver(item.order_id,item.goods_id)">确认收货</el-button>

                            <el-button v-if="cat=='sale' && item.order_status=='order_payed'" size="mini" round  @click="onSendDeliver(item.order_id,item.goods_id)">立即发货</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="买家信息">
                        <div slot="label"><span class="order_tabNav">{{cat==='sale'?'买家':'卖家'}}信息</span></div>
                        <div class="order_tabContent">
                            <div class="flex_row">
                                <div class="userInfoBox">
                                    <div class="avatar">
                                        <img :src="item.userinfo.headimgurl | headfilter" alt="头像"> 
                                        <i class="icon_sex"></i>
                                    </div> 
                                </div>
                                <div class="row_bd userInfoP">
                                    <p>{{item.userinfo.name}}</p>
                                    <p>{{item.userinfo.graduate_school}}</p>
                                    <!-- <p>x请问请问亲我额</p> -->
                                    <!-- <p>x请问请问亲我额</p> -->
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="评星评价" v-if="item.order_status=='goods_received'">
                        <div slot="label"><span class="order_tabNav">评星评价</span></div>
                        <div class="order_tabContent">
                            <div class="evaluate_box evaluate_top">      
                                <div class="flex_row">
                                    <div class="evaluate_label evaluate_rate">本次交易评分：</div>
                                    <div class="row_bd">
                                        <el-rate :colors="['#7cd958','#7cd958','#7cd958']" v-model="value1"></el-rate>
                                    </div>
                                </div>
                                <div class="flex_row evaluate_word_row">
                                    <textarea class="pjtextarea"></textarea>
                                    <el-button size="mini" round>提交</el-button>
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
import headfilter from '../../utils/tools';
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
      value1:1,
      loading:false,
    };
  },
  watch: {
    '$route' (to, from) {
      this.cat = to.params.cat;
      this.onPageChange(1);
    }
  },
  filters:{
      headfilter
  },
  computed:{
    ...mapState([
        'host'
    ])
  },
  methods:{
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
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            delOrder({
                order_id:id,
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.onPageChange(1);
                }
            })
        }).catch(() => {
        
        });
      },
      // 申请退款
      onApplyRefund(id,goods_id){
        this.$confirm('您确定要申请退款吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            applyRefund({
                order_id:id,
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type: 'success',
                        message: '申请成功!'
                    });
                    this.$router.push({
                        path:'/home'
                    })
                }
            })
        })
      },
      // 标记发货
      onSendDeliver(id,goods_id){
        this.$confirm('您确认已经发货了?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            sendDeliver({
                order_id:id,
                goods_id:goods_id
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type: 'success',
                        message: '发货成功!'
                    });
                    this.onPageChange(1);
                }
            })
        }).catch(() => {
        
        });

      },
      // 确认收货
      onConfirmDeliver(id,goods_id){
        this.$confirm('您确认已经收到货了?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            confirmDeliver({
                order_id:id,
                goods_id:goods_id
            }).then(res=>{
                if(res.code==200){
                    this.$message({
                        type: 'success',
                        message: '确认成功!'
                    });
                    this.onPageChange(1);
                }
            })
        }).catch(() => {
        
        });
      },
      // 评价
      onOrderEvaluate(id,goods_id){
        orderEvaluate({
            order_id:id,
            goods_id:goods_id
        }).then(res=>{
            if(res.code==200){

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
    padding: 4px 25px;
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