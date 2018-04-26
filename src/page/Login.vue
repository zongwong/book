<template>
  <div class="hello">
    <my-header></my-header>
    <div class="login_box">
      <div class="center_box">
        <p class="login_title">- 请选择登录方式 -</p>
        <div class="login_type" v-if="!phoneType">
          <div class="login_item login_wx">
            <i></i>
            <p>WeChat</p>
          </div>
          <div class="login_item login_fb">
            <div class="fbBtnBox">
              <facebook-login class="fbButton"
                appId="165722567449098"
                @login="getUserData"
                @logout="onLogout"
                @sdk-loaded="sdkLoaded"
                @get-initial-status="getUserData">
              </facebook-login>
              <!-- <i></i> -->
            </div>
            <p>FaceBook</p>
          </div>
          <div class="login_item login_gmail" @click="googleLogin">
            <i></i>
            <p>Gmail</p>
          </div>
          <div class="login_item login_phone" @click="phoneLogin">
            <i></i>
            <p>Telephone</p>
          </div>
        </div>
        <div class="form" v-if="phoneType">
          <el-form :model="regForm" :rules="rules" ref="regForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="regForm.phone" class="bordercolor"  placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
              <el-row>
                <el-col :span="14">
                  <el-input v-model="regForm.captcha" class="bordercolor"  placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="10">
                  <img class="captchaImg" @click="reflash" :src="src" alt="图形验证码">
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="短信验证码" prop="code">
              <el-row>
                <el-col :span="14">
                  <el-input v-model="regForm.code" class="bordercolor"  placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="10" style="text-align:right;">
                  <el-button :disabled="isDjs" type="success" plain @click="sendSmsCode">{{smsText}}</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="" >
              <el-button class="login_btn" type="success"  @click="submitForm('regForm')">登录</el-button>
            </el-form-item>
            <!-- <div class="form_row">
              <span class="row_ft" style="opacity:0;">去登录：</span>
              <div class="row_bd">
                <el-button class="login_btn" type="success"  @click="submitForm('regForm')">登录</el-button>
              </div>
            </div> -->
          </el-form>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import facebookLogin from 'facebook-login-vuejs';
