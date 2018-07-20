<template>
<div class="publish">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

    <el-form-item :label="category_id==1?$t('form.bookname'):$t('form.notename')" prop="title">
      <el-input v-model="ruleForm.title" :placeholder="$t('placeholder.title')"></el-input>
    </el-form-item>

    <el-form-item :label="$t('form.images')" prop="images">
      <my-upload
        v-on:uploadfile="uploadFileEvent"
        :fileList="fileList"
      ></my-upload>
    </el-form-item>

    <el-form-item :label="category_id==1?$t('form.abstract'):$t('form.noteabstract')" prop="summary">
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
      <el-row > 
        <el-col :span="4" style="margin-right:6px;">
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

    <el-form-item  v-if="category_id==1" :label="$t('expect.place')" prop="place">
      <el-select multiple v-model="ruleForm.place" :placeholder="$t('expect.select')" style="width:100%;">
        <el-option
          v-for="item in [ 'At bookstore Entrance', 'At Starbuck Entrance', 'At Langson Library Entrance']"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>

    <!-- <el-form-item  v-if="category_id==2" :label="$t('expect.email')" prop="email">
      <el-input type="text" v-model="ruleForm.email" :placeholder="$t('placeholder.email')"></el-input>
    </el-form-item> -->

    <el-form-item :label="$t('expect.time')" v-if="category_id==1">
        <div v-for="(val, key) in timeGroup" :key="key">
            <el-card class="box-card week-card" v-for="(item,index) in val" :key="index">
              <div class="timerow"><span>{{$t(`week.${key}`)}}</span><span>{{item.startTime}} - {{item.endTime}}</span><span @click="delTime(key,index)"><i class="el-icon-delete"></i></span></div>
            </el-card>
        </div>
      <!-- <el-date-picker
        v-model="ruleForm.time"
      
        format="MM-dd-yyyy HH:mm"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker> -->
        <el-select style="width:150px;" v-model="week" :placeholder="$t('expect.select')">
          <el-option
            v-for="item in weekDate.data"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-time-select
          style="width:150px;"
          :placeholder="$t('expect.startTime')"
          v-model="startTime"
          @change="startChange"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00'
          }">
        </el-time-select>
        <el-time-select
          style="width:150px;"
          :placeholder="$t('expect.endTime')"
          v-model="endTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: startTime
          }">
        </el-time-select>
        <el-button @click="addTime">{{$t('expect.add')}}</el-button>

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
        timeGroup:{
          week_1:[],
          week_2:[],
          week_3:[],
          week_4:[],
          week_5:[],
          week_6:[],
          week_7:[],
        },
        week:'',
        startTime:'',
        endTime:'',
        category_id:1,
        goods_id:'',
        ruleForm: {
          title: '',
          summary: '',
          shop_price: '',
          currency_code:'',
          currency_symbol: '',
          campus_id:'',
          place: [],
          email:'',
          time: [],
        },
        files:[],
        fileList:[],
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
          // email: [
          //    { type: 'email', required:true,trigger:'change',message: this.$t('valid.email') }
          // ]
      }
    },
    weekDate(){
      return {
        data:[ {label:this.$t('week.week_1'),value:1},
          {label:this.$t('week.week_2'),value:2},
          {label:this.$t('week.week_3'),value:3},
          {label:this.$t('week.week_4'),value:4},
          {label:this.$t('week.week_5'),value:5},
          {label:this.$t('week.week_6'),value:6},
          {label:this.$t('week.week_7'),value:7}]
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
          if(this.category_id==1){
            let count = 0;
            for(let i=1;i<8;i++){
              if(this.timeGroup[`week_${i}`].length){
                count+=1;
              }
            }
            if(!count){
              this.$message.error('请添加期望交易时间段')
              return false;
            }
          }

          let params ={
            category_id:this.category_id,
            title:this.ruleForm.title,
            summary:this.ruleForm.summary,
            shop_price:this.ruleForm.shop_price,
            currency_code:this.ruleForm.currency_code,
            currency_symbol:this.ruleForm.currency_symbol,
            campus_id:this.ruleForm.campus_id,
            images:this.files,
          }
          if(this.category_id==1){
            params.expect_exchange_place = this.ruleForm.place.join('#');
            params.expect_start_time = JSON.stringify(this.timeGroup);
            params.expect_end_time = 0;
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
    startChange(){
      this.endTime = '';
    },
    delTime(key,index){
      console.log(key,index)
      this.timeGroup[key].splice(index,1);
    },
    addTime(){
      if(!this.week||!this.startTime||!this.endTime){
        return;
      }
      const week = `week_${this.week}`;
      // if(!this.timeGroup[week]){
      //   this.timeGroup[week] = [];
      // }
      const time = {startTime:this.startTime,endTime:this.endTime};
      let result = this.timeGroup[week].find((item)=>(
        item.startTime === time.startTime && item.endTime === time.endTime
      ))
      if(result===undefined){
        this.timeGroup[week].push(time)
      }
      console.log(this.timeGroup)
    }
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
            if(this.category_id==1){
              this.ruleForm.place = goodsInfo.expect_exchange_place.split('#');
              this.timeGroup = JSON.parse(goodsInfo.expect_start_time);
            }

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
  .week-card{
    width: 300px;
    margin-bottom: 10px;
    .timerow{
      display: flex;
      span:nth-child(2){
        flex: 1;
        margin-left: 10px;
      }
      span:nth-child(3){
        cursor: pointer;
      }
    }
  }
</style>