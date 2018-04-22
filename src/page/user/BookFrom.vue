<template>
<div class="publish">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">

    <el-form-item label="书名" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>

    <el-form-item label="图片" prop="images">
      <my-upload
        v-on:uploadfile="uploadFileEvent"
      ></my-upload>
    </el-form-item>

    <el-form-item label="书的简介" prop="summary">
      <el-input type="textarea" v-model="ruleForm.summary"></el-input>
    </el-form-item>
    <el-form-item label="所在校区" prop="campus">
      <el-select v-model="ruleForm.campus" placeholder="请选择所在校区">
        <template v-for="item in campuList">
          <el-option :key="item.campus_id" :label="item.campus_name" :value="item.campus_name"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="价格">
      <el-row :gutter="10"> 
        <el-col :span="4">
          <el-form-item prop="currency">
            <el-select v-model="ruleForm.currency" placeholder="货币">
              <template v-for="item in currency">
                <el-option :key="item.currency_id" :label="item.currency_symbol" :value="item.currency_code"></el-option>
              </template>
            </el-select>
           </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="shop_price">
            <el-input type="number" v-model="ruleForm.shop_price"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
    </el-form-item>

  </el-form>
</div>
</template>

<script>
import Upload from '../../components/upload';
import { publishGoods } from '../../api/api';
import { mapState } from 'vuex';
export default {
  name: 'BookFrom',
  components: {
    'my-upload':Upload
  },
  data() {
    let checkImg = (rule, value, callback) => {
      if(this.files.length){
        callback()
      }else{
        callback(new Error('请上传图片'));
      }
    }
    return {
        category_id:1,
        ruleForm: {
          title: '',
          summary: '',
          shop_price: '',
          campus: '',
          currency: '',
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'change' },
          ],
          summary: [
            { required: true, message: '请输入简介', trigger: 'change' }
          ],
          shop_price: [
            { required: true, message: '请输入售价', trigger: 'change' }
          ],
          campus:[{
            required: true, message: '请选择校区', trigger: 'change'
          }],
          currency:[{
            required: true, message: '请选择单位', trigger: 'change'
          }],
          images:[{
            validator:checkImg, message: '请上传图片', trigger: 'change'
          }]
        },
        files:[]
      };
  },
  computed: {
    ...mapState({
      campuList:'campuList',
      currency: 'Currency'
    })
  },
  methods: {
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
    submitForm(formName){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          publishGoods({
            category_id:this.category_id,
            title:this.ruleForm.title,
            summary:this.ruleForm.title,
            shop_price:this.ruleForm.shop_price,
            currency_code:'USD'||this.ruleForm.title,
            currency_symbol:'$'||this.ruleForm.title,
            campus_id:2,
            images:this.files
          }).then(res=>{
            
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
    }
  },
  created(){
    // this.files = new FormData();
    console.log(this.$route)
    this.category_id = this.$route.query.category_id
  }
};

</script>

<style lang="scss" >
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>