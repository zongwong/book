<template>
  <div class="container common">
    <div class="common-left">
      <img src="../../assets/icon/logo.png" class="logo">
    </div>
    <div class="common-right">
      <div class="userInfo">
        <!-- <span>选择校区</span> -->
      <el-dropdown>
        <span class="el-dropdown-link select">
          选择校区<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        <span>用户名</span>
        <span>中</span>
      </div>
      <nav class="nav">
        <router-link to="/"><a class="nav_item active">首页</a></router-link>
        <router-link to="/"><a class="nav_item">二手书籍</a></router-link>
        <router-link to="/"><a class="nav_item">二手笔记</a></router-link>
        <router-link to="/"><a class="nav_item">房屋租赁</a></router-link>
        <router-link to="/"><a class="nav_item">社团交流</a></router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
    };
  },
};
</script>

<style scoped>
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
.userInfo{
  margin-top: 20px;
  font-size: 12px;
  color: #8c8c8c;
}
.nav{
  font-size: 18px;
  margin-top: 24px;
}
.nav_item{
  margin: 0 45px;
}
.nav_item:last-child{
  margin-right: 0;
}
.nav_item.active{
  color: #7cd958;
}
.select{
  font-size: 12px;
  color: #8c8c8c;
}
</style>