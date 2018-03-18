<template>
  <div class="footer">
    <div class="container common">
      <div class="common-left">
        <img src="../../assets/icon/logo_grey.png" class="logo">
      </div>
      <div class="common-right">
        <div class="footer_search">
            <span class="footer_link footer_link-fb"></span>
            <span class="footer_link footer_link-gmail"></span>
            <div class="footer_input-wrap">
              <el-input
                class="footer-search"
                size="mini"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="input9">
              </el-input>
            </div>
        </div>
        <nav class="nav">
          <router-link to="/"><a class="nav_item">首页</a></router-link>
          <router-link to="/"><a class="nav_item">二手书籍</a></router-link>
          <router-link to="/"><a class="nav_item">二手笔记</a></router-link>
          <router-link to="/"><a class="nav_item">房屋租赁</a></router-link>
          <router-link to="/"><a class="nav_item">社团交流</a></router-link>
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

<style lang="scss" scoped>
.footer{
  background: #373737;
  .logo{
    margin-top: 29.5px;
  }
  .nav{
    .nav_item{
      color: #fff;
    }
  }
  .footer_search{
    margin-top: 20px;
  }
  .footer_link{
    width: 22px;
    height: 22px;
    background: center / 100% no-repeat;
    display: inline-block;
    vertical-align: top;
    &.footer_link-fb{
      background-image: url(../../assets/icon/icon_facebook.png);
      margin-right: 28px;
    }
    &.footer_link-gmail{
      background-image: url(../../assets/icon/icon_gmail.png);
      margin-right: 40px;
    }
  }
  .footer_input-wrap{
    vertical-align: top;
    display: inline-block;
    width: 135px;
  }
}

</style>