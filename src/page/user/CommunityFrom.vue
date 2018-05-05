<template>
<div class="publish">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item :label="$t('form.title')" prop="title">
    <el-input v-model="form.title" :placeholder="$t('placeholder.title')"></el-input>
  </el-form-item>
  <el-form-item :label="$t('form.images')" prop="images">
    <my-upload
      v-on:uploadfile="uploadFileEvent"
      :fileList="fileList"
    ></my-upload>
  </el-form-item>
  <el-form-item :label="$t('form.content')" prop="content">
    <el-input type="textarea" v-model="form.content" :placeholder="$t('placeholder.content')"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">{{$t('btn.publish')}}</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import { groupPostCreate,getPostInfo,myGroupList } from '../../api/api';
import upload from '../../components/upload';
import { mapState } from '../../../node_modules/_vuex@3.0.1@vuex';

export default {
  name: 'CommunityFrom',
  components: {
    'my-upload':upload
  },
  data() {
    return {
        mygroup_id:'',
        post_id:'',
        form: {
          title: '',
          content: ''
        },
        fileList:[],
        files:[],
      };
  },
  computed: {
    ...mapState([
      'host'
    ]),
    rules(){
      let checkImg = (rule, value, callback) => {
        if(this.files.length){
          callback()
        }else{
          callback(new Error(this.$t('valid.images')));
        }
      };
      return {
          title:[{ required:true,trigger:'change',message:this.$t('valid.title') }],
          content:[{ required:true,trigger:'change',message:this.$t('valid.content') }],
          images:[{
            required:true,validator:checkImg, message: this.$t('valid.images'), trigger: 'change'
          }]
      }
    }
  },
  methods: {
      onSubmit(fromName) {
        this.$refs[fromName].validate((valid) => {
          if (valid) {
            let params = {
                content:this.form.content,
                title: this.form.title,
                images:this.files,
                association_id:this.mygroup_id
            }
            if(this.post_id){
              params.post_id = this.post_id;
            }
            groupPostCreate(params).then(res=>{
                if(res.code==200){
                  this.$message.success(res.message);
                  this.$router.back();
                }else{
                  this.$message.error(res.message);
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      uploadFileEvent(ret) {
        if(typeof ret.file === 'string'){
          this.files.push(ret.file);
        }else{
          this.files= [];
          ret.file.forEach( item =>{
            this.files.push(item.response.data.imageurl);
          });
        }
      },
      
  },
  created(){
    this.post_id = this.$route.params.id||'';
    myGroupList().then(res=>{
      if(res.code==200){
        if(res.data.associations.length){
          this.mygroup_id = res.data.associations[0].association_id;
        }
      }
    })
    if(this.post_id){    
      // 编辑填充
      getPostInfo({
        post_id:this.post_id
      }).then(res=>{
        if(res.code==200){
          if(res.data.isPublisher!=1){
            this.$router.back();
          }else{
            const postInfo = res.data.postInfo;
            // const isPublisher = res.data.isPublisher;
            this.form.content = postInfo.content;
            this.form.title = postInfo.title;
            this.files = postInfo.images;
            this.fileList = postInfo.images.map((item,index)=>{
              return {
                name:'pic_'+index,
                url:this.host+item
              }
            })
          }
          
        }
      })
    }
  }
};

</script>

<style lang="scss" >

</style>