<template>
<div class="center_userInfo">
    <div class="form_title flex_row">
        <span class="text">个人信息</span>
        <span class="hr row_bd"></span>
        <span class="btn_save">保存</span>
    </div>
    <el-form ref="form"  :model="form" label-width="80px">
        <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="form.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="国籍">
            <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
            <el-input v-model="form.name"></el-input>
        </el-form-item>


    </el-form>

    <div class="form_title flex_row">
        <span class="text">银行卡信息</span>
        <span class="hr row_bd"></span>
        <span class="btn_save">保存</span>
    </div>
    <div class="form_title flex_row">
        <span class="text">社团信息</span>
        <span class="hr row_bd"></span>
        <span class="btn_save">保存</span>
    </div>
</div>
</template>

<script>


export default {
  name: 'UserInfo',
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