<template>
<div class="center_userInfo" v-loading="loading">
    <el-form ref="userInfoForm"  :model="userInfoForm" :rules="userInfoRules" label-width="100px" label-position="left">
        <div class="form_title flex_row">
            <span class="text">{{$t('navs.userinfo')}}</span>
            <span class="hr row_bd"></span>
            <span v-if="editUserMode" class="btn_save" @click="userFromSubmit('userInfoForm')">{{$t('btn.save')}}</span>
            <span v-if="!editUserMode" class="btn_save" @click="modeChange('editUserMode')">{{$t('btn.edit')}}</span>
        </div>
    
        <el-form-item :label="$t('form.avatar')" prop="headimgurl">
            <img v-if="!editUserMode && imageUrl" :src="imageUrl | headfilter" class="uavatar">
            <el-upload
                v-if="editUserMode"
                class="avatar-uploader"
                :action="action"
                :data="{token:token}"
                name="image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imageUrl" :src="imageUrl | headfilter" class="uavatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item :label="$t('form.name')" prop="name">
            <el-input v-if="editUserMode" v-model="userInfoForm.name"></el-input>
            <p class="formShowP" v-if="!editUserMode">{{userInfoForm.name}}</p>
        </el-form-item>
        <el-form-item :label="$t('form.sex')" prop="sex">
            <el-radio-group v-if="editUserMode" v-model="userInfoForm.sex">
                <el-radio label="1">{{$t('form.man')}}</el-radio>
                <el-radio label="2">{{$t('form.woman')}}</el-radio>
            </el-radio-group>
            <p class="formShowP" v-if="!editUserMode">{{userInfoForm.sex==1?$t('form.man'):''}}{{userInfoForm.sex==2?$t('form.woman'):''}}</p>
        </el-form-item>
        <el-form-item :label="$t('form.country')" prop="country">
            <el-input v-if="editUserMode" v-model="userInfoForm.country"></el-input>
            <p class="formShowP" v-if="!editUserMode">{{userInfoForm.country}}</p>
        </el-form-item>
        <el-form-item :label="$t('form.phone')" prop="mobilephone">
            <el-input v-if="editUserMode" v-model="userInfoForm.mobilephone"></el-input>
            <p  class="formShowP" v-if="!editUserMode">{{userInfoForm.mobilephone}}</p>
        </el-form-item>
        <el-form-item :label="$t('form.email')" prop="email">
            <el-input v-if="editUserMode" v-model="userInfoForm.email" :placeholder="$t('valid.email')"></el-input>
            <p  class="formShowP" v-if="!editUserMode">{{userInfoForm.email}}</p>
        </el-form-item>
        <el-form-item :label="$t('form.school')" prop="graduate_school">
            <el-input v-if="editUserMode" v-model="userInfoForm.graduate_school"></el-input>
            <p class="formShowP" v-if="!editUserMode">{{userInfoForm.graduate_school}}</p>
        </el-form-item>
    </el-form>
    <el-form ref="cardForm"  :model="cardForm" :rules="cardRules" label-width="100px" label-position="left">
        <div class="form_title flex_row">
            <span class="text">{{$t('navs.cardinfo')}}</span>
            <span class="hr row_bd"></span>
            <span v-if="editCardMode" class="btn_save" @click="userFromSubmit('cardForm')">{{$t('btn.save')}}</span>
            <span v-if="!editCardMode" class="btn_save" @click="modeChange('editCardMode')">{{$t('btn.edit')}}</span>
        </div>
        <el-form-item :label="$t('form.cardholder')" prop="cardholder">
            <el-input v-if="editCardMode" v-model="cardForm.cardholder"></el-input>
            <p class="formShowP" v-if="!editCardMode">{{cardForm.cardholder}}</p>
        </el-form-item>
        <el-form-item :label="$t('form.cardno')" prop="cardno">
            <el-input v-if="editCardMode" v-model="cardForm.cardno"></el-input>
            <p class="formShowP" v-if="!editCardMode">{{cardForm.cardno}}</p>
        </el-form-item>
        <el-form-item :label="$t('form.safeno')" prop="safeno">
            <el-input v-if="editCardMode" v-model="cardForm.safeno"></el-input>
            <p class="formShowP" v-if="!editCardMode">{{cardForm.safeno}}</p>
        </el-form-item>
    </el-form>
    <el-form ref="groupForm"  :model="groupForm" :rules="groupRules" label-width="100px" label-position="left">
        <div class="form_title flex_row">
            <span class="text">{{$t('navs.communityinfo')}}</span>
            <span class="hr row_bd"></span>
            <span v-if="editGroupMode" class="btn_save" @click="userFromSubmit('groupForm')">{{$t('btn.save')}}</span>
            <span v-if="!editGroupMode" class="btn_save" @click="modeChange('editGroupMode')">{{$t('btn.edit')}}</span>
        </div>
        <el-form-item :label="$t('form.cpost')" prop="headimgurl">
            <!-- <el-input  v-if="editGroupMode" v-model="groupForm.headimgurl"></el-input> -->
            <img v-if="!editGroupMode && imageUrl2" :src="imageUrl2 | headfilter" class="uavatar2">
            <el-upload
                v-if="editGroupMode"
                class="avatar-uploader"
                :action="action"
                :data="{token:token}"
                name="image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2">
                <img v-if="imageUrl2" :src="imageUrl2 | headfilter" class="uavatar2">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item :label="$t('form.cname')" prop="title">
            <el-input  v-if="editGroupMode" v-model="groupForm.title"></el-input>
            <p class="formShowP" v-if="!editGroupMode">{{groupForm.title}}</p>
        </el-form-item>
        <el-form-item :label="$t('form.cdesc')" prop="summary">
            <el-input  v-if="editGroupMode" v-model="groupForm.summary"></el-input>
            <p class="formShowP" v-if="!editGroupMode">{{groupForm.summary}}</p>
        </el-form-item>
    </el-form>
