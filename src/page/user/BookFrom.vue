<template>
<div class="publish">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="书名">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="图片">
   <el-upload
    class="avatar-uploader"
    action="" >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>
  <el-form-item label="书的简介">
    <el-input type="textarea" v-model="form.summary"></el-input>
  </el-form-item>
  <el-form-item label="价格">
    <el-input v-model="form.shop_price"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即发布</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>


export default {
  name: 'BookFrom',
  components: {
  },
  data() {
    return {
        form: {
          title:'',
          summary:'',
          shop_price:'',
        }
      };
  },
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