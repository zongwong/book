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
                v-model="word"
                :placeholder="$t('tips.search')"
                suffix-icon="el-icon-search"
                @keyup.enter.native="searchEvent"
               >
              </el-input>
            </div>
        </div>
        <nav class="nav">
          <router-link to="/home"><span class="nav_item">{{$t("navs.index")}}</span></router-link>
          <router-link to="/book"><span class="nav_item">{{$t("navs.book")}}</span></router-link>
          <router-link to="/notes"><span class="nav_item">{{$t("navs.notes")}}</span></router-link>
          <router-link to="/house"><span class="nav_item">{{$t("navs.house")}}</span></router-link>
          <router-link to="/community"><span class="nav_item">{{$t("navs.community")}}</span></router-link>
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
      word:''
    };
  },
  methods:{
    searchEvent(){
      this.$router.push({
        path:'/search',
        query:{
          word:this.word
        }
      })
      this.word = '';
    }
  }
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