</div>
</template>

 
<script>
import { mapState,mapMutations, mapActions } from 'vuex';
import { getInfo } from '../../api/api';
import Upload from '../../components/upload';
import config from '../../utils/global';
import headfilter from '../../utils/tools';
export default {
  name: 'UserInfo',
  components: {
      'my-upload':Upload
  },
  data() {
    return {
        action:config.host+'/uploader/image',
        userInfoForm: {
          name: '',
          mobilephone: '',
          sex: '',
          country:'',
          headimgurl:'',
          graduate_school:'',
          email:''
        },
        cardForm:{
            cardholder:'',
            cardno:'',
            safeno:'',
        },
        groupForm:{
            headimgurl:'',
            title:'',
            summary:'',
        },
        imageUrl:'',
        imageUrl2:'',
        editUserMode:false,
        editCardMode:false,
        editGroupMode:false,
        loading:false
      };
  },
  filters:{
      headfilter
  },
  computed:{
      ...mapState([
        'host',
        'token',
      ]),
    userInfoRules(){
        return {
            name:[{ required:true,trigger:'change',message: this.$t('valid.name') }],
            mobilephone:[{ required:true,trigger:'change',message: this.$t('valid.phone') }],
            sex:[{ required:true,trigger:'change',message: this.$t('valid.sex') }],
            country:[{ required:true,trigger:'change',message: this.$t('valid.country') }],
            headimgurl:[{ required:true,trigger:'change',message: this.$t('valid.avatar') }],
            graduate_school:[{ required:true,trigger:'change',message: this.$t('valid.school') }],
            email:[{ type: 'email', required:true,trigger:'change',message: this.$t('valid.email') }]
        }
    },
    cardRules(){
        return {
            cardholder:[{required:true,trigger:'change',message: this.$t('valid.cardname')}],
            cardno:[{required:true,trigger:'change',message: this.$t('valid.cardno')}],
            safeno:[{required:true,trigger:'change',message: this.$t('valid.safeno')}],
        }
    },
    groupRules(){
        return {
            headimgurl:[{required:true,trigger:'change',message: this.$t('valid.cimages')}],
            title:[{required:true,trigger:'change',message: this.$t('valid.cname')}],
            summary:[{required:true,trigger:'change',message: this.$t('valid.cdesc')}],
        }
    },
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
                this.loading = true;
                switch(formName){
                    case 'userInfoForm':
                        this.setUserInfo(this.userInfoForm)
                        .then(res=>{
                            if(res.code==200){
                                this.modeChange('editUserMode')
                                this.$message.success(res.message);
                            }
                            this.loading = false;
                        });
                        break;
                    case 'cardForm':
                        this.setBank(this.cardForm)
                        .then(res=>{
                            if(res.code==200){
                                this.modeChange('editCardMode')
                                this.$message.success(res.message);
                            }
                            this.loading = false;
                        });
                        break;
                    case 'groupForm':
                        this.setGroup(this.groupForm)
                        .then(res=>{
                            if(res.code==200){
                                this.modeChange('editGroupMode')
                                this.$message.success(res.message);
                            }
                            this.loading = false;
                        });
                        break;
                }

            } else {
                console.log('error submit!!');
                return false;
            }
        });
      },
      handleAvatarSuccess(res, file){
          this.userInfoForm.headimgurl = res.data.imageurl;
          this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess2(res, file){
          this.groupForm.headimgurl = res.data.imageurl;
          this.imageUrl2 = URL.createObjectURL(file.raw);
      },
      modeChange(name){
          this[name]=!this[name];
      }
  },
  created(){
      this.loading = true;
      getInfo().then(res=>{
          if(res.code==200){
              if(isNaN(res.data.cardinfo.length)){
                  const cardinfo = res.data.cardinfo; 
                  this.cardForm = {
                    cardholder:cardinfo.cardholder,
                    cardno:cardinfo.cardno,
                    safeno:cardinfo.safeno,
                  }
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
                      email:userinfo.email
                  }
                  if(userinfo.headimgurl){
                      this.imageUrl = userinfo.headimgurl;
                  }
              }
              if(isNaN(res.data.associationInfo.length)){
                  const associationInfo = res.data.associationInfo;
                  this.groupForm = {
                      headimgurl:associationInfo.headimgurl,
                      title:associationInfo.title,
                      summary:associationInfo.summary,
                  }
                  if(associationInfo.headimgurl){
                      this.imageUrl2 = associationInfo.headimgurl;
                  }
              }
              
          }
          this.loading = false;
      })
  }
};

</script>

<style lang="scss" scoped>
.center_userInfo{
    margin-bottom: 80px;
}
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
        // background: #7cd958;
        color: #7cd958;
        border: 1px solid #7cd958;
        border-radius: 50px;
        line-height: 25px;
        padding: 0 10px;
        cursor: pointer;
        background: url(../../assets/icon/icon_edit.png) 10px center / 15px 14px no-repeat;
        padding-left: 30px;
    }
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
    line-height: 60px!important;
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
  .uavatar2{
      border-radius: 0;
  }
  .formShowP{
      color: #999;
  }
</style>