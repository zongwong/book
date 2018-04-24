<template>
<div class="publish">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="标题" prop="title">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="封面" prop="images">
    <my-upload
      v-on:uploadfile="uploadFileEvent"
      :fileList="fileList"
    ></my-upload>
  </el-form-item>
  <el-form-item label="内容" prop="content">
    <el-input type="textarea" v-model="form.content"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit('form')">立即发布</el-button>
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
    let checkImg = (rule, value, callback) => {
      if(this.files.length){
        callback()
      }else{
        callback(new Error('请上传图片'));
      }
    };
    return {
        mygroup_id:'',
        post_id:'',
        form: {
          title: '',
          content: ''
        },
        rules:{
          title:[{ required:true,trigger:'change',message:'请填写标题' }],
          content:[{ required:true,trigger:'change',message:'请填写内容' }],
          images:[{
            validator:checkImg, message: '请上传图片', trigger: 'change'
          }]
        },
        fileList:[],
        files:[],
      };
  },
  computed: {
    ...mapState([
      'host'
    ])
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