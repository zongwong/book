<template>
<div class="publish">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="标题" prop="title">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="封面" prop="images">
    <my-upload
      :uploadfile="uploadFileEvent"
      :fileList="fileList"
    ></my-upload>
  </el-form-item>
  <el-form-item label="内容" prop="content">
    <el-input type="textarea" v-model="form.content"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即发布</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import { publishLease } from '../../api/api';
import upload from '../../components/upload';

export default {
  name: 'HouseFrom',
  components: {
    'my-upload':upload
  },
  data() {
    return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
        },
        fileList:'',
      };
  },
  methods: {
      onSubmit() {
        publishLease({
            content:'房屋详情描述房屋详情描述',
            address: '地址描述房屋详情描述房屋详情描述',
            start_date: '2020-12-12',
            // [end_date 可租赁结束日]
            monetary_unit:'CNY',
            rent:999,
            deposit:888,
        }).then(res=>{
            console.log(res)
        })
      },
      uploadFileEvent(){
        
      }
  }
};

</script>

<style lang="scss" >

</style>