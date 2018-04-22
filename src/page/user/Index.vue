<template>
<div>
    <my-search></my-search>
    <div class="userInfoBox">
        <div class="avatar">
            <img src="../../assets/image/book.png" alt="">
            <i class="icon_sex"></i>
        </div>
        <p class="name">打打</p>
        <p>气温气温</p>
        <div class="tabBar">
            <div class="box1000 flex_row tabs_wrap">
                <div class="tab_item on">TA的发布</div>
                <div class="tab_item">TA的卖出</div>
            </div>
        </div>
    </div>
    <div class="box1000">
        <div class="select_box">
            <el-select v-model="value" placeholder="请选择">
                <el-option label="二手书籍" value="二手书籍"></el-option>
                <el-option label="二手笔记" value="二手笔记"></el-option>
                <el-option label="房屋租赁" value="房屋租赁"></el-option>
            </el-select>
        </div>
        <div class="list">

        </div>
    </div>
    <div class="box1000 nopadding">
        <div class="history_item">
            <div class="goods_info">
                <div class="goods_imgs">
                    <img src="../../assets/image/book.png" alt="">
                </div>
                <div class="goods_data">
                    <p class="title">请问请问亲我额去</p>
                    <p class="desc">1231231223qweqweqweqweqwe</p>
                    <p class="price">￥20.00</p>
                </div>
            </div>
        </div>
        <div class="history_item">
            <div class="post_item">
            <div class="post_user">
                <img src="../../assets/image/book.png" alt="">
            </div>
            <div class="post_data">
                <p class="post_title oneHide">12312312323</p>
                <div class="post_detail">
                <p class="moreHide">qweqweqweqwe空气环境为偶好环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围环境为偶好几千胸围几千胸围和其吻合器未</p>
                </div>
                <div class="post_other">
                <span>2018-1-12 13:22</span>
                <span class="from"></span>
                <span class="zan">点赞 23</span>
                <span class="hr">丨</span>
                <span class="comment">评论 345</span>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Search from '../../components/common/Search';
import { getInfo } from '../../api/api';
import pagination from '../../components/pagination';
export default {
  name: 'UserIndex',
  components: {
    'my-search': Search,
    'my-pagination': pagination
  },
  data() {
    return {
      userinfo: {},
    };
  },
  methods:{

  },
  created(){
    //   getInfo().then(res=>{

    //   })
  }
};

</script>

<style lang="scss" scoped>


.tabBar{
    margin: 40px 0 28px;
    background: #f9f9f9; 
}
.tab_item{
    width: 155px;
    line-height: 68px;
    text-align: center;
    margin: 0 180px;
    font-size: 17px;
    &.on{
        color: #7cd958;
        border-bottom: 2px solid #7cd958;
    }
}
.tabs_wrap{
    justify-content: space-around;
}
.select_box{
    text-align: right;
    margin-bottom: 14px;
}
</style>