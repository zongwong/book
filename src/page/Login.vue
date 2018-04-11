<template>
  <div class="hello">
    <my-header></my-header>
    <div class="login_box">
      <div class="center_box">
        <p class="login_title">- 请选择登录方式 -</p>
        <div class="login_type">
          <div class="login_item login_wx">
            <i></i>
            <p>WeChat</p>
          </div>
          <div class="login_item login_fb">
            <i></i>
            <p>FaceBook</p>
          </div>
          <div class="login_item login_gmail">
            <i></i>
            <p>Gmail</p>
          </div>
          <div class="login_item login_phone">
            <i></i>
            <p>Telephone</p>
          </div>
        </div>
        <div class="form">
          <div class="form_row">
            <span class="row_ft">手机号：</span>
            <div class="row_bd">
              <el-input v-model="phone" class="bordercolor"  placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="form_row">
            <span class="row_ft">验证码：</span>
            <div class="row_bd mr18">
              <el-input v-model="code" class="bordercolor"  placeholder="请输入内容"></el-input>
            </div>
            <div>
              <el-button type="success" plain>发送验证码</el-button>
            </div>
          </div>
          <div class="form_row">
            <span class="row_ft" style="opacity:0;">去登录：</span>
            <div class="row_bd">
              <el-button class="login_btn" type="success" @click="loginEvent">登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { getCaptcha,getCode,toLogin } from '../api/api';
export default {
  name: 'Login',
  components: {
    'my-header': Header,
    'my-footer': Footer,
  },
  data() {
    return {
      phone:'',
      code:'',
      captcha: '',
    };
  },
  methods: {
    loginEvent() {
      getCaptcha().then(res=>{
        console.log(res)
      })
    }
  }
};

</script>

<style lang="scss">
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
    height: 600px;
  }
  .center_box{
    width: 555px;
    background: rgba(255,255,255,.7);
    border-radius: 18px;
    margin: auto;
    overflow: hidden;
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
  .login_type .login_item i{
    display: block;
    width: 83px;
    height: 83px;
    background: url(../assets/icon/login_wx.png) center / 100% no-repeat;
  }
  .login_type .login_fb i{
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
</style>
