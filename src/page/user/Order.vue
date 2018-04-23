<template>
<div class="my_order">
    <template v-for="item in list">    
        <div class="order_item green" :key="item.order_id">
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
                        <div slot="label"><span class="order_tabNav">商品信息</span></div>
                        <div class="order_tabContent">
                            <div class="flex_row orderGoodInfo">
                                <div class="imgBox">
                                    <img src="../../assets/image/book.png" alt="">
                                </div>
                                <div class="row_bd">
                                    <p class="title">书名</p>
                                    <div class="content">简介:123123123123123</div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="交易状况">
                        <div slot="label"><span class="order_tabNav">交易状况</span></div>
                        <div class="order_tabContent">
                            <p class="title">交易状况：</p>
                            <p class="content">买家以来向你</p>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="买家信息">
                        <div slot="label"><span class="order_tabNav">买家信息</span></div>
                        <div class="order_tabContent">
                            <div class="flex_row">
                                <div class="userInfoBox">
                                    <div class="avatar">
                                        <img src="http://api.dedele.net/upload/headimgurl/201804/22/1524363560_5adbf1287fa4a.jpg" alt="头像"> 
                                        <i class="icon_sex"></i>
                                    </div> 
                                </div>
                                <div class="row_bd userInfoP">
                                    <p>x请问请问亲我额</p>
                                    <p>x请问请问亲我额</p>
                                    <p>x请问请问亲我额</p>
                                    <p>x请问请问亲我额</p>
                                    <p>x请问请问亲我额</p>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="评星评价">
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
</div>
</template>

<script>
import { orderList } from "../../api/api";
export default {
  name: "Order",
  components: {},
  data() {
    return {
      list: [],
      total: 1
    };
  },
  created() {
    orderList().then(res => {
      if (res.code == 200) {
        this.list = res.data.orderlist;
        this.total = res.data.maxpage;
      }
    });
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