<template>
  <div class="hello">
    <my-header></my-header>
    <div class="login_box">
      <div class="center_box">
        <p class="login_title">- 登陆成功  -</p>
        <p>请为自己设置一个昵称</p>
        <div class="form">
          <el-form :model="regForm" :rules="rules" ref="regForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="regForm.nickname" class="bordercolor"  placeholder="请输入内容"></el-input>  
            </el-form-item>
            <div class="form_row">
              <span class="row_ft" style="opacity:0;">去登录：</span>
              <div class="row_bd">
                <el-button class="login_btn" type="success"  @click="submitForm('regForm')">进入</el-button>
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
import { setNickname } from '../api/api';
export default {
  name: 'Setnick',
  components: {
    'my-header': Header,
    'my-footer': Footer,
  },
  data() {
    return {
      regForm: {
        nickname:'',
      },
      rules: {
          nickname: [
            { required: true, message: '请填写昵称', trigger: 'blur' },
          ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setNickname({
            nickname:this.regForm.nickname,
          }).then(res=>{
            if(res.code==200){
              this.$message.success(res.message);
              this.$router.push({
                path:'/home'
              })
            }else{
              this.$message.error(res.message);
            }
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
