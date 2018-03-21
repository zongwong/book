<template>
<div>
  <div class="buy">
      <my-search></my-search>
      <div class="box1000">
          <div class="goods_info">
              <div class="goods_imgs">
                  <img src="../assets/image/book.png" alt="">
              </div>
              <div class="goods_data">
                  <p class="title">请问请问亲我额去</p>
                  <p class="desc">asdasdasdasd</p>
                  <p class="price">￥20.00</p>
              </div>
          </div>
      </div>
  </div>
  <div class="box1000">
    <div class="address">
        <p>气温气温</p>
        <p>请问请问</p>
        <p>请问驱蚊器我</p>
    </div>
    <p class="pay_title">付款方式</p>
    <div class="pay_box">
        <span class="on"><i class="icon icon_zfb"></i>支付宝</span>
        <span><i class="icon icon_wx"></i>微信</span>
        <span><i class="icon icon_card"></i>银行卡</span>
    </div>
    <div class="btns">
        <el-button size="small" round>取消订单</el-button>
        <el-button size="small" type="success" round>立即付款</el-button>
    </div>
  </div>
</div>
</template>

<script>
import Search from '../components/common/Search';

export default {
  name: 'Buy',
  components: {
    'my-search': Search
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
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