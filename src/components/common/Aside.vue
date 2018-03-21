<template>
  <div class="aside">
    <div class="userInfoBox">
        <div class="avatar">
            <img src="../../assets/image/book.png" alt="">
            <i class="icon_sex"></i>
        </div>
        <p class="name">打打</p>
        <p>气温气温</p>
    </div>
    <div class="aside_nav">
        <p>个人资料</p>
        <p>我的发布</p>
        <p>我的消息</p>
        <p>历史评价</p>
        <p>交易记录</p>
        <!-- <span></span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.aside{
    width: 220px;
    box-sizing: border-box;
    border:1px solid #eee;
    color: #7d7d7d;
    font-size: 17px;
    .userInfoBox{
        background: #f2fbee;
        padding-bottom: 30px;
    }
}
.aside_nav{
    padding: 15px 0  60px 60px;
    p{
        margin: 34px 0;
        &.on{
            color: #7cd958;
        }
    }
}
</style>