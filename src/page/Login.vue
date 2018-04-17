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
            <i></i>
            <p>FaceBook</p>
          </div>
          <div class="login_item login_gmail">
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
         
                <!-- <div class="form_row">
                  <span class="row_ft">手机号：</span>
                  <div class="row_bd"> -->
                    <el-input v-model="regForm.phone" class="bordercolor"  placeholder="请输入内容"></el-input>
                  <!-- </div>
                </div> -->
    
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
              <el-row>
                <el-col :span="14">
                  <el-input v-model="regForm.captcha" class="bordercolor"  placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="10">
                  <img class="captchaImg" src="http://api.dedele.net/token/captcha" alt="图形验证码">
                </el-col>
              </el-row>
              
              
            </el-form-item>
            <el-form-item label="短信验证码" prop="code">
              <el-row>
                <el-col :span="14">
                  <el-input v-model="regForm.code" class="bordercolor"  placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="10">
                  <el-button type="success" plain @click="sendSmsCode">发送验证码</el-button>
                </el-col>
              </el-row>
            </el-form-item>

            <!-- <div class="form_row">
              <span class="row_ft">验证码：</span>
              <div class="row_bd mr18">
                <el-input v-model="regForm.captcha" class="bordercolor"  placeholder="请输入内容"></el-input>
              </div>
              <div>
                <img src="http://api.dedele.net/token/captcha" alt="图形验证码">
              </div>
            </div>
            <div class="form_row">
              <span class="row_ft">短信验证码：</span>
              <div class="row_bd mr18">
                <el-input v-model="regForm.code" class="bordercolor"  placeholder="请输入内容"></el-input>
              </div>
              <div>
                <el-button type="success" plain @click="">发送验证码</el-button>
              </div>
            </div> -->
            <div class="form_row">
              <span class="row_ft" style="opacity:0;">去登录：</span>
              <div class="row_bd">
                <el-button class="login_btn" type="success"  @click="submitForm('regForm')">登录</el-button>
              </div>
            </div>
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
import { getCaptcha,getCode,toLogin } from '../api/api';
export default {
  name: 'Login',
  components: {
    'my-header': Header,
    'my-footer': Footer,
  },
  data() {
    return {
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
    };
  },
  methods: {
    loginEvent() {
      getCaptcha().then(res=>{
        console.log(res)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    sendSmsCode(){
      // this.regForm.code
    },
    phoneLogin:function(){
      this.phoneType = true
    }
  }
};

</script>

<style lang="scss">
  .captchaImg{
    width: 100%;
    height: 38px;
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
