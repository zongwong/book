<template>
  <div class="hello">
    <my-header></my-header>
    <div class="login_box" v-loading="loading">
      <div class="center_box">
        <p class="login_title" style="color:#7cd958;">- 请填写详细资料  -</p>
        <div class="form">
          <el-form ref="userInfoForm"  :model="userInfoForm" :rules="userInfoRules" label-width="80px">
              
              <el-form-item label="头像" prop="headimgurl">
                  <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :data="{token:token}"
                    name="image"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="uavatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                  <el-input v-model="userInfoForm.name"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="userInfoForm.sex">
                      <el-radio label="1">男</el-radio>
                      <el-radio label="2">女</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="国籍" prop="country">
                  <el-input v-model="userInfoForm.country"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="mobilephone">
                  <el-input v-model="userInfoForm.mobilephone"></el-input>
              </el-form-item>
              <el-form-item label="所在学校" prop="graduate_school">
                  <el-input v-model="userInfoForm.graduate_school"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="login_btn" style="width: 150px;" type="success"  @click="submitForm('userInfoForm')">确定</el-button>
              </el-form-item>
              
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
import { mapMutations,mapState,mapActions } from 'vuex';
import config from '../utils/global';
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
      },
      userInfoForm: {
          name: '',
          mobilephone: '',
          sex: '',
          country:'',
          headimgurl:'',
          graduate_school:'',
        },
      userInfoRules:{
          name:[{ required:true,trigger:'change',message:"请填写姓名" }],
          mobilephone:[{ required:true,trigger:'change',message:"请填写电话" }],
          sex:[{ required:true,trigger:'change',message:"请选择性别" }],
          country:[{ required:true,trigger:'change',message:"请填写国籍" }],
          headimgurl:[{ required:true,trigger:'change',message:"请上传头像" }],
          graduate_school:[{ required:true,trigger:'change',message:"请填写所在学校" }]
      },
      loading:false,
      imageUrl:'',
      action:config.host+'/uploader/image'
    };
  },
  computed:{
      ...mapState([
          'token'
      ])
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    ...mapMutations([
      'EditName_MUTATION'
    ]),
    handleAvatarSuccess(res, file){
        this.userInfoForm.headimgurl = res.data.imageurl;
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.loading = true;   
                this.setUserInfo(this.userInfoForm)
                .then(res=>{
                    if(res.code==200){
                        this.$message.success(res.message);
                        this.$router.push({
                          path:'/center/info'
                        })
                    }
                    this.loading = false;
                });

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

    .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border: 1px solid #333;
    border-radius: 50%;
  }
 .uavatar,.uavatar2 {
    width: 60px;
    height: 60px;
    display: block;
    border-radius: 50%;
  }
</style>
