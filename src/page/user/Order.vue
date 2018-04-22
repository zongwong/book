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
                    <span>发布时间</span>
                    <span>交易时间</span>
                    <span class="price">20.00</span>
                </div>
            </div>
            <div class="order_detail">
                <el-tabs tab-position="right">
                    <el-tab-pane label="商品信息">
                        <div slot="label"><span class="order_tabNav">商品信息</span></div>
                        <div class="order_tabContent">

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="交易状况">
                        <div slot="label"><span class="order_tabNav">交易状况</span></div>
                        <div class="order_tabContent">

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="买家信息">
                        <div slot="label"><span class="order_tabNav">买家信息</span></div>
                        <div class="order_tabContent">

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="评星评价">
                        <div slot="label"><span class="order_tabNav">评星评价</span></div>
                        <div class="order_tabContent">
                            
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

import { orderList } from '../../api/api';
export default {
  name: 'Order',
  components: {
  },
  data() {
    return {
      list: [],
      total:1,
    };
  },
  created(){
      orderList().then(res=>{
          if(res.code==200){
              this.list = res.data.orderlist
              this.total = res.data.maxpage
          }
      })
  }
};

</script>

<style lang="scss" scoped>
.order_item{
    font-size: 17px;
    margin-bottom: 30px;
    .order_header-th{
        color:#fff;
        line-height: 40px;
    }
    .order_header-td{
        line-height: 38px;
        color: #7d7d7d;
    }
    .price{
        color: #ff4e4e;
    }
    .order_tabNav{
        border-radius: 50px;
        padding: 4px 25px;
    }
    .el-tabs__item.is-active .order_tabNav{
        color: #fff;
    }
    &.green{
        border:1px solid #7cd958;
        .order_header-th{
            background: #7cd958;
        }
        .order_header-td{
            border-bottom: 1px solid #7cd958;
        }
        .order_tabNav{
            border: 1px solid #7cd958;
            color: #7cd958;
        }
        .el-tabs__item.is-active .order_tabNav{
            background: #7cd958;
        }
    }
    &.yellow{
        border:1px solid #f2c700;
        .order_header-th{
            background: #f2c700;
        }
        .order_header-td{
            border-bottom: 1px solid #f2c700;
        }
        .order_tabNav{
            border: 1px solid #f2c700;
            color: #f2c700;
        }
        .el-tabs__item.is-active .order_tabNav{
            background: #f2c700;
        }
    }
}
.order_header{
    
}
.flex_row>span{
    flex: 1;
    text-align: center;
}

.order_detail{
    padding: 10px 0;
}
.order_tabContent{
    padding: 0 20px;
}
</style>