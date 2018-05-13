<template>
  <div class="banner">
    <div class="block">
        <el-carousel  trigger="click" height="500px">
            <el-carousel-item v-for="item in list" :key="item.slide_id">
               <router-link :to="url(item)">
                <div class="banner_info">
                    <div class="container banner_info-wrap">
                        <p class="banner_title">{{item.title}}</p>
                        <p class="banner_desc">{{item.content}}</p>
                        <p class="banner_btn">CHECK IT OUT</p>
                    </div>
                </div>
                <div style="height:100%;">
                 
                    <img class="bannerImg" :src="item.path | headerfilter" alt="幻灯片">
                 
                    
                </div>
                 </router-link>
            </el-carousel-item>
        </el-carousel>
    </div>
  </div>
</template>

<script>
import { swiperData } from '../../api/api';
import headerfilter from '../../utils/tools';
import { mapGetters } from '../../../node_modules/_vuex@3.0.1@vuex';
export default {
  name: "Banner",
  data() {
    return {
      list:[],
      pas:{
        // type:'goods',
        // category_id:'1',
        // num:''
      }
    };
  },
  filters : {
    headerfilter
  },
  watch: {
    '$route'(to, from){
      // this.type = to.path;
      console.log(to)
      // if(1){

      // }
    }
  },
  methods: {
    getListData(){
      swiperData(this.pas).then(res=>{
        if(res.code==200){
          this.list = res.data.slides;
        }
      })
    },
    url(item){
      switch(item.type){
        case 'lease':
          return '/house/'+item.lease_id;
        case 'goods':
          return '/goods/'+item.goods_id;
        case 'post':
          return '/community/post/'+item.post_id;
      }
    }
  },
  created(){
    this.getListData()
  }
};
</script>

<style lang="scss" scoped>
.banner{
  margin-bottom: 40px;
}
.bannerImg{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner_info {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  .banner_info-wrap {
    padding: 0 130px;
    color: #fff;
    font-size: 20px;
    box-sizing: border-box;
  }
  .banner_title {
    font-size: 55px;
    font-weight: bold;
    margin: 120px 0 20px;
  }
  .banner_desc {
    max-width: 550px;
    word-break: break-all;
    margin-bottom: 40px;
  }
  .banner_btn {
    color: #333;
    background: rgba(255, 255, 255, 0.7);
    width: 160px;
    line-height: 40px;
    text-align: center;
  }
}
</style>