import Vue from 'vue';
import config from '../utils/global';
import { getCaptcha,getCode,toLogin,googleToken } from '../api/api';
import { mapMutations } from 'vuex';
export default {
  name: 'Login',
  components: {
    'my-header': Header,
    'my-footer': Footer,
    'facebookLogin':facebookLogin
  },
  data() {
    return {
      src:config.host + '/token/captcha',
      regForm: {
        phone:'',
        code:'',
        captcha: '',
      },
      rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' },
          ],
          captcha: [
            { required: true, message: '请输入图形验证码', trigger: 'blur' },
          ],
      },
      phoneType:false,
      isDjs:false,
      smsText:'发送验证码',
      // idImage, 
      // loginImage, 
      // mailImage, 
      // faceImage,
      isConnected: false,
      name: '',
      email: '',
      personalID: '',
      FB: undefined
    };
  },
  methods: {
    ...mapMutations([
      'Login_MUTATION'
    ]),
    loginEvent() {
      getCaptcha().then(res=>{
        console.log(res)
      })
    },
    reflash(){
      this.src = config.host + '/token/captcha?t='+new Date().getTime()
    },
    loginSuccess(res){
      if(res.code==200){
        this.Login_MUTATION(res.data);
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('nickname',res.data.userinfo.nickname);
        localStorage.setItem('name',res.data.userinfo.name);
        this.$message.success(res.message);

        if(!res.data.userinfo.nickname){
          this.$router.push({
            path:'/setnick'
          })
          return;
        }
        if(!res.data.userinfo.name){
          this.$router.push({
            path:'/setinfo'
          })
          return;
        }
        this.$router.push({
          path:this.$route.query.redirect||'/'
        })
      }else{
        this.$message.error(res.message);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          toLogin({
            mobilephone:this.regForm.phone,
            code:this.regForm.code
          }).then(res=>{
            this.loginSuccess(res);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    sendSmsCode(){
      if (this.isDjs) return;
      this.isDjs = true;
      getCode({
        mobilephone:this.regForm.phone,
        captcha:this.regForm.captcha,
      }).then(res => {
        if(res.code==200){
          let s = 60;
          let timer = setInterval(()=>{
            if(s>0){
              s=s-1;
              this.smsText = `${s}s后重新获取`;
            }else{
              clearInterval(timer);
              this.isDjs = false;
              this.smsText = `获取验证码`;
            }
          },1000)
          this.$message.success(res.message);
        }else{
          this.isDjs = false;
          this.$message.error(res.message);
        }
      })
    },
    phoneLogin(){
      this.phoneType = true
    },
    googleLogin(){
        let that = this;
        Vue.googleAuth().directAccess();
        Vue.googleAuth().signIn(function (googleUser) {
          // things to do when sign-in succeeds
          console.log('成功')
          console.log(googleUser)
          console.log(googleUser.Zi.id_token)
          // 姓名
          console.log(googleUser.w3.ig)
          // 头像
          console.log(googleUser.w3.Paa)
          //邮箱 googleUser.w3.U3

          googleToken({
            openid:googleUser.El,
            headimgurl:googleUser.w3.Paa,
            name:googleUser.w3.ig,
            email:googleUser.w3.U3,
            firstname:googleUser.w3.ofa,
            secondname:googleUser.w3.wea,
          }).then(res=>{
            that.loginSuccess(res);
          })

        }, function (error) {
          console.log('失败')
          console.log(error)
          // things to do when sign-in fails
        })
    },
    getUserData() {
      this.FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
        }
      )
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected
      this.FB = payload.FB
      console.log(this.FB)
      if (this.isConnected) this.getUserData()
    },
    onLogin() {
      this.isConnected = true
      this.getUserData()
    },
    onLogout() {
      this.isConnected = false;
    }
  }
};

</script>

<style lang="scss">
  .captchaImg{
    width: 100%;
    height: 38px;
    cursor: pointer;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .login_box{
    background: url(../assets/icon/bg_login.png) 0 0 no-repeat;
    background-size: cover;
    // height: 600px;
    overflow: hidden;
  }
  .center_box{
    width: 555px;
    background: rgba(255,255,255,.7);
    border-radius: 18px;
    overflow: hidden;
    margin: 200px auto 220px;
  }
  /* 登录方式 */
  .login_title{
    text-align: center;
    color: #7d7d7d;
    margin: 52px 0;
  }
  .login_type{
    display: flex;
    color: #7d7d7d;
    width: 466px;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto 60px;
  }
  .login_type .login_item{
    width: 83px;
    cursor: pointer;
  }
  .login_type .login_item i,.fbBtnBox{
    display: block;
    width: 83px;
    height: 83px;
    background: url(../assets/icon/login_wx.png) center / 100% no-repeat;
  }
  .login_type .login_fb i,.fbBtnBox{
    background-image: url(../assets/icon/login_facebook.png);
  }
  .login_type .login_gmail i{
    background-image: url(../assets/icon/login_gmail.png);
  }
  .login_type .login_phone i{
    background-image: url(../assets/icon/login_phone.png);
  }
  .login_type .login_item p{
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
  }
  .mr18{
    margin-right: 18px;
  }
  /* form */
  .form{
    padding: 0 60px;
    margin-bottom: 60px;
  }
  .form_row{
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }
  .row_ft{
    
  }
  .row_bd{
    flex: 1;
  }
  .login_btn{
    width: 280px;
  }
  .row_bd .bordercolor input.el-input__inner{
    border-color: #7cd958!important;
  }
  .fbButton{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    button{
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
  .fbBtnBox{
    position: relative;
    overflow: hidden;
  }
</style>
