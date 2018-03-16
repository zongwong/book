<template>
  <div class="footer">
    <div class="container common">
      <div class="common-left">
        <img src="../../assets/icon/logo_grey.png" class="logo">
      </div>
      <div class="common-right">
        <div class="userInfo">
          <!-- <span class="select">选择校区</span> -->

          <span>用户名</span>
          <span>中</span>
        </div>
        <nav class="nav">
          <a class="nav_item" href="">首页</a>
          <a class="nav_item" href="">二手书籍</a>
          <a class="nav_item" href="">二手笔记</a>
          <a class="nav_item" href="">房屋租赁</a>
          <a class="nav_item" href="">社团交流</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      
    };
  },
};
</script>

<style scoped>
.footer{
  background: #373737;
}
.common{
  height: 120px;
}
.common-left{
  float: left;
  width: 210px;
}
.common-right{
  float: right;
  width: 980px;
  text-align: right;
}
.logo{
  margin-top: 17.5px;
}
</style>