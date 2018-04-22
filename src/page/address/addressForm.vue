<template>
<div class="publish">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="书名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>

  <el-form-item label="书的简介">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即发布</el-button>
  </el-form-item>
</el-form>






</div>
</template>

<script>


export default {
  name: 'addressFrom',
  components: {
  },
  data() {
    return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      };
  },
};

</script>

<style lang="scss" >

</style>