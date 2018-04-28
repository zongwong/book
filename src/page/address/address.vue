<template>
<div class="publish nopadding" v-loading="loading">
    <div class="pbbtn_box"><span @click="addressFormOpen">新增地址</span></div>
    <div class="history_item" v-for="(item,index) in list" :key="item.address_id">
        <div class="goods_info" >
            <div class="goods_data">
                <p class="desc">收件人：{{item.recipients}} - {{item.mobilephone}}</p>
                <p class="desc">详细地址：{{item.detail}} / {{item.city}} / {{item.province}} / {{item.country}}</p>
            </div>
            <!-- <div class="close"></div> -->
        </div>
        <div class="btnsBox">
            <span class="defaultAdr" @click="setDefault(item)"><i v-if="item.is_default==1" class="el-icon-success"></i>设置默认</span><span @click="editAdr(item.address_id,index)" class="btn_edit">编辑</span>
        </div>
    </div>

    <el-dialog title="收货地址" :modal="modal" :visible.sync="dialogVisible" width="500px">
        <el-form ref="addressForm" :rules="addressRule" :model="addressForm" label-width="80px">
            <el-form-item label="收件人" prop="name">
                <el-input v-model="addressForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="addressForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="city" prop="city">
                <el-input v-model="addressForm.city"></el-input>
            </el-form-item>
            <el-form-item label="state/省" prop="state">
                <el-input v-model="addressForm.state"></el-input>
            </el-form-item>
            <el-form-item label="country" prop="country">
                <el-input v-model="addressForm.country"></el-input>
            </el-form-item>
            <el-form-item label="收货地址" prop="address">
                <el-input v-model="addressForm.address"></el-input>
            </el-form-item>
            <el-form-item label="default" prop="isdefault">
                <el-switch v-model="addressForm.isdefault"></el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeModal('addressForm')">取 消</el-button>
            <el-button type="primary" @click="onSubmit('addressForm')">确 定</el-button>
        </span>
    </el-dialog>



</div>
</template>

<script>
import { addressList,addressAdd,addressDefault } from '../../api/api';
import pagination from '../../components/pagination';
export default {
  name: 'myaddress',
  components: {
  },
  data() {
    return {
        list:[],
        total:1,
        pas:{
            pageno:1
        },
        dialogVisible:false,
        modal:true,
        loading:false,
        address_id:'',
        addressForm:{
            name:'',
            phone:'',
            address:'',
            city:'',
            state:'',
            country:'',
            isdefault:true,
        },
        addressRule:{
            name: [
                { required: true, message: '请输入收件人姓名', trigger: 'change' },
            ],
            phone: [
                { required: true, message: '请输入收件人手机号', trigger: 'change' }
            ],
            address: [
                { required: true, message: '请输入详细地址', trigger: 'change' }
            ],
            city: [
                { required: true, message: '请输入city', trigger: 'change' }
            ],
            state: [
                { required: true, message: '请输入state', trigger: 'change' }
            ],
            country: [
                { required: true, message: '请输入country', trigger: 'change' }
            ]
        }
    }
  },
  methods: {
      getListData(){
          this.loading = true;
          return new Promise((resolve,reject)=>{
            addressList(this.pas).then(res=>{
                if(res.code==200){
                    this.list = res.data.addresslist;
                    this.total = res.data.maxpage;
                    this.loading = false;
                }else{
                    reject(res)
                }
            })
          })
      },
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let params = {
                    country:this.addressForm.country,
                    province:this.addressForm.state,
                    city:this.addressForm.city,
                    detail:this.addressForm.address,
                    mobilephone:this.addressForm.phone,
                    recipients:this.addressForm.name,
                    is_default:1,
                };
                if(this.address_id){
                    params.address_id = this.address_id;
                }
                addressAdd(params).then(res=>{
                    if(res.code==200){           
                        this.closeModal();
                        this.$message.success('添加成功');
                        if(this.$route.query.redirect){
                            this.$router.push({
                                path:this.$route.query.redirect
                            })
                        }
                        this.getListData();
                    }else{
                        this.$message.error(res.message);
                    }

                })

            } else {
                
                return false;
            }
        });
      },
      addressFormOpen(){
          this.dialogVisible = true;
      },
      setDefault(adr){
        let index = this.list.indexOf(adr);
        if(index===-1) return;
        if(this.list[index].is_default==0){
            addressDefault({
                address_id:this.list[index].address_id
            }).then(res=>{
                if(res.code==200){
                    this.$message.success(res.message);
                    this.list =this.list.map((it,i)=>{
                        if(i===index){
                            it.is_default = 1;
                        }else{
                            it.is_default = 0;
                        }
                        return it;
                    })
                }
            })
        }
      },
      editAdr(id,index){
          this.address_id = id;
          this.addressForm.country = this.list[index].country;
          this.addressForm.state = this.list[index].province;
          this.addressForm.city = this.list[index].city;
          this.addressForm.address = this.list[index].detail;
          this.addressForm.phone = this.list[index].mobilephone;
          this.addressForm.name = this.list[index].recipients;
          this.addressForm.isdefault = this.list[index].is_default==0?false:true;
          this.addressFormOpen();
      },
      closeModal(){
        this.address_id = '';
        this.addressForm.country = '';
        this.addressForm.state = '';
        this.addressForm.city = '';
        this.addressForm.address ='';
        this.addressForm.phone = '';
        this.addressForm.name = '';
        this.addressForm.isdefault = true;
        this.dialogVisible = false;
        this.$refs['addressForm'].resetFields();
      }
  },
  created(){
      this.getListData()
  }
};

</script>

<style lang="scss" scoped>
.publish .btn_edit{
    position: relative;
    margin-left: 20px;
    cursor: pointer;
}
.btnsBox{
    text-align: right;
}
.defaultAdr{
    color: #7cd958;
    cursor: pointer;
}
</style>