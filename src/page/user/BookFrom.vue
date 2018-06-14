<template>
<div class="publish">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

    <el-form-item :label="$t('form.bookname')" prop="title">
      <el-input v-model="ruleForm.title" :placeholder="$t('placeholder.title')"></el-input>
    </el-form-item>

    <el-form-item :label="$t('form.images')" prop="images">
      <my-upload
        v-on:uploadfile="uploadFileEvent"
        :fileList="fileList"
      ></my-upload>
    </el-form-item>

    <el-form-item :label="$t('form.abstract')" prop="summary">
      <el-input type="textarea" v-model="ruleForm.summary" :placeholder="$t('placeholder.desc')"></el-input>
    </el-form-item>
    <el-form-item :label="$t('form.area')" prop="campus_id">
      <el-select v-model="ruleForm.campus_id" :placeholder="$t('placeholder.campus')">
        <template v-for="item in campuList">
          <el-option :key="item.campus_id" :label="lang=='zh'?item.campus_name:item.eng_name" :value="item.campus_id"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('form.price')" prop="currency_code">
      <el-row :gutter="10"> 
        <el-col :span="4">
          <el-form-item >
            <el-select v-model="ruleForm.currency_code" :placeholder="$t('placeholder.currency')" @change="currencyChange">
              <template v-for="item in currency">
                <el-option :key="item.currency_id" :label="item.currency_symbol" :value="item.currency_code"></el-option>
              </template>
            </el-select>
           </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="shop_price">
            <el-input type="number" v-model="ruleForm.shop_price" :placeholder="$t('placeholder.price')"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
    </el-form-item>

    <!-- <el-form-item label="数量" prop="summary">
      <el-input-number size="small" v-model="ruleForm"></el-input-number>
    </el-form-item> -->

    <el-form-item label="期望交易地点" prop="place">
      <el-input type="textarea" v-model="ruleForm.place" :placeholder="$t('placeholder.place')"></el-input>
    </el-form-item>
    <el-form-item label="期望交易时间" prop="time">
      <el-date-picker
        v-model="ruleForm.time"
        format="MM-dd-yyyy HH:mm"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.publish')}}</el-button>
    </el-form-item>

  </el-form>
</div>
</template>

<script>
import Upload from '../../components/upload';
import { publishGoods,getGoodsInfo } from '../../api/api';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'BookFrom',
  components: {
    'my-upload':Upload
  },
  data() {

    return {
        category_id:1,
        goods_id:'',
        ruleForm: {
          title: '',
          summary: '',
          shop_price: '',
          currency_code:'',
          currency_symbol: '',
          campus_id:'',
          place: '',
          time: '',
        },
        files:[],
        fileList:[]
      };
  },
  computed: {
    ...mapGetters([
      'campuList'
    ]),
    ...mapState({
      currency: 'Currency',
      host:'host',
      lang:'lang'
    }),
    rules(){
      let checkImg = (rule, value, callback) => {
        if(this.files.length){
          callback()
        }else{
          callback(new Error(this.$t('valid.images')));
        }
      }
      return {
          title: [
            { required: true, message: this.$t('valid.title'), trigger: 'change' },
          ],
          summary: [
            { required: true, message: this.$t('valid.desc'), trigger: 'change' }
          ],
          shop_price: [
            { required: true, message: this.$t('valid.price'), trigger: 'change' }
          ],
          campus_id:[{
            required: true, message: this.$t('valid.campus'), trigger: 'change'
          }],
          currency_code:[{
            required: true, message: this.$t('valid.currency'), trigger: 'change'
          }],
          images:[{
            validator:checkImg,required: true, message: this.$t('valid.images'), trigger: 'change'
          }],
          place: [
            { required: true, message: this.$t('valid.place'), trigger: 'change' },
          ],
          time: [
            { required: true, message: this.$t('valid.time'), trigger: 'change' }
          ],
      }
    }
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
          let params ={
            category_id:this.category_id,
            title:this.ruleForm.title,
            summary:this.ruleForm.summary,
            shop_price:this.ruleForm.shop_price,
            currency_code:this.ruleForm.currency_code,
            currency_symbol:this.ruleForm.currency_symbol,
            campus_id:this.ruleForm.campus_id,
            images:this.files,
            expect_exchange_place:this.ruleForm.place,
            expect_start_time:this.ruleForm.time[0],
            expect_end_time:this.ruleForm.time[1],
          }
          if(this.goods_id){
            params.goods_id = this.goods_id;
          }
          publishGoods(params).then(res=>{
            
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
    currencyChange(val){
      this.ruleForm.currency_symbol = this.currency.filter(item=>item.currency_code==val)[0].currency_symbol;
    },
  },
  created(){
    this.category_id = this.$route.params.cat;
    this.goods_id = this.$route.params.id||'';
    if(this.goods_id){
      // 编辑填充
      getGoodsInfo({
        goods_id:this.goods_id
      }).then(res=>{
        if(res.code==200){
          if(res.data.isPublisher!=1){
            this.$router.back();
          }else{
            const goodsInfo = res.data.goodsInfo;
            this.ruleForm.title = goodsInfo.title;
            this.ruleForm.summary = goodsInfo.summary;
            this.ruleForm.shop_price = goodsInfo.shop_price;
            this.ruleForm.campus_id = goodsInfo.campus_id;
            this.ruleForm.currency_code = goodsInfo.currency_code;
            this.ruleForm.currency_symbol = goodsInfo.currency_symbol;
            this.files = goodsInfo.images;
            this.fileList = goodsInfo.images.map((item,index)=>{
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