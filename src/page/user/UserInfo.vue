<template>
<div class="center_userInfo">
    <el-form ref="userInfoForm"  :model="userInfoForm" :rules="userInfoRules" label-width="80px">
        <div class="form_title flex_row">
            <span class="text">个人信息</span>
            <span class="hr row_bd"></span>
            <span class="btn_save" @click="userFromSubmit('userInfoForm')">保存</span>
        </div>
    
        <el-form-item label="头像" prop="headimgurl">
            <el-input v-model="userInfoForm.headimgurl"></el-input>
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
    </el-form>
    <el-form ref="cardForm"  :model="cardForm" :rules="cardRules" label-width="80px">
        <div class="form_title flex_row">
            <span class="text">银行卡信息</span>
            <span class="hr row_bd"></span>
            <span class="btn_save" @click="userFromSubmit('cardForm')">保存</span>
        </div>
        <el-form-item label="持卡人" prop="cardholder">
            <el-input v-model="cardForm.cardholder"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="cardno">
            <el-input v-model="cardForm.cardno"></el-input>
        </el-form-item>
        <el-form-item label="安全号" prop="safeno">
            <el-input v-model="cardForm.safeno"></el-input>
        </el-form-item>
    </el-form>
    <el-form ref="groupForm"  :model="groupForm" :rules="groupRules" label-width="80px">
        <div class="form_title flex_row">
            <span class="text">社团信息</span>
            <span class="hr row_bd"></span>
            <span class="btn_save" @click="userFromSubmit('groupForm')">保存</span>
        </div>
        <el-form-item label="社团图片" prop="headimgurl">
            <el-input v-model="groupForm.headimgurl"></el-input>
        </el-form-item>
        <el-form-item label="社团名字" prop="title">
            <el-input v-model="groupForm.title"></el-input>
        </el-form-item>
        <el-form-item label="社团简介" prop="summary">
            <el-input v-model="groupForm.summary"></el-input>
        </el-form-item>
    </el-form>
</div>
</template>

 
<script>
import { mapState,mapMutations, mapActions } from 'vuex';
import { getInfo } from '../../api/api';
export default {
  name: 'UserInfo',
  components: {
  },
  data() {
    return {
        userInfoForm: {
          name: '',
          mobilephone: '',
          sex: '',
          country:'',
          headimgurl:'/upload/images/201804/21/1524268979_5ada7fb392d5b.jpg',
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
        cardForm:{
            cardholder:'',
            cardno:'',
            safeno:'',
        },
        cardRules:{
            cardholder:[{required:true,trigger:'change',message:"请填写持卡人姓名"}],
            cardno:[{required:true,trigger:'change',message:"请填写银行卡号"}],
            safeno:[{required:true,trigger:'change',message:"请填写安全码"}],
        },
        groupForm:{
            headimgurl:'/upload/images/201804/21/1524268979_5ada7fb392d5b.jpg',
            title:'',
            summary:'',
        },
        groupRules:{
            headimgurl:[{required:true,trigger:'change',message:"请上传社团图片"}],
            title:[{required:true,trigger:'change',message:"请填写社团名称"}],
            summary:[{required:true,trigger:'change',message:"请填写社团简介"}],
        },
 

      };
  },
  computed:{
      ...mapState([
        'userInfo',
        'cardInfo',
        'associationInfo'
      ])
  },
  methods:{
      ...mapActions([
        'setUserInfo',
        'setBank',
        'setGroup'
      ]),
      userFromSubmit(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                // alert('submit!');
                
                switch(formName){
                    case 'userInfoForm':
                        console.log(this.userInfoForm)
                        this.setUserInfo(this.userInfoForm)
                        // .then(res=>{
                        //     if(res.code==200){
                        //         this.$message.success(res.message);
                        //     }
                        // });
                        break;
                    case 'cardForm':
                        this.setBank(this.cardForm);
                        break;
                    case 'groupForm':
                        this.setGroup(this.groupForm);
                        break;
                }

            } else {
                console.log('error submit!!');
                return false;
            }
        });
      }
  },
  created(){
      getInfo().then(res=>{
          if(res.code==200){
              if(isNaN(res.data.cardinfo.length)){
                  this.cardForm = res.data.cardinfo; 
              }
              if(isNaN(res.data.userinfo.length)){
                  const userinfo = res.data.userinfo;
                  this.userInfoForm = {
                      name:userinfo.name,
                      mobilephone:userinfo.mobilephone,
                      sex:userinfo.sex?userinfo.sex.toString():'',
                      country:userinfo.country,
                      headimgurl:userinfo.headimgurl,
                      graduate_school:userinfo.graduate_school,
                  }
              }
              if(isNaN(res.data.associationInfo.length)){
                  this.groupForm = res.data.associationInfo;
              }
              
          }
          
      })
  }
};

</script>

<style lang="scss" scoped>
.form_title{
    margin-bottom: 20px;
    .text{
        color: #7cd958;
        margin-right: 8px;
        font-size: 20px;
    }
    .hr{
        background: #7cd958;
        height: 1px;
    }
    .btn_save{
        background: #7cd958;
        color: #fff;
        border-radius: 50px;
        line-height: 30px;
        padding: 0 20px;
    }
}
</style>