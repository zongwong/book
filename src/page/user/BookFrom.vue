<template>
<div class="publish">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">

    <el-form-item label="书名" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>

    <el-form-item label="图片">
      <my-upload
        v-on:uploadfile="uploadFileEvent"
      ></my-upload>
    </el-form-item>

    <el-form-item label="书的简介" prop="summary">
      <el-input type="textarea" v-model="ruleForm.summary"></el-input>
    </el-form-item>
    <el-form-item label="所在校区">
      <el-select v-model="ruleForm.campus" placeholder="请选择所在校区">
        <template v-for="item in campuList">
          <el-option :key="item.campus_id" :label="item.campus_name" :value="item.campus_name"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="价格" prop="shop_price">
      <el-row :gutter="10"> 
        <el-col :span="4">
          <el-select v-model="ruleForm.currency" placeholder="货币">
            <template v-for="item in currency">
              <el-option :key="item.currency_id" :label="item.currency_symbol" :value="item.currency_code"></el-option>
            </template>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input type="number" v-model="ruleForm.shop_price"></el-input>
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
    return {
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
          ]
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
      if(typeof ret.file.length === 'undefined'){
        this.files.push(ret.file);
      }else{
        this.files= [];
        ret.file.forEach( item =>{
          this.files.push(item.raw);
        });
      }
    },
    submitForm(formName){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          publishGoods({
            token:this.$store.state.token,
            category_id:1,
            title:this.ruleForm.title,
            summary:this.ruleForm.title,
            shop_price:this.ruleForm.shop_price,
            currency_code:'USD'||this.ruleForm.title,
            currency_symbol:'$'||this.ruleForm.title,
            campus_id:2,
            images:this.files
          },{
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
          }).then(res=>{
            console.log(res)
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