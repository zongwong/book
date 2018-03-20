<template>
  <div class="">
      <my-search></my-search>
      <div class="cm_box">
          <div class="box1000">
            <div class="topic_info cm_info">
                <div class="topic_header flex_row">
                    <div class="row_bd flex_row cm_data">
                        <img src="../../assets/image/book.png">
                        <div class="row_bd cm_content">
                            <p class="title oneHide">1231231</p>
                            <p class="desc moreHide">12312312312312adasda请问请问亲</p>
                        </div>
                    </div>
                    <div class="topic_avatar flex_row">
                        <div class="topic_avatar_wrap">
                            <img src="../../assets/image/book.png" alt="">
                        </div>
                        <div class="">
                            <p class="nickname"><span>姓名</span><i class="icon_sex"></i></p>
                            <p class="manger">管理员</p>
                        </div>
                    </div>
                </div>   
            </div>
          </div>
      </div>
      <div class="box1000">
          <div style="margin-bottom:70px;">
            <div class="post_item">
                <div class="post_user">
                    <img src="../../assets/image/book.png" alt="">
                    <p class="name oneHide">气温气温</p>
                </div>
                <div class="post_data">
                    <p class="post_title oneHide">12312312323</p>
                    <div class="post_detail">
                    <img src="../../assets/image/book.png" alt="">
                    <p class="moreHide">qweqweqweqwe空气环境为偶好几千胸围和其吻合器未</p>
                    </div>
                    <div class="post_other">
                    <span>2018-1-12 13:22</span>
                    <span class="from">来自 陈琳达</span>
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

export default {
  name: 'CommunityDetail',
  components: {
    'my-search': Search
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};

</script>

<style lang="scss" scoped>
.cm_box{
    border-bottom: 1px solid #7cd958;
}
.cm_info{
    .topic_avatar{
        width: 270px;
        background: #f8f8f8;
        padding-bottom: 30px;
        padding-top:30px; 
        justify-content: center;
    }
    .manger{
        color: #7cd958;
        font-size: 13px;
    }
    .cm_data{
        img{
            width: 132px;
            height: 132px;
            display: block;
            margin-right: 24px;
        }
        .cm_content{
            height: 132px;
            padding-right: 20px;
            .title{
                font-size: 25px;
                max-width: 570px;
                margin: 8px 0 12px;
            }
            .desc{
                color: #7d7d7d;
                font-size: 16px;
            }
        }

    }
}

</style>