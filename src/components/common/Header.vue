<template>
  <div class="container common">
    <div class="common-left">
      <router-link to="/"><img src="../../assets/icon/logo.png" class="logo"></router-link>
    </div>
    <div class="common-right">
      <div class="userInfo">
        <el-dropdown 
          trigger="click"
          @command="handleCommand"
        >
          <span class="el-dropdown-link select">
            {{$t("navs.school")}}: {{lang=='zh'?nowCampu.campus_name:nowCampu.eng_name}}<i class="el-icon-arrow-down el-icon--right green_arrow"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <template v-for="item in campuList" >
              <el-dropdown-item :command="item" :key="item.campus_id">{{lang=='zh'?item.campus_name:item.eng_name}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
        <span>丨</span>
        <router-link v-if="token" to="/center"><span class="user name">{{userInfo.nickname}}</span></router-link>
        <router-link v-if="!token" to="/login"><span class="user">{{$t("navs.login")}}</span></router-link>
        <span v-if="token" class="user" @click="loginOut">{{$t('show.out')}}</span>
        <span>丨</span>
        <el-dropdown @command="changeLanguage">
          <span class="el-dropdown-link select">
            {{lang=='zh'?'中':'EN'}}<i class="el-icon--right" :class="{'icon_china':lang=='zh','icon_english':lang=='en'}"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">Chinese</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <nav class="nav">
        <router-link to="/home"><span class="nav_item">{{$t("navs.index")}}</span></router-link>
        <router-link to="/book"><span class="nav_item">{{$t("navs.book")}}</span></router-link>
        <router-link to="/notes"><span class="nav_item">{{$t("navs.notes")}}</span></router-link>
        <router-link to="/house"><span class="nav_item">{{$t("navs.house")}}</span></router-link>
        <router-link to="/community"><span class="nav_item">{{$t("navs.community")}}</span></router-link>
      </nav>
    </div>
    <facebook-login class="fbButton" style="display:none;"
      appId="227565908009108"
      @login="getUserData"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded"
    >
    </facebook-login>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState,mapActions,mapMutations  } from 'vuex';
import facebookLogin from 'facebook-login-vuejs';
export default {
  name: 'Header',
  components: {
    'facebookLogin':facebookLogin
  },
  data() {
    return {
      isLogin:false,
      lang:''
    };
  },
  // watch:{
  //   list(){
  //     return this.$store.state.campuList
  //   }
  // },
  computed:{
    ...mapState({
      userInfo: 'userInfo',
      campuList: 'campuList',
      nowCampu: 'nowCampu',
      token: 'token'
    })
  },
  methods:{
    changeLanguage(lang){
      Vue.config.lang = lang;
      this.lang = lang;
      localStorage.setItem('lang',lang);
      this.Lang({
        lang:lang
      })
    },
    ...mapActions([
      'campusAction'
    ]),
    ...mapMutations([
      'NowCampu_MUTATION',
      'LoginOut_MUTATION',
      'Lang'
    ]),
    handleCommand(command){
      this.NowCampu_MUTATION({
        nowCampu: command
      })
    },
    loginOut(){
        let that = this;
        const login_type = localStorage.getItem('login_type')||'';
        if(login_type==='google'){
            googleSignOut(function(){
              that.LoginOut_MUTATION();
            })
        }else if(login_type==='facebook'){
          // this.FB.logout()
          // this.isConnected = false;
          // that.LoginOut_MUTATION();
          this.onLogout(function(response) {
            that.LoginOut_MUTATION();
          });
        }else{
          that.LoginOut_MUTATION();
        }

        function googleSignOut(cb) { 
          var auth2 = gapi.auth2.getAuthInstance(); 
          auth2.signOut().then(function () { cb() ;}); 
          auth2.disconnect(); 
        }

    },
    getUserData() {
      let that = this;
      this.FB.api('/me', 'GET',{ fields: 'id,name,email,picture' },
        userInformation => {
          console.log(userInformation)

          faceBookToken({
            id : userInformation.id,
            email : userInformation.email,
            name : userInformation.name,
            picture : userInformation.picture.data.url,
          }).then(res=>{
            localStorage.setItem('login_type','facebook');
            that.loginSuccess(res);
          })
        }
      )

    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB
      console.log(this.FB)
      // if (this.isConnected) this.getUserData()
    },
    onLogin() {
      // this.isConnected = true
      // this.getUserData()
    },
    onLogout(cb) {
      this.isConnected = false;
      cb()
    }
  },
  created() {
    this.lang = localStorage.getItem('lang') || 'zh';
  }
};
</script>

<style lang="scss">
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
.router-link-active{
  color: #7cd958;
}
.select{
  font-size: 12px;
  color: #8c8c8c;
  cursor: pointer;
}

.user{
  color: #7cd958;
  padding:2px 0;
  margin: 0 10px;
  cursor: pointer;
  &.name{
    padding-left: 20px;
    background: url(../../assets/icon/icon_user.png) 0 center no-repeat;
    background-size: 16px 16px;
  }
}
.icon_china,.icon_english{
  width: 28px;
  height: 19px;
  background: url(../../assets/icon/lang_zh.png) 0 center no-repeat;
  vertical-align: middle;
}
.icon_english{
  background-image: url(../../assets/icon/lang_en.png);
}
</style>