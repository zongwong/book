<template>
  <div class="">
    <my-search></my-search>
    <div class="club_box community_box">
      <div class="club_card clearfix" v-for="item in list" :key="item.association_id">
        <div class="club_card-left">
          <div class="flex_row">
            <div class="imgbox">
              <router-link :to="'/community/'+item.association_id">
                <img :src="host+item.headimgurl" alt="封面">
              </router-link>
            </div>
          </div>
        </div>
        <div class="club_card-right">
          <!-- <router-link :to="'/community/'+item.association_id"> -->
            <p class="title oneHide">{{item.title}}</p>
            <p class="desc">{{item.summary}}</p>
          <!-- </router-link> -->
          <div class="club_post">
            <div class="flex_row">
              <div class="imgbox">
                <img src="../../assets/image/book.png" alt="">
              </div>
              <div class="row_bd club_post-info">
                <p class="flex_row">
                  <span class="club_post-title oneHide">请问请问请问请问</span>
                  <span class="row_bd icon_new"></span>
                </p>
                <p class="club_post-desc">请问请问请问请问</p>
              </div>
            </div>
          </div>
          <div class="club_post">
            <div class="flex_row">
              <div class="imgbox">
                <img src="../../assets/image/book.png" alt="">
              </div>
              <div class="row_bd club_post-info">
                <p class="flex_row">
                  <span class="club_post-title oneHide">请问请问请问请问</span>
                  <span class="row_bd icon_new"></span>
                </p>
                <p class="club_post-desc">请问请问请问请问</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-pagination
        :total="total"
        :current-page.sync="pageno"
        @page-change="onPageChange"
    ></my-pagination>
  </div>
</template>

<script>
import Search from '../../components/common/Search';
import { getgroupList } from '../../api/api';
import { mapState } from 'vuex';
import pagination from '../../components/pagination';
export default {
  name: 'Community',
  components: {
    'my-search': Search,
    'my-pagination':pagination
  },
  data() {
    return {
      list:[],
      total:1,
      pageno:1,
    };
  },
  computed:{
    ...mapState([
      'host'
    ])
  },
  methods:{
    onPageChange(currentPage){
      this.pageno = currentPage;
      this.getListData();
    },
    getListData(){
      getgroupList({
        pageno:this.pageno
      }).then(res=>{
        if(res.code==200){
          this.list = res.data.associations;
          this.total = res.data.maxpage;
        }
      })
    }
  },
  created(){
    this.getListData();
  }
};

</script>

<style lang="scss" scoped>
.community_box{
  width: 1000px;
  margin: 0 auto;
  .club_card{
    padding: 52px 0;
    border:none;
    border-bottom: 1px solid #eee;
    height: auto;
  }
  .club_card-left{
    width: 300px;
    .imgbox{
      width: 300px;
      height: 300px;
      margin: 0;
    }
  }
  .club_card-right{
    width: 670px;
    height: 300px;
    border: none;
    padding:0;
  }
  .title{
    font-size: 20px;
    margin-bottom: 10px;
    max-width: 670px;
  }
  .desc{
    color: #7d7d7d;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>